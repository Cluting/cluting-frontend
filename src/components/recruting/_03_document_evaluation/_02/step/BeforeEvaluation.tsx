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
  const { applicants } = useApplicantEvaluationStore();
  const [filteredData, setFilteredData] = useState<Applicant[]>([]);

  //TODO: 응답받은 데이터 리스트로 렌더링해야함
  const [applicationData, setApplicationData] = useState<ApplicationResponse[]>(
    []
  );

  //FIX:
  const recruitId = 1;
  const mutation = useMutation(
    (data: DocBeforeRequest) => postDocBefore(recruitId, data),
    {
      onSuccess: (response) => {
        console.log(
          "서류 평가하기 <평가 전> 지원서 리스트 불러오기가 성공적으로 실행되었습니다."
        );
        setApplicationData(response.data); // 응답 데이터 저장
        console.log("API 데이터", applicationData);
      },
      onError: (error) => {
        console.error(
          "서류 평가하기 <평가 전> 지원서 리스트 불러오기 중 오류 발생:",
          error
        );
      }
    }
  );

  // 컴포넌트 마운트 시 POST 요청
  useEffect(() => {
    const initialData: DocBeforeRequest = {
      // POST 요청에 필요한 초기 데이터 구성
      groupName: null,
      sortOrder: "oldest"
    };
    console.group(initialData);
    mutation.mutate(initialData);
  }, []); // 빈 의존성 배열로 컴포넌트 마운트 시에만 실행

  const { data: user } = useQuery(["me"], getMe, {
    onError: (error) => {
      console.error("유저 본인 정보 조회 실패:", error);
    }
  });

  useEffect(() => {
    let data = [...applicants];
    if (user) {
      // 평가 전 상태를 가진 항목 필터링
      data = data.filter(
        (item) =>
          item.evaluators &&
          item.evaluators.some(
            (evaluator) =>
              evaluator.state === "평가 전" && evaluator.name === user.name
          )
      );
    }

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
