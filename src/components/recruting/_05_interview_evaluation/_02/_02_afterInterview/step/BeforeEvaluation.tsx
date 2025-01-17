import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAppListBefore } from "../../../../_03_document_evaluation/service/Step3";
import { getMe } from "../../../../../signup/services/User";
import WideMemberList from "../../../../_03_document_evaluation/_02/list/WideMemberList";
import {
  getInterviewEvaluationData,
  getInterviewListBefore
} from "../../../service/Step5";

interface BeforeEvaluationProps {
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
  isDecisionMode: undefined;
  isDisputed: undefined;
  evaluationStage: string;
}

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
  const { data: applicantsData, isLoading } = useQuery(
    ["applicantsBefore", recruitId],
    () => getInterviewListBefore(recruitId),
    {
      onSuccess: (data) => {
        console.log(data);
        const transformedData = transformApiResponse(data);
        setFilteredData(transformedData);
      }
    }
  );

  const transformApiResponse = (apiData: any[]): Applicant[] => {
    return apiData.map((item) => ({
      id: item.applicationId,
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

  const { data: user } = useQuery(["me"], getMe);

  const filterAndSortData = (data: Applicant[]) => {
    let filteredData = [...data];

    // FIX: evaluator 정보 들어오면 검토 해야 함
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

    return filteredData;
  };

  useEffect(() => {
    if (applicantsData) {
      const newFilteredData = filterAndSortData(filteredData);
      console.log("필터링 후", newFilteredData);
      setFilteredData(newFilteredData);
    }
  }, [applicantsData]);

  return (
    <div className="w-[1016px] flex items-start gap-2.5 p-[20px] self-stretch rounded-[21px] border border-[#D0D4E7] bg-white-100 ">
      {isLoading ? (
        <p>데이터를 불러오는 중입니다...</p>
      ) : (
        <WideMemberList items={filteredData} />
      )}
    </div>
  );
};

export default BeforeEvaluation;
