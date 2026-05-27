import { GoogleGenerativeAI } from "@google/generative-ai";

if (!process.env.GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY environment variable is not set");
}

export const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const geminiModel = genAI.getGenerativeModel({
  model: "gemini-flash-latest",
});

export const genAIAdmin = new GoogleGenerativeAI(process.env.GEMINI_API_KEY_ADMIN || process.env.GEMINI_API_KEY);

export const geminiAdminModel = genAIAdmin.getGenerativeModel({
  model: "gemini-flash-latest",
});
