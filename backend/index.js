import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Chat endpoint
app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [{ parts: [{ text: message }] }],
      },
      { headers: { "Content-Type": "application/json" } }
    );

    const aiResponse =
      response.data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "⚠️ No response from Gemini";

    res.json({ reply: aiResponse });
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ error: "Error connecting to Gemini API" });
  }
});

app.listen(process.env.PORT || 5000, () =>
  console.log(`🚀 Backend running on port ${process.env.PORT || 5000}`)
);
