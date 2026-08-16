import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

// Lazy initialization helper for Gemini
function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn("GEMINI_API_KEY is not set. AI features will run in mock/educational fallback mode.");
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: "10mb" }));

  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({
      status: "healthy",
      service: "ImmuneQ Autoimmune Intelligence Engine",
      timestamp: new Date().toISOString(),
      hasGeminiKey: Boolean(process.env.GEMINI_API_KEY),
    });
  });

  // Gemini AI Chat & Health Companion endpoint
  app.post("/api/gemini/chat", async (req, res) => {
    try {
      const { message, history, userContext } = req.body;
      if (!message) {
        return res.status(400).json({ error: "Message prompt is required." });
      }

      const ai = getGeminiClient();
      if (!ai) {
        return res.json({
          reply: `**Notice:** Gemini API key is not configured in this environment.\n\nHere is general educational guidance for "${message}":\n\nAutoimmune conditions occur when the immune system mistakenly targets healthy tissues. Always consult your rheumatologist or specialist for diagnosis and personalized treatment regimens. In general, keeping a detailed symptom log, tracking potential food & stress triggers, maintaining anti-inflammatory lifestyle habits, and pacing energy can significantly support chronic condition management.`,
          disclaimer: "Educational information only. Consult your physician for medical advice.",
        });
      }

      const systemInstruction = `You are ImmuneQ AI, an empathetic, highly knowledgeable medical educator and autoimmune health companion. 
Your role is to empower patients, caregivers, and people investigating autoimmune diseases (like Hashimoto's, Lupus, Rheumatoid Arthritis, Crohn's, MS, Celiac, Sjögren's, Psoriasis, etc.).

Key instructions:
1. Provide accurate, evidence-based, compassionate, and clear explanations in natural language.
2. Structure your answers with clear headings, bullet points, and highlight key terms.
3. Whenever relevant, suggest specific diagnostic questions the user can take to their Rheumatologist or Primary Care Physician.
4. Explain lab biomarkers clearly (e.g., ANA titer, ESR, CRP, Anti-CCP, Anti-TPO, Complement levels C3/C4).
5. Suggest gentle, evidence-supported lifestyle & pacing strategies (such as Spoon Theory, stress management, anti-inflammatory nutrition/AIP considerations).
6. Always maintain a compassionate tone while reminding the user that this is for educational purposes and cannot replace professional clinical consultation.

User context: ${JSON.stringify(userContext || {})}`;

      // Build contents array for multi-turn chat if history exists
      const contents: any[] = [];
      if (Array.isArray(history) && history.length > 0) {
        history.forEach((h: { sender: string; text: string }) => {
          contents.push({
            role: h.sender === "user" ? "user" : "model",
            parts: [{ text: h.text }],
          });
        });
      }
      contents.push({
        role: "user",
        parts: [{ text: message }],
      });

      const response = await ai.models.generateContent({
        model: "gemini-3.7-flash",
        contents: contents,
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });

      const reply = response.text || "I was unable to generate a response. Please try rephrasing your question.";
      return res.json({
        reply,
        disclaimer: "ImmuneQ is an educational tool. Always consult a healthcare provider for personalized medical advice.",
      });
    } catch (error: any) {
      console.error("Gemini Chat Error:", error);
      return res.status(500).json({
        error: "Failed to generate AI response",
        details: error?.message || "Internal error",
      });
    }
  });

  // Gemini Symptom Analyzer & Flare Trigger Assessor
  app.post("/api/gemini/analyze-symptoms", async (req, res) => {
    try {
      const { symptoms, severity, duration, triggers, diagnosedConditions, recentLogs } = req.body;
      const ai = getGeminiClient();

      if (!ai) {
        return res.json({
          analysis: {
            summary: "Based on the recorded symptoms (Fatigue, Joint discomfort, Brain fog), your patterns suggest an inflammatory flare pattern.",
            possibleOverlaps: ["Rheumatoid Arthritis", "Systemic Lupus Erythematosus", "Fibromyalgia / Chronic Fatigue Syndrome", "Hashimoto's Thyroiditis"],
            keyQuestionsForDoctor: [
              "Should we run a comprehensive autoimmune serology panel (ANA IFA with reflex, ESR, CRP, RF, Anti-CCP)?",
              "Are my symptoms consistent with active inflammation or secondary fibromyalgia overlap?",
              "What flare-up emergency protocol should I have on hand when severity spikes?"
            ],
            immediateSelfCareTips: [
              "Implement active pacing (Spoon Theory) — cap energy expenditure at 70% today.",
              "Hydrate with electrolyte-rich fluids and prioritize anti-inflammatory meals.",
              "Apply localized temperature therapy (warm baths for morning stiffness, cold packs for acute hot swollen joints)."
            ],
            redFlagWarnings: "Seek urgent medical care if you experience chest pain, shortness of breath, sudden vision disturbance, or high fever with joint swelling."
          }
        });
      }

      const prompt = `Please analyze the following autoimmune symptom profile and return your assessment in JSON format according to this exact structure:
{
  "summary": "Clear, compassionate summary of the symptom pattern and potential immune system dynamics",
  "possibleOverlaps": ["List of relevant autoimmune or inflammatory conditions that share these symptoms"],
  "keyQuestionsForDoctor": ["3-5 high-yield specific questions to ask the rheumatologist/doctor"],
  "immediateSelfCareTips": ["3-4 evidence-backed self-care and pacing actions for today"],
  "biomarkersToDiscuss": ["Relevant lab tests like ANA, CRP, ESR, Anti-dsDNA, etc."],
  "redFlagWarnings": "Crucial red flags that require immediate urgent medical care"
}

Patient Profile:
- Current Symptoms: ${Array.isArray(symptoms) ? symptoms.join(", ") : symptoms}
- Average Pain & Fatigue Severity: ${severity || "Moderate"}
- Duration: ${duration || "Several weeks"}
- Identified Triggers: ${Array.isArray(triggers) ? triggers.join(", ") : "Not specified"}
- Diagnosed Conditions: ${diagnosedConditions || "None formally diagnosed / Seeking answers"}
- Recent Daily Trends: ${JSON.stringify(recentLogs || [])}
`;

      const response = await ai.models.generateContent({
        model: "gemini-3.7-flash",
        contents: prompt,
        config: {
          systemInstruction: "You are a clinical educator specializing in rheumatology, immunology, and autoimmune chronic illness management. Always format your output strictly as valid JSON.",
          responseMimeType: "application/json",
          temperature: 0.4,
        },
      });

      let parsed: any;
      try {
        parsed = JSON.parse(response.text || "{}");
      } catch (parseErr) {
        parsed = {
          summary: response.text,
          possibleOverlaps: ["Autoimmune inflammatory process"],
          keyQuestionsForDoctor: ["What diagnostic blood work should we order?"],
          immediateSelfCareTips: ["Rest, hydration, and pacing"],
        };
      }

      return res.json({ analysis: parsed });
    } catch (error: any) {
      console.error("Analyze Symptoms Error:", error);
      return res.status(500).json({ error: "Symptom analysis failed", details: error.message });
    }
  });

  // Vite middleware setup
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`ImmuneQ Full-Stack Server running on port ${PORT}`);
  });
}

startServer();
