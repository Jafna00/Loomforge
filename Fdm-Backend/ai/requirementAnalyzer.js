import ai from './geminiClient.js';

const SYSTEM_INSTRUCTIONS = `You convert a fashion designer's freeform manufacturing request into structured JSON.
Extract exactly these fields: category, product, quantity, material, timelineDays, budget.
- category: a broad clothing category (e.g. "Streetwear", "Sportswear", "Formalwear")
- product: the specific item (e.g. "Oversized Hoodie", "Denim Jacket")
- quantity: a number, or null if not mentioned
- material: fabric/material mentioned, or null if not mentioned
- timelineDays: a number of days, or null if not mentioned (convert weeks/months to days)
- budget: a number in USD, or null if no budget is explicitly mentioned. Do not guess or estimate a budget — only extract it if the person states an actual figure.
Respond with ONLY valid JSON, no markdown fences, no explanation. Example:
{"category":"Streetwear","product":"Oversized Hoodie","quantity":500,"material":"Organic Cotton","timelineDays":30,"budget":12000}`;

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function analyzeRequirement(freeformText, retries = 2) {
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: freeformText,
        config: {
          systemInstruction: SYSTEM_INSTRUCTIONS,
          responseMimeType: 'application/json',
        },
      });

      const raw = response.text.trim();
      return JSON.parse(raw);
    } catch (err) {
      const isOverloaded = err?.status === 503;
      const isLastAttempt = attempt === retries;

      if (isOverloaded && !isLastAttempt) {
        await sleep(1000 * (attempt + 1)); 
        continue;
      }
      throw err;
    }
  }
}