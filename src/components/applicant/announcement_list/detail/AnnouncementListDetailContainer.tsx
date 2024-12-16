import { useLocation, useNavigate } from "react-router-dom";
import AnnouncementContainer from "./container/AnnouncementContainer";
import DocumentSubmitContainer from "./container/DocumentSubmitContainer";
import InqueryContainer from "./container/InqueryContainer";
// 공고 클릭 시 상세
export default function AnnouncementListDetailContainer() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const currentMenu = queryParams.get("menu") || "announcement";

  const setMenu = (menu: "announcement" | "documentSubmit" | "inquiry") => {
    queryParams.set("menu", menu);
    navigate(`${location.pathname}?${queryParams.toString()}`);
  };

  return (
    <div className="w-full h-screen flex-center bg-gray-100">
      <div className="flex flex-col items-start ">
        <h1>공고 클릭 시 상세</h1>

        <section>
          <div className="w-full ml-1 flex items-center gap-0">
            <button
              onClick={() => setMenu("announcement")}
              className={`flex-center w-[162px] h-[43px] rounded-t-[11px] border  border-b-0 text-callout ${currentMenu === "announcement" ? "bg-main-100 text-white-100" : "bg-main-300 text-gray-1100"} `}
            >
              공고 보기
            </button>
            <button
              onClick={() => setMenu("documentSubmit")}
              className={`flex-center w-[162px] h-[43px] rounded-t-[11px] border  border-b-0 text-callout ${currentMenu === "documentSubmit" ? "bg-main-100 text-white-100" : "bg-main-300 text-gray-1100"}`}
            >
              지원서 제출하기
            </button>
            <button
              onClick={() => setMenu("inquiry")}
              className={`flex-center w-[162px] h-[43px] rounded-t-[11px] border  border-b-0 text-callout ${currentMenu === "inquiry" ? "bg-main-100 text-white-100" : "bg-main-300 text-gray-1100"}`}
            >
              문의 하이라이트
            </button>
          </div>
          <div className="mt-4 w-full p-4 bg-white border rounded">
            {currentMenu === "announcement" && <AnnouncementContainer />}
            {currentMenu === "documentSubmit" && <DocumentSubmitContainer />}
            {currentMenu === "inquiry" && <InqueryContainer />}
          </div>
        </section>
      </div>
    </div>
  );
}
