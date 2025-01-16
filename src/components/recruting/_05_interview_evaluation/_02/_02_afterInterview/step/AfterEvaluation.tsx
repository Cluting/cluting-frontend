import React, { useCallback, useEffect, useState } from "react";
import WideMemberList from "../../../../_03_document_evaluation/_02/list/WideMemberList";
import { useQuery } from "@tanstack/react-query";
import { getInterviewEvaluationData } from "../../../service/Step5";

interface AfterEvaluationProps {
  filter: string;
  sortType: string;
}

interface ApiApplicant {
  stage: string;
  applicantName: string;
  applicantPhone: string;
  groupName: string;
  evaluationStatus: string;
}

interface Applicant {
  id: string;
  name: string;
  phone: string;
  group: string;
  incomplete: number;
  all: number;
  isPass: undefined;
  evaluators: any[];
  isDecisionMode: boolean;
  isDisputed: boolean;
  evaluationStage: string;
}

const AfterEvaluation: React.FC<AfterEvaluationProps> = ({
  filter,
  sortType
}) => {
  const [filteredData, setFilteredData] = useState<Applicant[]>([]);
  //평가 끝내기
  const [evaluationProcess, setEvaluationProcess] = useState(false);
  const handleEvaluationProcessToggle = () => {
    setEvaluationProcess(!evaluationProcess);
  };

  //FIX:
  const recruitId = 1;
  const { data: applicantsData } = useQuery(
    ["applicantsAfter", recruitId, filter, sortType],
    () =>
      getInterviewEvaluationData({
        recruitId,
        groupName: filter === "전체" ? undefined : filter,
        sortOrder: sortType === "지원순" ? "oldest" : "newest"
      }),
    {
      onSuccess: (data) => {
        const transformedData = transformApiResponse(data);
        setFilteredData(
          transformedData.filter((item) => item.evaluationStage === "AFTER")
        );
      }
    }
  );

  const transformApiResponse = (apiData: ApiApplicant[]): Applicant[] => {
    return apiData.map((item, index) => ({
      id: index.toString(),
      name: item.applicantName,
      phone: item.applicantPhone,
      group: item.groupName,
      incomplete: parseInt(item.evaluationStatus.split("/")[0], 10),
      all: parseInt(item.evaluationStatus.split("/")[1], 10),
      isPass: undefined,
      evaluators: [],
      isDecisionMode: false,
      isDisputed: false,
      evaluationStage: item.stage
    }));
  };

  const filterAndSortData = useCallback(
    (data: Applicant[]) => {
      let filteredData = [...data];

      if (filter !== "전체") {
        filteredData = filteredData.filter((item) => item.group === filter);
      }

      if (sortType === "가나다순") {
        filteredData.sort((a, b) => a.name.localeCompare(b.name));
      }

      return filteredData;
    },
    [filter, sortType]
  );

  //FIX: 이 부분도 운영진 상태 들어오는 대로 수정가능 , 열람 가능 처리 필요
  useEffect(() => {
    if (filteredData.length > 0) {
      const newFilteredData = filterAndSortData(filteredData);
      if (JSON.stringify(newFilteredData) !== JSON.stringify(filteredData)) {
        setFilteredData(newFilteredData);
      }
    }
  }, [filter, sortType, filterAndSortData, filteredData]);

  return (
    <>
      <div className="w-[1016px] flex flex-col items-start gap-2.5 p-[20px] self-stretch rounded-[21px] border border-[#D0D4E7] bg-white-100 ">
        <WideMemberList items={filteredData} />
      </div>
      <div className="flex-center">
        <button
          onClick={handleEvaluationProcessToggle}
          className={`w-[210px] h-[54px] rounded-[11px] mt-[50px] mb-[143px] ${
            evaluationProcess
              ? "bg-main-400 border border-main-100 text-main-100"
              : "bg-main-100 text-white-100"
          } text-body flex-center hover:bg-main-500`}
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
