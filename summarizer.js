// summarizer.js

async function summarizer(text) {
  // Dummy: Later, replace with Mistral/OpenRouter API call
  return "This is a short summary of your text: " + text.slice(0, 50) + "...";
}

module.exports = summarizer;
