// backend/summarize.js
import express from "express";
import fetch from "node-fetch";

const router = express.Router();

// POST /summarize
router.post("/", async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ error: "No text provided" });
    }

    // Call OpenRouter API (Mistral)
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`, // put key in Render ENV vars
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "mistral-7b-instruct", // or another model from OpenRouter
        messages: [
          { role: "system", content: "You are a helpful AI that summarizes Indian legal judgments clearly and concisely." },
          { role: "user", content: `Summarize this judgment:\n\n${text}` }
        ],
      }),
    });

    const data = await response.json();

    if (!data.choices || !data.choices[0].message) {
      return res.status(500).json({ error: "Invalid response from OpenRouter", raw: data });
    }

    const summary = data.choices[0].message.content;

    res.json({ summary });
  } catch (error) {
    console.error("Error in /summarize:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

export default router;
