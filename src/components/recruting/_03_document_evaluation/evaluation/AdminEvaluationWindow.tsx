import { useState } from "react";
import EvaluationCard from "./EvaluationCard";
import AdminEvaluationList from "./AdminEvaluationList";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getDocEvaluationContent, postDocEvaluation } from "../service/Step3";
import ClubIdealList from "./ClubIdealList";
import { useParams } from "react-router-dom";
import { getMe } from "../../../signup/services/User";

export default function AdminEvaluationWindow() {
  const [showAdminEvaluation, setShowAdminEvaluation] = useState(false);
  const [showClubIdeal, setShowClubIdeal] = useState(false);
  const [authority, setAuthority] = useState(true); //운영진 권한
  const [isEditMode, setIsEditMode] = useState(true);

  const {
    watch,
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<DocEvaluationRequest>({ mode: "onSubmit" });

  const { id } = useParams<{ id: string }>();
  // 동아리 등록
  //FIX: 리크루팅 아이디, 지원자 아이디 하드 코딩
  const recruitId = 1;
  const applicationId = Number(id);

  const { data: evaluationContent } = useQuery(
    ["evaluationContent", recruitId, id],
    () => getDocEvaluationContent(recruitId, parseInt(id!, 10)),
    {
      enabled: !!id
    }
  );

  console.log(evaluationContent);
  const evaluatorScores = evaluationContent?.evaluatorScores || [];
  const groupIdeals = evaluationContent?.groupIdeals || [];

  const { data: user } = useQuery(["me"], getMe, {});

  const docEvauationMutation = useMutation(
    (data: DocEvaluationRequest) =>
      postDocEvaluation(recruitId, applicationId, data),
    {
      onSuccess: (data) => {
        console.log(data);
        console.log("서류 평가 전송이 성공적으로 등록되었습니다!");
      }
    }
  );

  const onSubmit = (data: DocEvaluationRequest) => {
    console.log("폼 데이터:", data);
    docEvauationMutation.mutate(data);
    setIsEditMode(false); // 제출 시도 후 항상 편집 모드를 비활성화
  };

  //FIX: 서류 평가 기준 불러와서 EvaluationCard에 넘겨줘야 함

  const criteriaEvaluations = watch("criteriaEvaluations") || [];

  const averageScore = criteriaEvaluations.reduce(
    (acc, criteria) => {
      if (criteria.score !== undefined && criteria.score !== null) {
        acc.sum += criteria.score;
        acc.count += 1;
      }
      return acc;
    },
    { sum: 0, count: 0 }
  );

  const finalAverageScore =
    averageScore.count > 0
      ? (averageScore.sum / averageScore.count).toFixed(1)
      : "0.0";

  const handleEditComplete = () => {
    if (isEditMode) {
      handleSubmit(onSubmit)();
    } else {
      setIsEditMode(true);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="absolute top-[90px] right-[-420px] z-50 w-[386px] p-[17px] bg-gray-50 rounded-lg border border-gray-200 custom-shadow">
        <button
          onClick={() => {
            setShowClubIdeal(!showClubIdeal);
          }}
          className="flex-center w-full py-[13px] button-main-light border border-main-400 hover:text-white-100 hover:bg-main-100 font-semibold rounded-[7px]"
        >
          <img
            src="/assets/ic-ideal.svg"
            alt="인재상"
            className="w-6 h-6 mr-2"
          />
          우리 동아리 인재상 확인하기
        </button>
        <div className="flex items-center bg-gray-100 rounded-[7px] mt-[31px] py-[15px] px-[87px] flex-center">
          <p className="text-gray-800 font-semibold text-[15.71px]">
            총점 평균
          </p>
          <p className="font-bold text-[18px] ml-1">
            {evaluationContent?.averageScore}
          </p>
          <p className="text-gray-800 font-semibold text-[15.71px] ml-1">
            /100점
          </p>
        </div>
        <button
          onClick={() => {
            setShowAdminEvaluation(!showAdminEvaluation);
          }}
          className="flex justify-between items-center w-full hover:bg-main-300 border border-main-400 text-gray-1100 text-[15.71px] font-semibold rounded-[5.24px] px-[19px] py-4 mt-3"
        >
          다른 운영진 평가 보기
          <img
            src="/assets/ic-next.svg"
            alt="운영진 평가 보기"
            className="w-[15px] h-[15px]"
          />
        </button>

        {showAdminEvaluation && (
          <AdminEvaluationList
            evaluatorScores={evaluatorScores}
            onClose={() => setShowAdminEvaluation(false)}
          />
        )}
        {showClubIdeal && (
          <ClubIdealList
            groupIdeals={groupIdeals}
            onClose={() => setShowClubIdeal(false)}
          />
        )}

        {authority && (
          <>
            <section className="w-full mt-10">
              <div className="flex justify-between">
                <div className="flex items-center">
                  <p className="text-title3">{user?.name}</p>
                  <p className="text-subheadline text-[#949494] ml-1">평가자</p>
                </div>
                <div className="flex-center gap-[3px] bg-gray-100 rounded-[5px] pl-[26px] py-[5px] pr-1">
                  <p className="text-callout text-gray-1100 ">
                    {finalAverageScore}
                  </p>
                  <p className="text-caption3 text-gray-600">/100점</p>
                </div>
              </div>
              <EvaluationCard index={1} register={register} />
              <EvaluationCard index={2} register={register} />
              <EvaluationCard index={3} register={register} />
            </section>

            <section className="mt-10 mb-[27px] bg-main-300 rounded-[6.35px] p-3 ">
              <p className="text-left text-body text-gray-1100">코멘트</p>
              <textarea
                {...register("comment")}
                placeholder="작성하신 코멘트는 운영진 평가 보기에서 다른 팀원들에게 보여집니다."
                className="input-background input-style w-full text-[12.7px] overflow-hidden resize-none"
                rows={4}
              />
            </section>

            <button
              type="button"
              onClick={handleEditComplete}
              className={`button-main-bg hover:bg-main-500 py-4 px-[56px] text-body rounded-[11px] ${
                isEditMode
                  ? "bg-main-100"
                  : "bg-main-400 border border-main-100 text-main-100"
              }`}
            >
              {isEditMode ? "평가 완료" : "수정하기"}
            </button>
          </>
        )}
      </div>
    </form>
  );
}
