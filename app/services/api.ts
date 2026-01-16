import axios from "axios";

// We define the base URL of our backend API.
const api = axios.create({
  // Fastify backen address
  baseURL: "http://localhost:3000"
});

export { api }
