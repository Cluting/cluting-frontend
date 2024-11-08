import { useState } from "react";
import { Link } from "react-router-dom";
import AdminProfileDropdown from "./AdminProfileDropdown";

export default function Header() {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoginPage, setIsLoginPage] = useState(false); // 로그인/회원가입 페이지 여부
  const [adminProfile, setAdminProfile] = useState(false); //운영진 프로필 드롭다운

  return (
    <nav className="fixed z-[999] w-full h-[54px] bg-gray-900 px-[30px] flex justify-between items-center">
      <div className="flex items-center gap-2">
        <img
          src="/assets/logo/ic-logoIcon.svg"
          alt="로고 아이콘"
          className="w-[20px] h-[23px] "
        />
        <img
          src="/assets/logo/ic-logoTitle.svg"
          alt="로고 타이틀"
          className="w-[80px] h-[33px]"
        />
      </div>
      {!isLoginPage && (
        <div className="flex items-center">
          <img
            src="/assets/ic-search.svg"
            alt="검색"
            className="w-[35px] h-[35px] mx-4"
          />
          {isLogin ? (
            <>
              {isLogin && (
                <>
                  <img
                    src="/assets/ic-notice.svg"
                    alt="알림"
                    className="w-[35px] h-[35px] mx-4"
                  />
                  <img
                    src="/assets/ic-profile.svg"
                    alt="개인 계정 프로필"
                    className="w-[35px] h-[35px] mx-3"
                  />
                  <button
                    className="relative flex items-center"
                    onClick={() => {
                      setAdminProfile(!adminProfile);
                    }}
                  >
                    <img
                      src="/assets/ic-profile.svg"
                      alt="운영자 계정 프로필"
                      className="w-[35px] h-[35px] mx-3"
                    />
                    <img
                      src="/assets/ic-dropdown.svg"
                      alt="운영자 계정 프로필 드롭다운"
                      className="w-[10px] h-[10px]"
                    />
                    {adminProfile && <AdminProfileDropdown />}
                  </button>
                </>
              )}
            </>
          ) : (
            <Link to={"/login"}>로그인 / 회원가입</Link>
          )}
        </div>
      )}
    </nav>
  );
}
