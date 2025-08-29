import fetch from "node-fetch";

const summarize = async (text) => {
  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "mistral/mistral-7b-instruct", // change if needed
        messages: [
          { role: "system", content: "You are a legal document summarizer. Summarize clearly." },
          { role: "user", content: text }
        ]
      })
    });

    const data = await response.json();
    return data.choices?.[0]?.message?.content || "Summary not available";
  } catch (error) {
    console.error(error);
    return "Error in summarization";
  }
};

export default summarize;
