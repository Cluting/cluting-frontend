import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function AdminInvite() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const token = new URLSearchParams(location.search).get("token");
    if (token) {
      handleInvite(token);
    } else {
      // 토큰이 없으면 메인 페이지로 리다이렉트
      navigate("/");
    }
  }, [location, navigate]);

  const handleInvite = async (token: string) => {
    try {
      // 여기에 초대 처리 로직 구현
      // 예: API 호출, 상태 업데이트 등
      console.log("Handling invite with token:", token);
      // 성공 시 적절한 페이지로 리다이렉트
      // navigate('/dashboard');
    } catch (error) {
      console.error("초대 처리 중 오류 발생:", error);
      // 오류 처리 (예: 에러 메시지 표시)
    }
  };

  return (
    <div>
      <h1>초대 처리 중...</h1>
    </div>
  );
}

export default AdminInvite;
