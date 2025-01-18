import React, { useCallback, useEffect, useState } from "react";
import FitMemberList from "../list/FitMemberList";
import { useQuery } from "@tanstack/react-query";
import { getAppListIng } from "../../service/Step3";

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
    ["applicantsIng", recruitId],
    () => getAppListIng(recruitId),
    {
      onSuccess: (data) => {
        console.log(data);
        const transformedData = transformApiResponse(data);
        setFilteredData(
          transformedData.filter(
            (item) =>
              item.evaluationStage === "BEFORE" ||
              item.evaluationStage === "ING"
          )
        );
        setFilteredData2(
          transformedData.filter((item) => item.evaluationStage === "BEFORE")
        );
      }
    }
  );

  const transformApiResponse = (apiData: any[]): Applicant[] => {
    return apiData.map((item) => ({
      id: item.applicationId.toString(),
      name: item.applicantName,
      phone: item.applicantPhone,
      group: item.groupName,
      incomplete: parseInt(item.applicationNumClubUser.split("/")[0], 10),
      all: parseInt(item.applicationNumClubUser.split("/")[1], 10),
      isPass: undefined,
      evaluators: [item.currentEvaluator, ...item.otherEvaluators],
      isDecisionMode: false,
      isDisputed: false,
      evaluationStage: item.evaluationStage
    }));
  };

  const filterAndSortData = useCallback(
    (data: Applicant[], evaluationState: string) => {
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
      const newFilteredData = filterAndSortData(filteredData, "평가 중");
      if (JSON.stringify(newFilteredData) !== JSON.stringify(filteredData)) {
        setFilteredData(newFilteredData);
      }
    }
  }, [filter, sortType]);

  //FIX: 팀원 평가에 수정 가능, 열람 가능 권한 설정 필요 -> 백 데이터 따라

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
