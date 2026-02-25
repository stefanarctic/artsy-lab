const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
const DEFAULT_GROQ_MODEL = "meta-llama/llama-4-scout-17b-16e-instruct";
const MAX_BASE64_IMAGE_BYTES = 3_800_000;
const DEFAULT_TIMEOUT_MS = 25000;

const fetchWithTimeout = async (url, options = {}, timeoutMs = DEFAULT_TIMEOUT_MS) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, { ...options, signal: controller.signal });
  } finally {
    clearTimeout(timeoutId);
  }
};

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const fetchWithRetry = async (requestFn, retries = 2) => {
  let lastError;
  for (let attempt = 0; attempt <= retries; attempt += 1) {
    try {
      return await requestFn();
    } catch (error) {
      lastError = error;
      if (attempt === retries) break;
      await sleep(400 * (attempt + 1));
    }
  }
  throw lastError;
};

const fileToDataUrl = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error("Failed converting file to data URL."));
    reader.readAsDataURL(file);
  });

const loadImage = (source) =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("Failed loading image for AI analysis."));
    img.src = source;
  });

const getBase64Size = (dataUrl) => {
  const base64 = (dataUrl || "").split(",")[1] || "";
  if (!base64) return 0;
  const padding = base64.endsWith("==") ? 2 : base64.endsWith("=") ? 1 : 0;
  return Math.ceil((base64.length * 3) / 4) - padding;
};

const normalizeDataUrlForGroq = async (dataUrl) => {
  const img = await loadImage(dataUrl);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  let scale = Math.min(1, 1280 / Math.max(img.width, img.height));
  let quality = 0.9;

  for (let i = 0; i < 7; i += 1) {
    canvas.width = Math.max(1, Math.round(img.width * scale));
    canvas.height = Math.max(1, Math.round(img.height * scale));
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    const nextDataUrl = canvas.toDataURL("image/jpeg", quality);
    if (getBase64Size(nextDataUrl) <= MAX_BASE64_IMAGE_BYTES) {
      return nextDataUrl;
    }

    scale *= 0.82;
    quality = Math.max(0.55, quality - 0.08);
  }

  throw new Error("Image is too large for Groq vision input. Try a simpler/smaller image.");
};

const toDataUrl = async (image) => {
  if (!image) return null;
  if (image.startsWith("data:image")) {
    return normalizeDataUrlForGroq(image);
  }

  const response = await fetch(image);
  if (!response.ok) {
    throw new Error("Could not load reference image for AI analysis.");
  }

  const blob = await response.blob();
  const file = new File([blob], "reference-image", { type: blob.type || "image/png" });
  const dataUrl = await fileToDataUrl(file);
  return normalizeDataUrlForGroq(dataUrl);
};

const parseScoreFromText = (text) => {
  if (!text) return 0;
  const scoreMatch = text.match(/Scor:\s*(\d{1,3})\/100/i);
  if (!scoreMatch) return 0;
  const parsed = Number.parseInt(scoreMatch[1], 10);
  if (Number.isNaN(parsed)) return 0;
  return Math.max(0, Math.min(100, parsed));
};

export const compareSketchesWithGroq = async ({
  referenceImage,
  userArtwork,
  lessonTitle,
}) => {
  const aiProxyUrl = import.meta.env.VITE_AI_PROXY_URL;
  const apiKey = import.meta.env.VITE_GROQ_API_KEY;
  const model = import.meta.env.VITE_GROQ_MODEL || DEFAULT_GROQ_MODEL;

  if (!aiProxyUrl && !apiKey) {
    throw new Error("Missing VITE_GROQ_API_KEY in .env");
  }

  if (!userArtwork) {
    throw new Error("No user artwork provided for AI critique.");
  }

  if (aiProxyUrl) {
    const response = await fetchWithRetry(() =>
      fetchWithTimeout(
        aiProxyUrl,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ referenceImage, userArtwork, lessonTitle }),
        },
        DEFAULT_TIMEOUT_MS
      )
    );

    if (!response.ok) {
      throw new Error(`AI proxy request failed (${response.status}).`);
    }
    const payload = await response.json();
    return {
      overallScore: Number(payload?.overallScore || 0),
      feedback: payload?.feedback || "AI returned empty feedback.",
    };
  }

  const referenceDataUrl = await toDataUrl(referenceImage);
  const artworkDataUrl = await toDataUrl(userArtwork);

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

  const requestBody = {
    model,
    temperature: 0.4,
    max_tokens: 700,
    messages: [
      {
        role: "user",
        content: [
          { type: "text", text: prompt },
          referenceDataUrl
            ? { type: "image_url", image_url: { url: referenceDataUrl } }
            : null,
          { type: "image_url", image_url: { url: artworkDataUrl } },
        ].filter(Boolean),
      },
    ],
  };

  const response = await fetchWithRetry(() =>
    fetchWithTimeout(
      GROQ_API_URL,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify(requestBody),
      },
      DEFAULT_TIMEOUT_MS
    )
  );

  if (!response.ok) {
    let errorMessage = "";
    try {
      const errorJson = await response.json();
      errorMessage = errorJson?.error?.message || JSON.stringify(errorJson);
    } catch {
      errorMessage = "";
    }

    if (response.status === 400 && errorMessage.includes("content must be a string")) {
      throw new Error(
        `Groq model "${model}" does not support image content. Use a vision model like "${DEFAULT_GROQ_MODEL}" in VITE_GROQ_MODEL or remove VITE_GROQ_MODEL to use default.`
      );
    }

    throw new Error(`Groq request failed (${response.status}): ${errorMessage}`);
  }

  const data = await response.json();
  const output = data?.choices?.[0]?.message?.content?.trim() || "";

  if (!output) {
    throw new Error("Groq returned an empty response.");
  }

  const overallScore = parseScoreFromText(output);
  const feedback = output.replace(/Scor:\s*\d{1,3}\/100/i, "").trim();

  return {
    overallScore,
    feedback: feedback || output,
  };
};
