import React, { useEffect, useState } from "react";
import FitMemberList from "../list/FitMemberList";
import { useApplicantEvaluationStore } from "../../../../../store/useEvaluationStore";
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

  useEffect(() => {
    // 평가 완료 상태 데이터 필터링
    const completedMembers = members.filter(
      (item) =>
        item.evaluators &&
        item.incomplete === item.all &&
        item.evaluators.some(
          (evaluator) =>
            evaluator.evaluation.some(
              (evalItem) => evalItem.state === "평가 완료"
            ) && evaluator.name === "홍길동"
        )
    );

    //FIX: 현재 운영진의 이름이 홍길동이라 가정

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
      {/* <div className="flex justify-center">
        <button
          type="submit"
          onClick={handleStepTwoSubmit}
          className={`w-[210px] h-[54px] rounded-[11px] mt-[50px] ${
            steps[2].completed
              ? "bg-main-400 border border-main-100 text-main-100"
              : "bg-main-100 text-white-100"
          } text-body flex-center hover:bg-main-500`}
        >
          {steps[2].completed ? BUTTON_TEXT.EDIT : BUTTON_TEXT.COMPLETE}
        </button>
      </div> */}
    </>
  );
};

export default CompletedEvaluation;
