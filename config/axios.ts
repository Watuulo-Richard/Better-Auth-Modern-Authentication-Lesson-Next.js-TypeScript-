"use server";

import { baseUrl } from "@/types/types";
import axios from "axios";
const baseAPI = axios.create({
  baseURL: `${baseUrl}/api/v1`,
  headers: {
    "Content-Type": "application/json",
  },
});

export { baseAPI };