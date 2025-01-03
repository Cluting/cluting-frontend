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
    <div className="w-full bg-gray-100">
      {/* Header */}
      <div
        className="flex flex-col justify-between w-full h-32 px-28 pt-5 bg-[#F1F3FF]"
        style={{ boxShadow: "0px 4px 27.2px 0px rgba(0, 0, 0, 0.08" }}
      >
        {/* Header 윗부분 */}
        <div className="flex items-center gap-5">
          <div className="cursor-pointer">
            <img src="/assets/ic-chevronLeft.svg" alt="chevronLeft" />
          </div>
          <h2 className="text-[#000] font-Pretendard font-semibold text-2xl">
            대학생 연합 IT 동아리 잇타 7기 신입 회원 모집
          </h2>
          {/* 디데이 컴포넌트 */}
          <div className="flex px-[13.845px] py-1 bg-red-100 rounded-lg flex-center">
            <span className="text-lg font-bold text-white-100 font-Pretendard">
              D-3
            </span>
          </div>
          <p className="text-[#4C4E59] text-lg font-medium font-Pretendard">
            2월 16일(월) ~ 2월 27일(수)
          </p>
        </div>
        {/* Header 아랫부분 */}
        <div className="flex items-center w-full gap-0 ml-1">
          <button
            onClick={() => setMenu("announcement")}
            className={`flex-center flex-1 h-12 rounded-t-[11px] border  border-b-0 text-callout ${currentMenu === "announcement" ? "bg-[#5E2BE8] text-white-100" : "bg-[#F1F3FF] border-[#D0D4E7] text-[#5E2BE8]"} `}
          >
            공고 보기
          </button>
          <button
            onClick={() => setMenu("documentSubmit")}
            className={`flex-center flex-1 h-12 rounded-t-[11px] border  border-b-0 text-callout ${currentMenu === "documentSubmit" ? "bg-[#5E2BE8] text-white-100" : "bg-[#F1F3FF] border-[#D0D4E7] text-[#5E2BE8]"}`}
          >
            지원서 제출하기
          </button>
          <button
            onClick={() => setMenu("inquiry")}
            className={`flex-center flex-1 h-12 rounded-t-[11px] border  border-b-0 text-callout ${currentMenu === "inquiry" ? "bg-[#5E2BE8] text-white-100" : "bg-[#F1F3FF] border-[#D0D4E7] text-[#5E2BE8]"}`}
          >
            문의 하이라이트
          </button>
        </div>
      </div>
      <div className="w-full p-4 mt-4 bg-white border rounded">
        {currentMenu === "announcement" && <AnnouncementContainer />}
        {currentMenu === "documentSubmit" && <DocumentSubmitContainer />}
        {currentMenu === "inquiry" && <InqueryContainer />}
      </div>
    </div>
  );
}
