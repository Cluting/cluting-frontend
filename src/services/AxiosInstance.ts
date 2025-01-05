import axios from "axios";

export const Instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    "Access-Control-Allow-Origin": "http://localhost:3000",
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Allow-Methods": "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS"
  }
});

// 요청 시 Authorization 헤더 추가
Instance.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("access_token");
  if (accessToken) {
    config.headers["Authorization"] = `Bearer ${accessToken}`;
  }
  return config;
});

// Instance.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     // 액세스 토큰이 만료된 경우 (401 에러)
//     if (error.response.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;

//       try {
//         // 리프레시 토큰을 사용하여 새로운 액세스 토큰 요청
//         const refreshToken = localStorage.getItem("refresh_token");
//         const response = await axios.post(
//           `${process.env.REACT_APP_BASE_URL}/refresh`,
//           { refreshToken }
//         );

//         if (response.data.accessToken) {
//           localStorage.setItem("access_token", response.data.accessToken);
//           Instance.defaults.headers.common["Authorization"] =
//             `Bearer ${response.data.accessToken}`;
//           return Instance(originalRequest);
//         }
//       } catch (refreshError) {
//         // 리프레시 토큰도 만료된 경우 로그아웃 처리
//         console.log("로그인 만료되었습니다. 로그아웃 처리합니다.");
//         localStorage.removeItem("access_token");
//         localStorage.removeItem("refresh_token");
//         // 로그인 페이지로 리다이렉트
//         window.location.href = "/login";
//       }
//     }

//     return Promise.reject(error);
//   }
// );
