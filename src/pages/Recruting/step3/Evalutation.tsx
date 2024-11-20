import { useState } from "react";
import ApplicationQuestion from "../../../components/recruting/_03_document_evaluation/evaluation/ApplicationQuestion";
import UserProfile from "../../../components/recruting/_03_document_evaluation/evaluation/UserProfile";

//3 - 리크루팅 : 서류 평가하기 단계
export default function Evaluation() {
  const [view, setView] = useState("application"); // 초기 상태는 "application"
  return (
    <div className="flex flex-col items-center h-full pt-6 bg-gray-100 ">
      <div className="w-[829px] mb-[84px] h-full">
        <div className="w-full flex justify-end">
          <button
            onClick={() => setView("application")}
            className="button-main-bg-sm "
          >
            지원서류
          </button>
          <button
            onClick={() => setView("portfolio")}
            className="ml-4 button-main-light-sm"
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
      </div>
    </div>
  );
}
