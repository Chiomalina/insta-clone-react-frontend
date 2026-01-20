const serverEnv =
  typeof window === "undefined" ? process.env.VITE_API_BASE_URL : undefined;

const clientEnv =
  typeof window !== "undefined" ? import.meta.env.VITE_API_BASE_URL : undefined;

export const API_BASE_URL =
  serverEnv || clientEnv || "http://localhost:3000";
