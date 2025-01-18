import { Link, useLocation, useNavigate } from "react-router-dom";
import AnnouncementContainer from "./container/AnnouncementContainer";
import DocumentSubmitContainer from "./container/DocumentSubmitContainer";
import InqueryContainer from "./inquery_highlight/InqueryContainer";
import { useEffect } from "react";
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

  // 컴포넌트 마운트 시 스크롤을 최상단으로 이동
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full h-auto bg-gray-100  mb-[500px]">
      <div className="flex flex-col items-start ">
        <header className="mb-[39px] flex-center gap-5 ">
          <Link to="/">
            <img src="/assets/ic-back.svg" alt="뒤로가기" />
          </Link>
          <h1 className="font-semibold text-[24px]">
            대학생 연합 IT 동아리 잇타 7기 신입 회원 모집
          </h1>
          <div className="flex-center w-[60px] h-[37px] bg-[#FF5252] text-white-100 rounded-lg font-bold">
            D-3
          </div>
        </header>
        <section>
          <div className="w-full flex items-center gap-0">
            <button
              onClick={() => setMenu("announcement")}
              className={`flex-center w-[404px] h-[43px] rounded-t-[11px] border  border-b-0 text-callout ${currentMenu === "announcement" ? "bg-main-100 text-white-100 border-main-100" : "bg-gray-100 text-gray-1100 border-gray-200"} `}
            >
              공고 보기
            </button>
            <button
              onClick={() => setMenu("documentSubmit")}
              className={`flex-center w-[404px] h-[43px] rounded-t-[11px] border  border-b-0 text-callout ${currentMenu === "documentSubmit" ? "bg-main-100 text-white-100 border-main-100" : "bg-gray-100 text-gray-1100 border-gray-200"}`}
            >
              지원서 제출하기
            </button>
            <button
              onClick={() => setMenu("inquiry")}
              className={`flex-center w-[404px] h-[43px] rounded-t-[11px] border  border-b-0 text-callout ${currentMenu === "inquiry" ? "bg-main-100 text-white-100 border-main-100" : "bg-gray-100 text-gray-1100 border-gray-200"}`}
            >
              문의 하이라이트
            </button>
          </div>
          {!(currentMenu === "inquiry") && (
            <div className="w-[1213px] px-12 py-11 bg-white-100 border rounded-b-xl">
              {currentMenu === "announcement" && <AnnouncementContainer />}
              {currentMenu === "documentSubmit" && <DocumentSubmitContainer />}
            </div>
          )}
          {currentMenu === "inquiry" && <InqueryContainer />}
        </section>
      </div>
    </div>
  );
}
