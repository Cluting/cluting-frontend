import { useLocation, useNavigate } from "react-router-dom";
import MyDocumentContainer from "./container/MyDocumentContainer";
import MyPortfolioContainer from "./container/MyPortfolioContainer";
import RecrutingInfoContainer from "./container/RecrutingInfoContainer";

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
    <div className="w-full h-screen flex-center bg-gray-100">
      <div className="flex flex-col items-start ">
        <h1>나의 지원 기록</h1>

        <section>
          <div className="w-full ml-1 flex items-center gap-0">
            <button
              onClick={() => setMenu("document")}
              className={`flex-center w-[162px] h-[43px] rounded-t-[11px] border  border-b-0 text-callout ${currentMenu === "document" ? "bg-main-100 text-white-100" : "bg-main-300 text-gray-1100"} `}
            >
              나의 지원서
            </button>
            <button
              onClick={() => setMenu("portfolio")}
              className={`flex-center w-[162px] h-[43px] rounded-t-[11px] border  border-b-0 text-callout ${currentMenu === "portfolio" ? "bg-main-100 text-white-100" : "bg-main-300 text-gray-1100"}`}
            >
              나의 포트폴리오
            </button>
            <button
              onClick={() => setMenu("recrutingInfo")}
              className={`flex-center w-[162px] h-[43px] rounded-t-[11px] border  border-b-0 text-callout ${currentMenu === "recrutingInfo" ? "bg-main-100 text-white-100" : "bg-main-300 text-gray-1100"}`}
            >
              동아리 리크루팅 정보
            </button>
          </div>
          <div className="mt-4 w-full p-4 bg-white border rounded">
            {currentMenu === "document" && <MyDocumentContainer />}
            {currentMenu === "portfolio" && <MyPortfolioContainer />}
            {currentMenu === "recrutingInfo" && <RecrutingInfoContainer />}
          </div>
        </section>
      </div>
    </div>
  );
}
