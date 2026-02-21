import type { FullConfig, Suite, TestCase, TestResult, Reporter } from '@playwright/test/reporter';
import { askOllama } from './ai/ollama';

class AIReporter implements Reporter {
  private failedTests: {
    title: string;
    error: string;
    stack: string;
  }[] = [];

  onTestEnd(test: TestCase, result: TestResult) {
    if (result.status === 'failed') {
      const errorMessage = result.error?.message || '';
      const stack = result.error?.stack?.split('\n').slice(0, 6).join('\n') || '';

      const alreadyExists = this.failedTests.find((f) => f.error === errorMessage);

      if (!alreadyExists) {
        this.failedTests.push({
          title: test.title,
          error: errorMessage,
          stack,
        });
      }
    }
  }

  async onEnd() {
    const aiEnabled = process.env.AI_ENABLED === 'true';

    if (!aiEnabled) {
      console.log('\n🛑 AI analysis disabled\n');
      return;
    }
    if (this.failedTests.length === 0) {
      console.log('\n✅ All tests passed. No AI analysis needed.\n');
      return;
    }

    console.log('\n🤖 Sending failed tests to AI for analysis...\n');

    const prompt = `
You are a senior Playwright automation engineer.

ONLY use the provided error and stack trace.
Do NOT assume network issues unless explicitly shown.
Do NOT guess.
If information is missing, say: "Insufficient context".

Failed Test Details:

${this.failedTests
  .map(
    (f) => `
Test: ${f.title}
Error: ${f.error}
Stack: ${f.stack}
`,
  )
  .join('\n')}

Respond STRICTLY in this format:

ROOT CAUSE:
<1-2 lines max>

WHY IT FAILED:
<1-2 lines max>

FIX:
<short actionable fix in 1-2 lines>

Keep total response under 12 lines.
Be direct. No explanations outside the format.
`;
    try {
      const response = await askOllama(prompt);
      console.log('\n================ AI FAILURE ANALYSIS ================\n');
      console.log(response);
      console.log('\n=====================================================\n');
    } catch (err) {
      console.log('AI analysis failed:', err);
    }
  }
}

export default AIReporter;
