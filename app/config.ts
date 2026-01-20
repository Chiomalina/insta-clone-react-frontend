const isServer = typeof window === "undefined";

const fromServer = isServer ? process.env.VITE_API_BASE_URL : undefined;
const fromClient = !isServer ? import.meta.env.VITE_API_BASE_URL : undefined;

export const API_BASE_URL = (fromServer || fromClient || "").trim();

if (!API_BASE_URL) {
  throw new Error(
    "VITE_API_BASE_URL is missing. Set it in Vercel Project Settings → Environment Variables (Production + Preview), then redeploy."
  );
}

if (API_BASE_URL.includes("localhost")) {
  throw new Error(
    `API_BASE_URL is pointing to localhost (${API_BASE_URL}). Fix VITE_API_BASE_URL on Vercel.`
  );
}

if (typeof window === "undefined") console.log("CONFIG VERSION:", "2026-01-20-14:45");
