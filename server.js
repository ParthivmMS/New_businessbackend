import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import summarize from "./summarize.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// Route for summarization
app.post("/summarize", async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) return res.status(400).json({ error: "No text provided" });

    const summary = await summarize(text);
    res.json({ summary });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
