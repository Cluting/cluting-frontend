import React, { useEffect, useState } from "react";
import WideMemberList from "../list/WideMemberList";
import { useQuery } from "@tanstack/react-query";
import { getAppListBefore } from "../../service/Step3";
import { getMe } from "../../../../signup/services/User";

interface BeforeEvaluationProps {
  filter: string;
  sortType: string;
}

const BeforeEvaluation: React.FC<BeforeEvaluationProps> = ({
  filter,
  sortType
}) => {
  const [filteredData, setFilteredData] = useState<Applicant[]>([]);

  //FIX:
  const recruitId = 1;
  const { data: applicantsData } = useQuery(
    ["applicantsBefore", recruitId],
    () => getAppListBefore(recruitId),
    {
      onSuccess: (data) => {
        console.log(data);
        const transformedData = transformApiResponse(data);
        console.log("transformedData", transformedData);
        setFilteredData(transformedData);
      }
    }
  );

  const transformApiResponse = (apiData: any[]): Applicant[] => {
    return apiData.map((item) => ({
      id: item.createdAt, //FIX: id 추가
      name: item.applicantName,
      phone: item.applicantPhone || "",
      group: item.groupName,
      incomplete: parseInt(item.applicationNumClubUser.split("/")[0], 10),
      all: parseInt(item.applicationNumClubUser.split("/")[1], 10),
      isPass: undefined,
      evaluators: [item.currentEvaluator, ...item.otherEvaluators],
      isDecisionMode: undefined,
      isDisputed: undefined,
      evaluationStage: item.evaluationStage
    }));
  };

  const { data: user } = useQuery(["me"], getMe, {
    onError: (error) => {
      console.error("유저 본인 정보 조회 실패:", error);
    }
  });

  const filterAndSortData = (data: Applicant[]) => {
    let filteredData = [...data];
    if (user) {
      filteredData = filteredData.filter(
        (item) =>
          item.evaluators &&
          item.evaluators.some(
            (evaluator) =>
              evaluator.state === "BEFORE" && evaluator.name === user.name
          )
      );
    }

    if (filter !== "전체") {
      filteredData = filteredData.filter((item) => item.group === filter);
    }

    if (sortType === "가나다순") {
      filteredData.sort((a, b) => a.name.localeCompare(b.name));
    }

    return filteredData;
  };

  useEffect(() => {
    if (applicantsData) {
      const newFilteredData = filterAndSortData(filteredData);
      setFilteredData(newFilteredData);
    }
  }, [filter, sortType, user, applicantsData]);

  return (
    <div className="w-[1016px] flex items-start gap-2.5 p-[20px] self-stretch rounded-[21px] border border-[#D0D4E7] bg-white-100">
      {filteredData ? (
        <WideMemberList items={filteredData} />
      ) : (
        <p>데이터를 불러오는 중입니다...</p>
      )}
    </div>
  );
};

export default BeforeEvaluation;
