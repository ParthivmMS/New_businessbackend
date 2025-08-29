const express = require("express");
const bodyParser = require("body-parser");
const summarizer = require("./summarizer");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Simple API route
app.post("/summarize", async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ error: "No text provided" });
    }

    // Call our summarizer
    const summary = await summarizer(text);

    res.json({ summary });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
