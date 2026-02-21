export async function askOllama(prompt: string) {
  const response = await fetch('http://localhost:11434/api/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'qwen2.5-coder:7b', // or 3b for faster
      prompt,
      stream: false,

      options: {
        temperature: 0, // no creativity
        top_p: 0.9,
        num_predict: 300, // limit response length
      },
    }),
  });

  if (!response.ok) {
    throw new Error(`Ollama API error: ${response.statusText}`);
  }

  const data = await response.json();

  return data.response?.trim();
}
