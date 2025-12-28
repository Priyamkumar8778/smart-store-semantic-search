import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export async function getEmbedding(text) {
  const response = await ai.models.embedContent({
    model: "text-embedding-004",
    contents: [
      {
        role: "user",
        parts: [{ text }],
      },
    ],
  });

  // ✅ CORRECT WAY
  return response.embeddings[0].values;
}
