import { useState } from "react";
import ApplicationQuestion from "../../../components/recruting/_03_document_evaluation/evaluation/ApplicationQuestion";
import UserProfile from "../../../components/recruting/_03_document_evaluation/evaluation/UserProfile";
import Portfolio from "../../../components/recruting/_03_document_evaluation/evaluation/Portfolio";
import AdminEvaluationWindow from "../../../components/recruting/_03_document_evaluation/evaluation/AdminEvaluationWindow";
import Sidemenu from "../../../components/recruting/common/Sidemenu";

//3 - 리크루팅 : 서류 평가하기 단계
export default function Evaluation() {
  const [view, setView] = useState("application"); // 초기 상태는 "application"
  return (
    <div className=" flex flex-col items-center h-full pt-6 bg-gray-100 ">
      <Sidemenu />
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

        <AdminEvaluationWindow />
      </div>
    </div>
  );
}
