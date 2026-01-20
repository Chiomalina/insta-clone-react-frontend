const envBaseUrl = import.meta.env.VITE_API_BASE_URL;

export const API_BASE_URL = envBaseUrl || "http://localhost:3000";


if (typeof window === "undefined") {
  console.log("API_BASE_URL (server):", API_BASE_URL);
}
