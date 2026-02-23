# 🚀 Playwright AI-Powered Test Automation Framework

An advanced end-to-end automation framework built using **Playwright + TypeScript**, enhanced with **AI-powered failure analysis via Ollama**.

This project demonstrates how modern automation can evolve beyond simple pass/fail reporting into an intelligent, self-diagnostic testing system.

🔗 **Application Under Test:**
[https://practicesoftwaretesting.com](https://practicesoftwaretesting.com)

🔗 **Source Repository:**
[https://github.com/testsmith-io/practice-software-testing](https://github.com/testsmith-io/practice-software-testing)

---

## 📌 Why This Framework?

Traditional automation tells you what failed.
This framework goes further — it helps explain _why_ it failed.

It was designed to:

- ✅ Reduce manual debugging time
- ✅ Provide automated root cause analysis
- ✅ Suggest potential fixes using AI
- ✅ Maintain scalable and clean architecture
- ✅ Demonstrate CI/CD-ready automation practices

This is a next-generation QA framework combining structured automation + AI intelligence.

---

## 🏗 Architecture & Project Structure

The framework follows the **Page Object Model (POM)** pattern and modular design principles.

```
.
├── src/
│   ├── ai/
│   │   ├── aiReporter.ts
│   │   └── ollamaClient.ts
│   │
│   ├── pages/
│   │   ├── base/
│   │   │   └── basePage.ts
│   │   │
│   │   ├── auth/
│   │   │   ├── signInPage.ts
│   │   │   ├── registerPage.ts
│   │   │   └── forgotPasswordPage.ts
│   │   │
│   │   ├── categories/
│   │   └── home/
│   │
│   ├── utils/
│   │   └── testData.ts
│
├── tests/
│   └── auth/
│
├── test-data/
│   └── users.json
│
├── playwright.config.ts
├── .env
└── README.md
```

### Design Principles

- Separation of concerns
- Modular AI integration
- Reusable page methods
- Environment-driven configuration
- Scalable folder structure

---

## ✨ Key Features

### 🧱 Page Object Model (POM)

- Clean abstraction of UI elements
- High maintainability
- Reusable components

---

### 🌍 Cross-Browser Testing

Configured to run on:

- Chromium
- Firefox
- WebKit

Ensures compatibility across major browsers.

---

### ⚙ CI/CD Integration

- GitHub Actions workflow included
- Runs on push & pull requests
- Generates test artifacts automatically

---

### 📊 Advanced Reporting

- HTML reports
- Screenshots on failure
- Video recordings
- Trace viewer support

Open report with:

```bash
npx playwright show-report
```

---

### 🤖 AI-Powered Failure Analysis

A custom Playwright reporter integrates with a local Ollama model to:

- Capture failed test details
- Send structured prompt to AI
- Receive root cause analysis
- Suggest potential fixes
- Print intelligent diagnostics in terminal

---

## 🧠 How AI Failure Analysis Works

```
Test Fails
   ↓
Custom Reporter Captures:
   - Error message
   - Stack trace
   - Test title
   ↓
Prompt Sent to Ollama
   ↓
AI Analyzes Failure
   ↓
Root Cause + Suggested Fix
   ↓
Displayed in Terminal
```

This significantly reduces debugging effort and improves issue resolution speed.

---

## 🛠 Tech Stack

| Category               | Technology       |
| ---------------------- | ---------------- |
| Framework              | Playwright       |
| Language               | TypeScript       |
| Test Data              | @faker-js/faker  |
| Environment Management | dotenv           |
| CI/CD                  | GitHub Actions   |
| AI Integration         | Ollama           |
| AI Model               | qwen2.5-coder:7b |

---

## ⚙ Prerequisites

- Node.js (LTS recommended)
- Git
- Ollama (for AI feature)

---

## 📥 Installation

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/Inderbir001/practiceSoftwareTesting.git
cd practiceSoftwareTesting
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Install Playwright Browsers

```bash
npx playwright install --with-deps
```

---

## ▶ Running Tests

### 🔹 Run All Tests

```bash
npx playwright test
```

### 🔹 Run Registration Tests Only

```bash
npx playwright test --grep @registration
```

### 🔹 Run Regression Tests Only

```bash
npx playwright test --grep @regression
```

### 🔹 Run on Specific Browser

```bash
npx playwright test --project=chromium
```

### 🔹 Run in Headed Mode

```bash
npx playwright test --headed
```

---

## 📈 Test Reports

After execution:

- HTML Report → `playwright-report/`
- Videos → `test-results/`
- Traces → Playwright Trace Viewer

To open report:

```bash
npx playwright show-report
```

---

## 🤖 Enabling AI Failure Reporter

### 1️⃣ Install Ollama

Follow setup instructions at:
[https://ollama.ai/](https://ollama.ai/)

### 2️⃣ Pull Required Model

```bash
ollama pull qwen2.5-coder:7b
```

### 3️⃣ Enable AI via Environment Variable

Create a `.env` file in the project root:

```
AI_ENABLED=true
```

When enabled:

- AI analyzes failed tests
- Root cause and suggestions appear in terminal
- Feature can be toggled without changing code

To disable:

```
AI_ENABLED=false
```

---

## 🔐 Environment Variables

| Variable   | Description                               |
| ---------- | ----------------------------------------- |
| AI_ENABLED | Enables or disables AI reporter           |
| BASE_URL   | Application base URL (optional extension) |

---

## 🔮 Future Enhancements

- Self-healing locators
- AI-based flaky test detection
- Smart test generator agent
- Slack/email failure notifications
- Dockerized execution
- Cloud grid integration

---

## 👨‍💻 Author

**Inderbir Singh**
Automation Test Engineer
Focused on building scalable, intelligent QA systems.

---

## ⭐ Summary

This framework demonstrates:

- Advanced Playwright usage
- Custom reporter implementation
- AI integration in automation
- Clean modular architecture
- CI/CD readiness
- Scalable enterprise design

It reflects the transition from traditional automation to **AI-augmented QA engineering**.

---
