import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { generateChatResponse } from "./gemini.js";
import { HELPLINES } from "./safety.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env from root or server directory
dotenv.config({ path: path.resolve(__dirname, "../.env") });
dotenv.config({ path: path.resolve(__dirname, ".env") });

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Health Check
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    service: "Saathi Teen Health API",
    geminiConfigured: Boolean(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== "your_gemini_api_key_here")
  });
});

// Helplines list
// IMPORTANT: Verify Childline 1098 and Tele-MANAS 14416 before demo!
app.get("/api/helplines", (req, res) => {
  res.json({ helplines: HELPLINES });
});

// Chat endpoint
app.post("/api/chat", async (req, res) => {
  try {
    const { message, history = [], language = "English" } = req.body;

    if (!message || typeof message !== "string" || !message.trim()) {
      return res.status(400).json({
        error: "Message cannot be empty."
      });
    }

    const response = await generateChatResponse({
      message: message.trim(),
      history,
      language
    });

    return res.json({
      success: true,
      data: response
    });
  } catch (err) {
    console.error("[Saathi Backend Server Error]", err);
    return res.status(500).json({
      error: "Something unexpected happened. Saathi is still right here for you.",
      data: {
        reply: "I am having a small hiccup reaching my advice engine, but please know you are safe and your questions matter. Take a deep breath, and try asking again in a moment.",
        followUpQuestions: [],
        actionLevel: "Self-care",
        actionExplanation: "Rest and hydration are always safe first steps.",
        script: "Mom, I wanted to discuss something private about how I'm feeling today.",
        summary: "Inquiry temporarily disrupted due to server connectivity.",
        mythOrFact: null
      }
    });
  }
});

app.listen(PORT, () => {
  console.log(`🌸 Saathi Backend listening on http://localhost:${PORT}`);
  console.log(`- Gemini API Key: ${process.env.GEMINI_API_KEY ? "Configured" : "Not configured (Using caring fallback)"}`);
});
