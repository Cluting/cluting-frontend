import { useLocation, useNavigate } from "react-router-dom";
import AnnouncementContainer from "../../components/applicant/announcement_list/detail/AnnouncementContainer";
import DocumentSubmitContainer from "../../components/applicant/announcement_list/detail/DocumentSubmitContainer";
import InqueryContainer from "../../components/applicant/announcement_list/detail/InqueryContainer";

// 공고 보기
export default function AnnouncementListDetail() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const currentMenu = queryParams.get("menu") || "announcement";

  const setMenu = (menu: "announcement" | "documentSubmit" | "inquiry") => {
    queryParams.set("menu", menu);
    navigate(`${location.pathname}?${queryParams.toString()}`);
  };

  return (
    <div className="w-full h-screen bg-gray-100 flex-center">
      <div className="w-full h-screen bg-gray-100 flex-center">
        <div className="flex flex-col items-start ">
          <h1>공고 클릭 시 상세</h1>

          <section>
            <div className="flex items-center w-full gap-0 ml-1">
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
            <div className="w-full p-4 mt-4 bg-white border rounded">
              {currentMenu === "announcement" && <AnnouncementContainer />}
              {currentMenu === "documentSubmit" && <DocumentSubmitContainer />}
              {currentMenu === "inquiry" && <InqueryContainer />}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
