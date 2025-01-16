import { useLocation, useNavigate } from "react-router-dom";
import MyDocumentContainer from "./container/UserProfileCard/MyDocumentContainer";
import MyPortfolioContainer from "./container/MyPortfolioContainer";
import RecrutingInfoContainer from "./container/RecrutingInfoContainer/RecrutingInfoContainer";
import ClubInfo from "./ClubInfo";
// 나의 지원 기록 상세
export default function ApplicationHistoryDetailContainer() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const currentMenu = queryParams.get("menu") || "document";

  const setMenu = (menu: "document" | "portfolio" | "recrutingInfo") => {
    queryParams.set("menu", menu);
    navigate(`${location.pathname}?${queryParams.toString()}`);
  };

  return (
    <div className="w-full h-auto mt-[28px] ml-[52px] bg-gray-100">
      <div className="flex flex-col items-start">
        <div>
          <ClubInfo />
        </div>
        <section>
          <div className="mt-[28px] w-full flex items-center gap-0">
            <button
              onClick={() => setMenu("document")}
              className={`flex-center w-[198px] h-[50px] rounded-t-[11px] border border-gray-200 border-b-0 text-callout ${currentMenu === "document" ? "bg-main-100 text-white-100" : "bg-gray-100 text-main-100"} `}
            >
              나의 지원서
            </button>
            <button
              onClick={() => setMenu("portfolio")}
              className={`flex-center w-[198px] h-[50px] rounded-t-[11px] border border-gray-200 border-b-0 text-callout ${currentMenu === "portfolio" ? "bg-main-100 text-white-100" : "bg-gray-100 text-main-100"}`}
            >
              나의 포트폴리오
            </button>
            <button
              onClick={() => setMenu("recrutingInfo")}
              className={`flex-center w-[198px] h-[50px] rounded-t-[11px] border border-gray-200 border-b-0 text-callout ${currentMenu === "recrutingInfo" ? "bg-main-100 text-white-100" : "bg-gray-100 text-main-100"}`}
            >
              동아리 리크루팅 정보
            </button>
          </div>
          <div className="w-[1213px] bg-white-100  rounded rounded-tr-[12px] rounded-bl-[12px] rounded-br-[12px]">
            {currentMenu === "document" && <MyDocumentContainer />}
            {currentMenu === "portfolio" && <MyPortfolioContainer />}
            {currentMenu === "recrutingInfo" && <RecrutingInfoContainer />}
          </div>
        </section>
      </div>
    </div>
  );
}
