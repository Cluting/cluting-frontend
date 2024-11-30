import React, { useEffect, useState } from "react";
import WideMemberList from "../list/WideMemberList";
import { useApplicantEvaluationStore } from "../../../../../store/useEvaluationStore";

interface AfterEvaluationProps {
  filter: string;
  sortType: string;
}

const AfterEvaluation: React.FC<AfterEvaluationProps> = ({
  filter,
  sortType
}) => {
  const { applicants } = useApplicantEvaluationStore();
  const [filteredData, setFilteredData] = useState<Applicant[]>([]);

  //평가 끝내기
  const [evaluationProcess, setEvaluationProcess] = useState(false);

  useEffect(() => {
    let data = [...applicants];

    // 평가 완료 상태를 가진 항목 필터링
    data = data.filter(
      (item) =>
        item.evaluators &&
        item.evaluators.some(
          (evaluator) =>
            evaluator.state === "평가 완료" && evaluator.name === "홍길동"
        )
    );

    //FIX: 현재 운영진의 이름이 홍길동이라 가정

    console.log(data);
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
    <>
      <div className="w-[1016px] flex flex-col items-start gap-2.5 p-[20px] self-stretch rounded-[21px] border border-[#D0D4E7] bg-white-100 ">
        <WideMemberList items={filteredData} />
      </div>
      <div className="flex-center">
        <button
          type="submit"
          onClick={() => {
            setEvaluationProcess(true);
          }}
          className={`w-[210px] h-[54px] rounded-[11px] mt-[50px] mb-[143px] ${
            evaluationProcess
              ? "bg-main-400 border border-main-100 text-main-100 " //수정하기
              : "bg-main-100 text-white-100 " //완료하기
          }  text-body flex-center hover:bg-main-500`}
        >
          {evaluationProcess ? "수정하기" : "평가 끝내기"}
        </button>
      </div>

      {!evaluationProcess && (
        <div className="fixed animate-dropdown bottom-[16px]">
          <div className="relative custom-shadow  w-[1016px] h-[79px] bg-gray-100 border border-main-400 rounded-[11px] pl-[31px] flex items-center text-callout text-gray-800 overflow-hidden">
            최종적으로 수정할 사항이 없다면 평가 끝내기 버튼을 눌러주세요.
          </div>
        </div>
      )}
    </>
  );
};

export default AfterEvaluation;
