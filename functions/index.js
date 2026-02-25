import { onRequest } from "firebase-functions/v2/https";

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
const DEFAULT_MODEL = "meta-llama/llama-4-scout-17b-16e-instruct";

const parseScoreFromText = (text) => {
  const match = (text || "").match(/Scor:\s*(\d{1,3})\/100/i);
  if (!match) return 0;
  const value = Number.parseInt(match[1], 10);
  return Number.isNaN(value) ? 0 : Math.max(0, Math.min(100, value));
};

export const critiqueProxy = onRequest(
  { cors: true, region: "europe-west1", timeoutSeconds: 60, memory: "256MiB" },
  async (req, res) => {
    if (req.method === "OPTIONS") {
      res.status(204).send("");
      return;
    }
    if (req.method !== "POST") {
      res.status(405).json({ error: "Method not allowed" });
      return;
    }

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      res.status(500).json({ error: "Missing GROQ_API_KEY" });
      return;
    }

    const { referenceImage, userArtwork, lessonTitle = "lectia curenta" } = req.body || {};
    if (!userArtwork) {
      res.status(400).json({ error: "Missing user artwork" });
      return;
    }

    const prompt = `
Analizeaza doua imagini:
1) Prima imagine este SCHITA DE REFERINTA (modelul lectiei).
2) A doua imagine este DESENUL UTILIZATORULUI.

Compara desenul utilizatorului fata de schita de referinta pentru lectia "${lessonTitle}".
Evalueaza:
- proportii si pozitionare
- forma si structura
- acuratetea trasaturilor principale
- curatenia liniilor
- recomandari concrete de imbunatatire

Raspunde in romana si foloseste format exact:
Scor: X/100
Feedback:
- puncte tari
- ce trebuie imbunatatit
- 3 pasi practici pentru urmatoarea incercare
`.trim();

    const body = {
      model: process.env.GROQ_MODEL || DEFAULT_MODEL,
      temperature: 0.4,
      max_tokens: 700,
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: prompt },
            referenceImage ? { type: "image_url", image_url: { url: referenceImage } } : null,
            { type: "image_url", image_url: { url: userArtwork } },
          ].filter(Boolean),
        },
      ],
    };

    try {
      const response = await fetch(GROQ_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const errorText = await response.text();
        res.status(response.status).json({ error: `Groq failed: ${errorText}` });
        return;
      }

      const payload = await response.json();
      const output = payload?.choices?.[0]?.message?.content?.trim() || "";
      if (!output) {
        res.status(502).json({ error: "Groq returned empty response" });
        return;
      }

      res.json({
        overallScore: parseScoreFromText(output),
        feedback: output.replace(/Scor:\s*\d{1,3}\/100/i, "").trim() || output,
      });
    } catch (error) {
      res.status(500).json({ error: error.message || "Unexpected AI proxy failure" });
    }
  }
);

