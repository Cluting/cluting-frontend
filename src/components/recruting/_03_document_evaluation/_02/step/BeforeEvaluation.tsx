import React, { useEffect, useState } from "react";
import WideMemberList from "../list/WideMemberList";
import { useApplicantEvaluationStore } from "../../../../../store/useEvaluationStore";
import { useMutation, useQuery } from "@tanstack/react-query";
import { postDocBefore } from "../../service/Step3";
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
  const mutation = useMutation(
    (data: DocBeforeRequest) => postDocBefore(recruitId, data),
    {
      onSuccess: (response) => {
        if (response && Array.isArray(response)) {
          const transformedData = transformApiResponse(response);
          setFilteredData(transformedData);
        } else {
          console.error("API 응답 데이터가 올바르지 않습니다.");
          setFilteredData([]);
        }
      }
    }
  );

  const transformApiResponse = (apiData: any[]): Applicant[] => {
    return apiData.map((item) => ({
      id: item.createdAt,
      name: item.applicantName,
      phone: item.applicantPhone || "", // 빈 문자열을 기본값으로 설정
      group: item.groupName,
      incomplete: parseInt(item.applicationNumClubUser.split("/")[0], 10),
      all: parseInt(item.applicationNumClubUser.split("/")[1], 10),
      isPass: undefined,
      evaluators: undefined,
      isDecisionMode: undefined,
      isDisputed: undefined
    }));
  };

  // 컴포넌트 마운트 시 POST 요청
  const initialData: DocBeforeRequest = {
    // POST 요청에 필요한 초기 데이터 구성
    groupName: null,
    sortOrder: "newest"
  };

  useEffect(() => {
    mutation.mutate(initialData);
  }, []); // 빈 의존성 배열로 컴포넌트 마운트 시에만 실행

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
              evaluator.state === "평가 전" && evaluator.name === user.name
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
    if (filteredData.length > 0) {
      const newFilteredData = filterAndSortData(filteredData);
      setFilteredData(newFilteredData);
    }
  }, [filter, sortType, user]);

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
