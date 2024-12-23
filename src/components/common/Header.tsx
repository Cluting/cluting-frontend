import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AdminProfileDropdown from "./AdminProfileDropdown";
import { useAuthStore } from "../../store/useAuthStore";

export default function Header() {
  const { isLogin } = useAuthStore();
  const [isLoginPage, setIsLoginPage] = useState(false); // 로그인/회원가입 페이지 여부
  const [adminProfile, setAdminProfile] = useState(false); //운영진 프로필 드롭다운

  useEffect(() => {
    // 상태 변경을 감지해 디버깅하거나 추가 작업 수행
    console.log("로그인 상태 변경:", isLogin);
  }, [isLogin]);

  return (
    <nav className="fixed z-[999] w-full h-[54px] bg-gray-900 px-[30px] flex justify-between items-center">
      <Link to="/main">
        <div className="flex items-center gap-2">
          <img
            src="/assets/logo/ic-logoIcon.svg"
            alt="로고 아이콘"
            className="w-[40px] h-[40px] "
          />
          <img
            src="/assets/logo/ic-logoTitle.svg"
            alt="로고 타이틀"
            className="w-[80px] h-[33px]"
          />
        </div>
      </Link>
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
            <div className="text-gray-300">
              <Link to={"/login"} className="hover:text-gray-500">
                로그인
              </Link>
              /
              <Link to={"/signup"} className="hover:text-gray-500">
                회원가입
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
