const express = require("express");
const bodyParser = require("body-parser");
const summarizeText = require("./summarizer.js"); // 👈 Import summarizer

const app = express();
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("✅ Backend is running on Render!");
});

app.post("/summarize", async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) return res.status(400).json({ error: "No text provided" });

    // Call real summarizer
    const summary = await summarizeText(text);

    res.json({ summary });
  } catch (error) {
    console.error("❌ Summarization failed:", error);
    res.status(500).json({ error: "Summarization failed" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
