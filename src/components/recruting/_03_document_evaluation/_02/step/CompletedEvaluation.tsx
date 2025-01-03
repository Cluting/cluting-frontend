import React, { useEffect, useState } from "react";
import FitMemberList from "../list/FitMemberList";
import { useApplicantEvaluationStore } from "../../../../../store/useEvaluationStore";
import { useMutation, useQuery } from "@tanstack/react-query";
import { postDocComplete } from "../../service/Step3";
import { getMe } from "../../../../signup/services/User";
import {
  useRecruitmentStepStore,
  useStepThreeStore
} from "../../../../../store/useStore";
import StepCompleteModal from "../../../common/StepCompleteModal";
import { BUTTON_TEXT } from "../../../../../constants/recruting";

interface CompletedEvaluationProps {
  filter: string;
  sortType: string;
}

const CompletedEvaluation: React.FC<CompletedEvaluationProps> = ({
  filter,
  sortType
}) => {
  const { applicants } = useApplicantEvaluationStore();

  const [members, setMembers] = useState<Applicant[]>(applicants);
  const [filteredData, setFilteredData] = useState<Applicant[]>([]);
  const [filteredData2, setFilteredData2] = useState<Applicant[]>([]);

  //TODO: 응답받은 데이터 리스트로 렌더링해야함
  const [applicationData, setApplicationData] = useState<ApplicationResponse[]>(
    []
  );

  //FIX:
  const recruitId = 1;
  const mutation = useMutation(
    (data: DocBeforeRequest) => postDocComplete(recruitId, data),
    {
      onSuccess: (response) => {
        console.log(
          "서류 평가하기 <평가 완료> 지원서 리스트 불러오기가 성공적으로 실행되었습니다."
        );
        setApplicationData(response.data); // 응답 데이터 저장
        console.log("API 데이터", applicationData);
      },
      onError: (error) => {
        console.error(
          "서류 평가하기 <평가 완료> 지원서 리스트 불러오기 중 오류 발생:",
          error
        );
      }
    }
  );

  // 컴포넌트 마운트 시 POST 요청
  useEffect(() => {
    const initialData: DocBeforeRequest = {
      // POST 요청에 필요한 초기 데이터 구성
      groupName: null,
      sortOrder: "oldest"
    };
    console.group(initialData);
    mutation.mutate(initialData);
  }, []); // 빈 의존성 배열로 컴포넌트 마운트 시에만 실행

  const { data: user } = useQuery(["me"], getMe, {
    onError: (error) => {
      console.error("유저 본인 정보 조회 실패:", error);
    }
  });

  useEffect(() => {
    // 평가 완료 상태 데이터 필터링
    if (user) {
      const completedMembers = members.filter(
        (item) =>
          item.evaluators &&
          item.incomplete === item.all &&
          item.evaluators.some(
            (evaluator) =>
              evaluator.state === "평가 완료" && evaluator.name === user.name
          )
      );

      // 합격자와 불합격자 분리
      const filteredAccepted = completedMembers.filter(
        (item) => item.isPass === true
      );
      const filteredRejected = completedMembers.filter(
        (item) => item.isPass === false
      );

      const sortData = (data: Applicant[]) =>
        sortType === "가나다순"
          ? [...data].sort((a, b) => a.name.localeCompare(b.name))
          : data;

      setFilteredData(
        filter === "전체"
          ? sortData(filteredAccepted)
          : sortData(filteredAccepted.filter((item) => item.group === filter))
      );

      setFilteredData2(
        filter === "전체"
          ? sortData(filteredRejected)
          : sortData(filteredRejected.filter((item) => item.group === filter))
      );
    }
  }, [filter, sortType, members]);

  const handleDispute = (id: string) => {
    setMembers((prevMembers) =>
      prevMembers.map((member) =>
        member.id === id
          ? {
              ...member,
              state: "이의 제기중",
              isDecisionMode: !member.isDisputed,
              isDisputed: true
            }
          : member
      )
    );
  };

  const handleDecision = (id: string) => {
    const isAccepted = window.confirm("합격으로 결정하시겠습니까?");
    setMembers((prevMembers) =>
      prevMembers.map((member) =>
        member.id === id
          ? {
              ...member,
              result: isAccepted ? "합격" : "불합격",
              isDecisionMode: false
            }
          : member
      )
    );
  };

  const { completedSteps, completeStep } = useRecruitmentStepStore();
  const [isStepCompleteModalOpen, setStepCompleteModalOpen] = useState(false);

  const { setStepCompleted, steps } = useStepThreeStore();

  const handleStepThreeSubmit = () => {
    if (!completedSteps[0]) {
      setStepCompleteModalOpen(true);
    }
  };

  const handleCloseStepCompleteModal = () => setStepCompleteModalOpen(false);

  const handleConfirmStepComplete = () => {
    completeStep(2);
    setStepCompleted(1, true);
    setStepCompleteModalOpen(false);
  };

  return (
    <>
      <div className="w-[1016px] flex items-start gap-[22px] p-[20px] self-stretch rounded-[21px] border border-[#D0D4E7] bg-white-100">
        <div className="flex flex-col gap-4 w-[476px]">
          <h2 className="text-left text-gray-1100 text-title3">
            결과를 수정하려면 이의를 제기해주세요.
          </h2>
          <FitMemberList
            items={filteredData}
            state="평가 완료"
            isEvaluationDone
            onDispute={handleDispute}
            onDecision={handleDecision}
          />
        </div>

        <div className="flex flex-col gap-4 w-[476px]">
          <h2 className="text-left text-gray-1100 text-title3 h-[24px]"></h2>
          <FitMemberList
            items={filteredData2}
            state="평가 완료"
            isEvaluationDone
            onDispute={handleDispute}
            onDecision={handleDecision}
          />
        </div>
      </div>
      <div className="flex justify-center">
        <button
          type="submit"
          onClick={handleStepThreeSubmit}
          className={`w-[210px] h-[54px] rounded-[11px] mt-[50px] ${
            steps[1].completed
              ? "bg-main-400 border border-main-100 text-main-100"
              : "bg-main-100 text-white-100"
          } text-body flex-center hover:bg-main-500`}
        >
          {steps[1].completed ? BUTTON_TEXT.EDIT : BUTTON_TEXT.COMPLETE}
        </button>
      </div>
      {isStepCompleteModalOpen && (
        <StepCompleteModal
          onClose={handleCloseStepCompleteModal}
          onConfirm={handleConfirmStepComplete}
          stepIndex={2}
        />
      )}
    </>
  );
};

export default CompletedEvaluation;
