import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());

app.post("/summarize", async (req, res) => {
  try {
    const { text } = req.body;

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`, // ✅ stored in Render
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "mistral-7b-instruct", // or whichever model you want
        messages: [
          { role: "system", content: "You are a legal judgment summarizer." },
          { role: "user", content: `Summarize this: ${text}` }
        ]
      })
    });

    const data = await response.json();
    res.json({ summary: data.choices[0].message.content });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to summarize" });
  }
});

app.listen(10000, () => console.log("Backend running on port 10000"));
