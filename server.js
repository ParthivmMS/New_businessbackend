const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("✅ Backend is running on Render!");
});

// Example POST API
app.post("/summarize", (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: "No text provided" });

  // For now, just return fake summary
  res.json({ summary: text.slice(0, 100) + "..." });
});

// Render will set PORT automatically
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
