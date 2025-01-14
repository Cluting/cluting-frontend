import React, { useCallback, useEffect, useState } from "react";
import WideMemberList from "../list/WideMemberList";
import { useQuery } from "@tanstack/react-query";
import { getAppListAfter } from "../../service/Step3";

interface AfterEvaluationProps {
  filter: string;
  sortType: string;
}

const AfterEvaluation: React.FC<AfterEvaluationProps> = ({
  filter,
  sortType
}) => {
  const [filteredData, setFilteredData] = useState<Applicant[]>([]);

  //평가 끝내기
  const [evaluationProcess, setEvaluationProcess] = useState(false);

  //FIX:
  const recruitId = 1;
  const { data: applicantsData } = useQuery(
    ["applicantsAfter", recruitId],
    () => getAppListAfter(recruitId),
    {
      onSuccess: (data) => {
        console.log(
          "서류 평가하기 <평가 후> 지원서 리스트 불러오기 성공",
          data
        );
        const transformedData = transformApiResponse(data);
        setFilteredData(
          transformedData.filter((item) => item.evaluationStage === "EDITABLE")
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
  }, [filter, sortType, filterAndSortData, filteredData]);

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
