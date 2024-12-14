import axios from "axios";

export const Instance = axios.create({
  baseURL: "http://52.78.93.170:8080/api/v1"
  //FIX: env로 수정
});

// // 요청 시 Authorization 헤더 추가
// Instance.interceptors.request.use((config) => {
//   const accessToken = localStorage.getItem("access_token");
//   if (accessToken) {
//     config.headers["Authorization"] = `Bearer ${accessToken}`;
//   }
//   return config;
// });
