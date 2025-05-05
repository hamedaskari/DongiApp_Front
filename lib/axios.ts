"use client";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
export const handelErrorsApi = (error: any) => {
  if (!error) {
    toast.error("Your request has encountered an error. Please try again");
  } else if (
    (!!error?.errors && typeof error.errors === "object") ||
    typeof error === "object"
  ) {
    let messageText = "";
    Object.values(error?.errors ?? error ?? []).forEach((item, i) => {
      messageText += `${item}:${i + 1}\n`;
    });
    toast.error(messageText);
  } else if (typeof error.errors === "string") {
    toast.error(error.errors);
  } else if (typeof error.message === "string") {
    toast.error(error.message);
  } else if (typeof error === "string") {
    toast.error(error);
  } else {
    toast.error("Your request has encountered an error. Please try again");
  }
};
const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.response.use(
  (config) => {
    return config;
  },
  (error) => {
    console.log("eroooor", error);
    if (!!error.response && error?.response?.status < 500) {
      handelErrorsApi(
        error.response.data?.message ??
          error.response.data?.error ??
          error.response.data?.errors
      );
    } else {
      toast.error("خطا هست");
    }

    return Promise.reject(error);
  }
);

axiosInstance.interceptors.request.use((config) => {
  const token = Cookies.get("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
