// summarizer.js

async function summarize(text) {
  // Dummy summarizer: return first 3 sentences
  const sentences = text.split(".");
  return sentences.slice(0, 3).join(".") + ".";
}

module.exports = summarize;
