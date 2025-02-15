import { Link, useNavigate, useParams } from "react-router-dom";
import UserProfile from "../../document/UserProfile";
import QuestionAnswer from "./QuestionAnswer";
import AdminEvaluationWindow from "../../_03_document_evaluation/evaluation/AdminEvaluationWindow";
import { useState } from "react";
import Portfolio from "../../document/Portfolio";
import ApplicationQuestion from "../../document/ApplicationQuestion";
import { useQuery } from "@tanstack/react-query";
import { getInterviewEvaluationContent } from "../service/Step5";

export default function InterviewEvaluationRecordContainer() {
  const [view, setView] = useState("application");

  const { id } = useParams<{ id: string }>();
  //FIX:
  const recruitId = 1;
  const { data: evaluationContent } = useQuery(
    ["evaluationContent", recruitId, id],
    () => getInterviewEvaluationContent(recruitId, parseInt(id!, 10)),
    {
      enabled: !!id
    }
  );

  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="w-fit h-full flex-col items-center relative ">
      <div className="flex items-center gap-2 mb-10 ">
        <button onClick={handleGoBack}>
          <img src="/assets/ic-back.svg" alt="뒤로가기" />
        </button>
        <p className="text-title1 text-gray-1300 mt-1  text-left ml-[21px]">
          {evaluationContent?.applicantInfo?.name}
        </p>
        <p className="text-title3 text-gray-800 mt-1">
          {evaluationContent?.applicantInfo?.groupName}
        </p>
      </div>
      <section className="relative w-[829px] ">
        <div className="w-full flex justify-end">
          <button
            onClick={() => setView("application")}
            className={`button-main-bg-sm ${view === "application" ? "button-main-bg-sm" : "button-main-light-sm"}`}
          >
            면접 기록
          </button>
          <button
            onClick={() => setView("doc")}
            className={`button-main-bg-sm ml-4 ${view === "doc" ? "button-main-bg-sm" : "button-main-light-sm"}`}
          >
            지원 서류
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

        {view === "doc" && (
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
      </section>
      <AdminEvaluationWindow />
    </div>
  );
}
