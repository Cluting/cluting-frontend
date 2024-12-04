import React, { useEffect, useState } from "react";
import WideMemberList from "../list/WideMemberList";
import { useApplicantEvaluationStore } from "../../../../../store/useEvaluationStore";

interface BeforeEvaluationProps {
  filter: string;
  sortType: string;
}

const BeforeEvaluation: React.FC<BeforeEvaluationProps> = ({
  filter,
  sortType
}) => {
  const { applicants } = useApplicantEvaluationStore();
  const [filteredData, setFilteredData] = useState<Applicant[]>([]);

  useEffect(() => {
    let data = [...applicants];

    // 평가 전 상태를 가진 항목 필터링
    data = data.filter(
      (item) =>
        item.evaluators &&
        item.evaluators.some(
          (evaluator) =>
            evaluator.evaluation.some(
              (evalItem) => evalItem.state === "평가 전"
            ) && evaluator.name === "홍길동"
        )
    );

    //FIX: 현재 운영진의 이름이 홍길동이라 가정

    // 필터 처리
    if (filter !== "전체") {
      data = data.filter((item) => item.group === filter);
    }

    // 정렬 처리
    if (sortType === "가나다순") {
      data.sort((a, b) => a.name.localeCompare(b.name));
    }

    setFilteredData(data);
  }, [filter, sortType]);

  return (
    <div className="w-[1016px] flex items-start gap-2.5 p-[20px] self-stretch rounded-[21px] border border-[#D0D4E7] bg-white-100">
      <WideMemberList items={filteredData} />
    </div>
  );
};

export default BeforeEvaluation;
