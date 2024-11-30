import React, { useEffect, useState } from "react";
import FitMemberList from "../list/FitMemberList";
import { useApplicantEvaluationStore } from "../../../../../store/useEvaluationStore";

interface DuringEvaluationProps {
  filter: string; // 필터링 기준
  sortType: string; // 정렬 기준
}

interface Member {
  id: string;
  state: string;
  name: string;
  phone: string;
  group: string;
  incomplete: number;
  all: number;
  result?: "합격" | "불합격";
}

const DuringEvaluation: React.FC<DuringEvaluationProps> = ({
  filter,
  sortType
}) => {
  const { applicants } = useApplicantEvaluationStore();
  const [filteredData, setFilteredData] = useState<Applicant[]>([]);
  const [filteredData2, setFilteredData2] = useState<Applicant[]>([]);

  // 첫 번째 데이터
  useEffect(() => {
    let data = [...applicants];

    // 평가 중 상태를 가진 항목 필터링
    data = data.filter(
      (item) =>
        item.evaluators &&
        item.evaluators.some((evaluator) => evaluator.state === "평가 중")
    );

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

  // 두 번째 데이터
  useEffect(() => {
    let data = [...applicants];

    // 평가 중 상태를 가진 항목 필터링
    data = data.filter(
      (item) =>
        item.evaluators &&
        item.evaluators.some(
          (evaluator) =>
            evaluator.name === "홍길동" &&
            evaluator.state === "평가 완료" &&
            item.isPass === false
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

    setFilteredData2(data);
  }, [filter, sortType]);

  return (
    <div className="w-[1016px] flex items-start gap-[22px] p-[20px] self-stretch rounded-[21px] border border-[#D0D4E7] bg-white-100">
      <div className="flex flex-col gap-4 w-[476px]">
        <h2 className="text-left text-gray-1100 text-title3">
          이어서 평가를 완료해 주세요.
        </h2>
        {/* FitMemberList에 필터링된 데이터 전달 */}
        <FitMemberList items={filteredData} state="평가 중" />
      </div>

      <div className="flex flex-col gap-4 w-[476px]">
        <h2 className="text-left text-gray-1100 text-title3">
          팀원들이 아직 평가 중이에요.
        </h2>
        {/* FitMemberList에 필터링된 데이터 전달 */}
        <FitMemberList items={filteredData2} state="평가 완료" />
      </div>
    </div>
  );
};

export default DuringEvaluation;
