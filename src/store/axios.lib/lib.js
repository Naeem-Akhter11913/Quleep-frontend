import axios from "axios";
import { BASE_URL } from "../conf/config";


export const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});


export default api;
