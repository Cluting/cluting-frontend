import { Navigate } from "react-router-dom";

interface PublicRouteProps {
  children: JSX.Element;
}

// 로그인 상태 확인: 토큰 존재 여부로 판단
const isAuthenticated = () => {
  const accessToken = localStorage.getItem("access_token");
  if (accessToken) {
    console.log("로그인되어 로그인 페이지에 접근 불가능합니다.");
  }
  return !!accessToken; // 토큰이 존재하면 true
};

export default function PublicRoute({ children }: PublicRouteProps) {
  if (isAuthenticated()) {
    // 로그인 상태면 메인 페이지로 리다이렉트
    return <Navigate to="/" replace />;
  }
  // 비로그인 상태면 요청한 페이지를 렌더링
  return children;
}
