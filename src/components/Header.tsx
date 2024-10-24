import { useState } from "react";

export default function Header() {
  const [isLogin, setIsLogin] = useState(false);
  return (
    <nav className="fixed z-[999] w-full h-[54px] bg-white-100 px-[30px] flex justify-between items-center">
      <div className="w-[197px] bg-bg-100">로고</div>
      <div className="flex items-center">
        <img
          src="assets/ic-search.svg"
          alt="검색"
          className="w-[35px] h-[35px] mx-4"
        />
        {isLogin ? <div>참입니다</div> : <div>로그인 / 회원가입</div>}
      </div>
    </nav>
  );
}
