import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMe } from "../../signup/services/User";
import { useAuthStore } from "../../../store/useAuthStore";

interface SidemenuProps {
  forceClose?: boolean;
}

export default function Sidemenu({ forceClose = false }: SidemenuProps) {
  const { data: user } = useQuery(["me"], getMe, {
    onError: (error) => {
      console.error("유저 본인 정보 조회 실패:", error);
    }
  });
  console.log(user);

  // 반응형
  const [sidemenuClose, setSidemenuClose] = useState(false);
  const handleResize = () => {
    if (window.innerWidth <= 1200) {
      setSidemenuClose(true);
    } else {
      setSidemenuClose(forceClose);
    }
  };

  useEffect(() => {
    setSidemenuClose(forceClose);
  }, [forceClose]);

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [forceClose]);

  const { setLogin } = useAuthStore();
  const handleLogout = () => {
    setLogin(false);
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
  };

  return (
    <div
      className={`relative rounded-[28px] bg-white-100 custom-shadow ${
        sidemenuClose ? "w-[80px] px-2" : "w-[300px] px-5"
      } h-[916px]  py-[26px] transition-all`}
    >
      <section
        className={` ${
          sidemenuClose ? "flex-center pl-4" : "flex items-center px-[18px]"
        }  w-full h-[86px] bg-gray-100 boreder border-main-300  rounded-[14px] transition-all`}
      >
        <img
          src="/assets/ic-profile.svg"
          alt="지원자 프로필"
          onClick={() => setSidemenuClose(!sidemenuClose)}
          className="w-[50px] h-[50px] "
        />
        <div className="text-left ml-4">
          {!sidemenuClose && (
            <>
              <p className="text-body">{user ? user.name : "-"}</p>
              <p className="text-gray-900 text-caption1 mt-[5px]">
                {user ? user.email : "로그인이 필요합니다"}
              </p>
            </>
          )}
        </div>
      </section>

      <section className="text-gray-600 text-left text-callout mt-[19px]">
        <Link to={"/applicant/home"}>
          <button className="flex items-center h-[46px] hover:bg-gray-100 w-full rounded-[8px] pl-3">
            <img
              src="/assets/ic-sidemenu-home.svg"
              alt="프로필 홈"
              className="w-6 h-6 mr-[10px]"
            />
            {!sidemenuClose && "프로필 홈"}
          </button>
        </Link>

        <button className="flex items-center mt-1 hover:bg-gray-100 w-full rounded-[8px] pl-3  h-[46px]">
          <img
            src="/assets/ic-sidemenu-setting.svg"
            alt="계정 설정"
            className="w-6 h-6 mr-[10px]"
          />
          {!sidemenuClose && "계정 설정"}
        </button>
      </section>

      <section className="text-gray-600 text-subheadline border-t border-t-1 my-5">
        <Link
          to={"/applicant/profile"}
          className="h-[46px] flex items-center my-[10px] rounded-lg hover:bg-gray-100 hover:text-gray-900 group"
        >
          <img
            src="/assets/sidemenu/ic-saveProfile.svg"
            className=" w-6 h-6 mx-3 group-hover:hidden"
          />

          <img
            src="/assets/sidemenu/ic-saveProfile-main.svg"
            className=" w-6 h-6 mx-3 hidden group-hover:block"
          />
          {!sidemenuClose && <p>기본 프로필 저장</p>}
        </Link>

        <Link
          to={"/applicant/announcement/inProgress"}
          className="h-[46px] flex items-center my-[10px] rounded-lg hover:bg-gray-100 hover:text-gray-900 group"
        >
          <img
            src="/assets/sidemenu/ic-announcementList.svg"
            className=" w-6 h-6 mx-3 group-hover:hidden"
          />

          <img
            src="/assets/sidemenu/ic-announcementList-main.svg"
            className=" w-6 h-6 mx-3 hidden group-hover:block"
          />
          {!sidemenuClose && <p>공고 리스트</p>}
        </Link>

        <Link
          to={"/applicant/applications/pass"}
          className="h-[46px] flex items-center my-[10px] rounded-lg hover:bg-gray-100 hover:text-gray-900 group"
        >
          <img
            src="/assets/sidemenu/ic-myHistory.svg"
            className=" w-5 h-5 mx-3 group-hover:hidden"
          />
          <img
            src="/assets/sidemenu/ic-myHistory-main.svg"
            className=" w-5 h-5 mx-3 hidden group-hover:block"
          />
          {!sidemenuClose && <p>나의 지원 기록</p>}
        </Link>
      </section>
      {!sidemenuClose && (
        <button
          onClick={handleLogout}
          className="w-full bottom-[20px] text-caption3 py-[10px] px-[86px] mr-3 bg-gray-100 rounded-lg  text-gray-800 hover:bg-gray-300"
        >
          로그아웃
        </button>
      )}
    </div>
  );
}
