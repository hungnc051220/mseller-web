import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL;

const axiosInstance = axios.create({
  baseURL,
});

axiosInstance.interceptors.request.use((req) => {
  if (sessionStorage.getItem("user")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(sessionStorage.getItem("user")).accessToken
    }`;
  }
  return req;
});

export const createQrCode = async (data) =>
  axiosInstance.post("/payment/create-qr", data, { responseType:"blob" });
