import axios from "axios";

export const Instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  withCredentials: true,
  headers: {
    "Access-Control-Allow-Origin": "http://localhost:3000",
    "Access-Control-Allow-Credentials": "true"
  }
});

// 요청 인터셉터
Instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token"); // 예: 로컬 스토리지에서 액세스 토큰 가져오기
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Authorization 헤더에 토큰 추가
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
