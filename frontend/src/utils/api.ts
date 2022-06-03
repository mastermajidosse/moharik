import axios from "axios";

export const baseURL = process.env.NEXT_PUBLIC_API_URL || "";

export const client = axios.create({
  baseURL,
});
