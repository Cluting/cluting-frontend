import { useLocation, useNavigate } from "react-router-dom";
import ProfileContainer from "./profile_container/ProfileContainer";
import PortfolioContainer from "./profile_container/PortfolioContainer";

// 기본 프로필 설정
export default function ApplicantProfileContainer() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const currentMenu = queryParams.get("menu") || "profile";

  const setMenu = (menu: "profile" | "portfolio") => {
    queryParams.set("menu", menu);
    navigate(`${location.pathname}?${queryParams.toString()}`);
  };

  return (
    <div className="ml-[34.38px] w-full h-full flex-center bg-gray-100">
      <div className="flex flex-col items-start ">
        <h1 className="text-title2 font-bold mb-4 mt-10">기본 프로필 설정</h1>
        <section>
          <div className="w-full flex items-center gap-0">
            <button
              onClick={() => setMenu("profile")}
              className={`flex-center w-[198px] h-[50px] rounded-t-[11px] border  border-b-0 text-callout ${currentMenu === "profile" ? "bg-main-100 text-white-100" : "bg-main-300 text-gray-1100"} `}
            >
              기본 프로필
            </button>
            <button
              onClick={() => setMenu("portfolio")}
              className={`flex-center w-[198px] h-[50px] rounded-t-[11px] border  border-b-0 text-callout ${currentMenu === "portfolio" ? "bg-main-100 text-white-100" : "bg-main-300 text-gray-1100"}`}
            >
              포트폴리오
            </button>
          </div>
          <div className="w-[1015px] rounded-md flex flex-col items-center">
            {currentMenu === "profile" && <ProfileContainer />}
            {currentMenu === "portfolio" && <PortfolioContainer />}
            <button
              type="submit"
              className={`w-[210px] h-[54px] rounded-[11px] mt-[50px] bg-main-100 text-white-100
         text-body flex-center hover:bg-main-500`}
            >
              저장
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
