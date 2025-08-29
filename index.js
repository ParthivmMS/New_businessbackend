const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// Example route
app.get("/", (req, res) => {
  res.json({ message: "VerdictForge Backend is running 🚀" });
});

// Summarizer route
app.post("/summarize", async (req, res) => {
  const { text } = req.body;

  // Later: connect with OpenRouter/Mistral here
  res.json({ summary: "This will be your AI summary 🚀" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
