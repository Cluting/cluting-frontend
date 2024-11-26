import { useState } from "react";
import ApplicationQuestion from "../../../components/recruting/document/ApplicationQuestion";
import UserProfile from "../../../components/recruting/document/UserProfile";
import AdminEvaluationWindow from "../../../components/recruting/_03_document_evaluation/evaluation/AdminEvaluationWindow";
import Sidemenu from "../../../components/recruting/common/Sidemenu";
import Portfolio from "../../../components/recruting/document/Portfolio";
import { useLocation } from "react-router-dom";
import IndividualQuestionWindow from "../../../components/recruting/_05_interview_evaluation/individual_question/IndividualQuestionWindow";

//3 - 리크루팅 : 서류 평가하기 단계
export default function ApplicantDocument() {
  const [view, setView] = useState("application"); // 초기 상태는 "application"
  // 현재 경로 가져오기
  const location = useLocation();

  return (
    <div className=" flex flex-col items-center h-full pt-6 bg-gray-100 ">
      <div className="z-40">
        <Sidemenu />
      </div>
      <div className="z-[0] flex-center absolute top-50 left-28">
        {/* TODO: 뒤로가기 버튼 추가 , 링크 연결 */}
        <p className="text-title1">김민지</p>
        <p className="text-gray-800 text-title3 ml-[5px]">기획</p>
      </div>
      <div className="relative w-[829px] mb-[84px] h-full ">
        <div className="w-full flex justify-end">
          <button
            onClick={() => setView("application")}
            className={`button-main-bg-sm ${view === "application" ? "button-main-bg-sm" : "button-main-light-sm"}`}
          >
            지원서류
          </button>
          <button
            onClick={() => setView("portfolio")}
            className={`ml-4 ${view === "portfolio" ? "button-main-bg-sm" : "button-main-light-sm"}`}
          >
            포트폴리오
          </button>
        </div>
        {view === "application" && (
          <>
            <UserProfile />
            <ApplicationQuestion />
          </>
        )}

        {view === "portfolio" && (
          <>
            <Portfolio />
          </>
        )}

        {location.pathname === "/recruting/evaluation" && (
          <AdminEvaluationWindow />
        )}
        {location.pathname === "/recruting/individual_question" && (
          <IndividualQuestionWindow />
        )}
      </div>
    </div>
  );
}
