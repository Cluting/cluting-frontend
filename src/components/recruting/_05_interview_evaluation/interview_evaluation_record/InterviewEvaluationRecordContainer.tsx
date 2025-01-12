import { Link } from "react-router-dom";
import UserProfile from "../../document/UserProfile";
import QuestionAnswer from "./QuestionAnswer";
import AdminEvaluationWindow from "../../_03_document_evaluation/evaluation/AdminEvaluationWindow";
import { useState } from "react";
import Portfolio from "../../document/Portfolio";

export default function InterviewEvaluationRecordContainer() {
  const [view, setView] = useState("application");

  return (
    <div className="w-fit h-full flex-col items-center relative ">
      <div className="flex items-center gap-2 mb-10 ">
        <Link to="/recruting/05_interview_evaluation/interview">
          <img src="/assets/ic-back.svg" alt="뒤로가기" />
        </Link>
        <p className="text-title1 text-gray-1300 mt-1  text-left ml-[21px]">
          {"곽서연"}
        </p>
        <p className="text-title3 text-gray-800 mt-1">{"기획"}</p>
      </div>
      <section className="relative w-[829px] ">
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
            <div className="mt-5">
              <QuestionAnswer type="common" />
              <QuestionAnswer type="part" />
              <QuestionAnswer type="individual" />
            </div>
          </>
        )}

        {view === "portfolio" && (
          <>
            <Portfolio />
          </>
        )}
      </section>
      <AdminEvaluationWindow />
    </div>
  );
}
