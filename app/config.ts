const serverValue =
  typeof window === "undefined" ? process.env.VITE_API_BASE_URL : undefined;

const clientValue =
  typeof window !== "undefined" ? import.meta.env.VITE_API_BASE_URL : undefined;

export const API_BASE_URL = serverValue || clientValue || "";

// Fail loudly on Vercel if not configured
if (!API_BASE_URL) {
  throw new Error(
    "Missing VITE_API_BASE_URL. Set it in Vercel Project → Settings → Environment Variables."
  );
}
