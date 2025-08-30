import express from "express";
import fetch from "node-fetch";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { judgment } = req.body;

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`, // ✅ uses env var
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "mistralai/mistral-7b-instruct",
        messages: [
          { role: "system", content: "You are a legal judgment summarizer." },
          { role: "user", content: `Summarize this judgment: ${judgment}` }
        ]
      })
    });

    const data = await response.json();
    const summary = data.choices?.[0]?.message?.content || "No summary generated.";

    res.json({ summary });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error generating summary" });
  }
});

export default router;
