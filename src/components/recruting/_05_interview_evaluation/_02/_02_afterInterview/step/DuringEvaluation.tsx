import React, { useCallback, useEffect, useState } from "react";

import { useQuery } from "@tanstack/react-query";
import FitMemberList from "../../../../_03_document_evaluation/_02/list/FitMemberList";
import { getInterviewEvaluationData } from "../../../service/Step5";

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

interface DuringEvaluationProps {
  filter: string; // 필터링 기준
  sortType: string; // 정렬 기준
}

const DuringEvaluation: React.FC<DuringEvaluationProps> = ({
  filter,
  sortType
}) => {
  const [filteredData, setFilteredData] = useState<Applicant[]>([]);
  const [filteredData2, setFilteredData2] = useState<Applicant[]>([]);

  //FIX:
  const recruitId = 1;
  const { data: applicantsData } = useQuery(
    ["applicantsIng", recruitId, filter, sortType],
    () =>
      getInterviewEvaluationData({
        recruitId,
        groupName: filter === "전체" ? undefined : filter,
        sortOrder: sortType === "지원순" ? "oldest" : "newest"
      }),
    {
      onSuccess: (data) => {
        console.log(data);
        const transformedData = transformApiResponse(data);
        setFilteredData(
          transformedData.filter((item) => item.evaluationStage === "EDITABLE")
        );
        setFilteredData2(
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

  //FIX: 팀원 평가중 데이터 수정 필요
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

  useEffect(() => {
    if (filteredData.length > 0) {
      const newFilteredData = filterAndSortData(filteredData);
      if (JSON.stringify(newFilteredData) !== JSON.stringify(filteredData)) {
        setFilteredData(newFilteredData);
      }
    }
    if (filteredData2.length > 0) {
      const newFilteredData2 = filterAndSortData(filteredData2);
      if (JSON.stringify(newFilteredData2) !== JSON.stringify(filteredData2)) {
        setFilteredData2(newFilteredData2);
      }
    }
  }, [filter, sortType, filterAndSortData]);

  return (
    <div className="w-[1016px] flex items-start gap-[22px] p-[20px] self-stretch rounded-[21px] border border-[#D0D4E7] bg-white-100">
      <div className="flex flex-col gap-4 w-[476px]">
        <h2 className="text-left text-gray-1100 text-title3">
          이어서 평가를 완료해 주세요.
        </h2>
        <FitMemberList items={filteredData} state="평가 중" />
      </div>

      <div className="flex flex-col gap-4 w-[476px]">
        <h2 className="text-left text-gray-1100 text-title3">
          팀원들이 아직 평가 중이에요.
        </h2>
        <FitMemberList items={filteredData2} state="평가 완료" />
      </div>
    </div>
  );
};

export default DuringEvaluation;
