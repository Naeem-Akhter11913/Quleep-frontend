
const mode = import.meta.env.MODE;


export const API_KEY =
  mode === "development"
    ? import.meta.env.VITE_PERSONAL_API_KEY
    : import.meta.env.VITE_PERSONAL_API_KEY;

export const BASE_URL =
  mode === "development"
    ? import.meta.env.VITE_BASE_URL
    : import.meta.env.VITE_BASE_URL_P; 
