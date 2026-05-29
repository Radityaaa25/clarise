import { GoogleGenerativeAI } from "@google/generative-ai";

const parseKeys = (envVar: string | undefined): string[] => {
  if (!envVar) return [];
  return envVar
    .split(",")
    .map((k) => k.trim())
    .filter(Boolean);
};

const getRandomKey = (keys: string[]) => {
  const key = keys[Math.floor(Math.random() * keys.length)];
  const maskedKey = key.substring(0, 8) + "..." + key.substring(key.length - 4);
  console.log(`[AI_POOL] Using API Key: ${maskedKey}`);
  return key;
};

const getUserKeys = () => {
  const keys = parseKeys(process.env.GEMINI_API_KEY);
  if (keys.length === 0) {
    throw new Error("GEMINI_API_KEY environment variable is not set");
  }
  return keys;
};

const getAdminKeys = () => {
  const keys = parseKeys(process.env.GEMINI_API_KEY_ADMIN);
  return keys.length > 0 ? keys : getUserKeys();
};

// User AI models
export const getGenAI = () =>
  new GoogleGenerativeAI(getRandomKey(getUserKeys()));
export const getGeminiModel = () =>
  getGenAI().getGenerativeModel({
    model: "gemini-flash-latest",
  });

// Grader now uses the standard user pool (since GRADER key was removed)
export const getGeminiGraderModel = () =>
  getGenAI().getGenerativeModel({
    model: "gemini-flash-latest",
  });

// Admin AI models
export const getGenAIAdmin = () =>
  new GoogleGenerativeAI(getRandomKey(getAdminKeys()));
export const getGeminiAdminModel = () =>
  getGenAIAdmin().getGenerativeModel({
    model: "gemini-flash-latest",
  });
