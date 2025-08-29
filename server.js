const express = require("express");
const bodyParser = require("body-parser");
const summarize = require("./summarizer");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Health check route
app.get("/", (req, res) => {
  res.send("⚖️ Summarizer Backend is running!");
});

// Summarization API
app.post("/summarize", async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ error: "No text provided" });
    }

    const summary = await summarize(text);
    res.json({ summary });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
