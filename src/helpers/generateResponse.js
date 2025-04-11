import { GoogleGenerativeAI } from "@google/generative-ai";

const configuration = new GoogleGenerativeAI("AIzaSyD3Hn8xycYpTwbEF5z35KpVUkauKfvYLiA");


function cleanJsonResponse(text) {
  return text.replace(/```json|```/g, "").trim();
}

export const generateResponse = async (prompt) => {
  try {
      const modelId = "gemini-1.5-flash";
  const model = configuration.getGenerativeModel({
    model: modelId,
    generationConfig: {
      temperature: 0,
      maxOutputTokens: 8192,
      responseMimeType: "application/json",
    },
  });

    const chat = model.startChat({});
    const result = await chat.sendMessage(prompt);
    const response = result.response;
    const cleaned = cleanJsonResponse(response.text());
    return JSON.parse(cleaned);
  } catch (err) {
    console.error(err);
    return { status: "error", message: err };
  }
};
