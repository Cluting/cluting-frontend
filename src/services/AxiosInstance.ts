import axios from "axios";

export const Instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL
});

// 요청 시 Authorization 헤더 추가
Instance.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("access_token");
  if (accessToken) {
    config.headers["Authorization"] = `Bearer ${accessToken}`;
  }
  return config;
});
