const parseKeys = (envVar: string | undefined): string[] => {
  if (!envVar) return [];
  return envVar
    .split(",")
    .map((k) => k.trim())
    .filter(Boolean);
};

const getRandomKey = (keys: string[]) => {
  if (keys.length === 0) throw new Error("No API keys provided");
  const key = keys[Math.floor(Math.random() * keys.length)];
  if (!key) throw new Error("Key is undefined");
  return key;
};

const getGroqKeys = () => {
  const keys = parseKeys(process.env.GROQ_API_KEY);
  if (keys.length === 0) {
    throw new Error("GROQ_API_KEY environment variable is not set");
  }
  return keys;
};

const getGroqQuizKeys = () => {
  const keys = parseKeys(process.env.GROQ_API_KEY_GENERATOR_QUIZCHALLENGE);
  return keys.length > 0 ? keys : getGroqKeys();
};

export const getGroqApiKey = () => {
  return getRandomKey(getGroqKeys());
};

export const getGroqQuizApiKey = () => {
  return getRandomKey(getGroqQuizKeys());
};
