// summarizer.js
const express = require("express");
const fetch = require("node-fetch");

const app = express();
app.use(express.json());

// Health check route
app.get("/", (req, res) => {
  res.send("✅ Summarizer backend is running on Render!");
});

app.post("/summarize", async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ error: "No text provided" });
    }

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`, // ✅ set in Render env vars
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "mistral-7b-instruct", // You can change to "mistral-7b" or "gpt-3.5-turbo"
        messages: [
          { role: "system", content: "You are a legal judgment summarizer." },
          { role: "user", content: `Summarize this legal text: ${text}` }
        ]
      })
    });

    const data = await response.json();

    // Debug log
    console.log("OpenRouter Response:", JSON.stringify(data, null, 2));

    if (!data.choices || !data.choices[0].message) {
      return res.status(500).json({ error: "Invalid response from OpenRouter" });
    }

    res.json({ summary: data.choices[0].message.content });
  } catch (error) {
    console.error("Error in /summarize:", error);
    res.status(500).json({ error: "Failed to summarize" });
  }
});

// Render sets PORT automatically
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Backend running on port ${PORT}`));
