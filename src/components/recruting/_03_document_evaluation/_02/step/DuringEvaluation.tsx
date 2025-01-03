import React, { useEffect, useState } from "react";
import FitMemberList from "../list/FitMemberList";
import { useApplicantEvaluationStore } from "../../../../../store/useEvaluationStore";
import { useMutation, useQuery } from "@tanstack/react-query";
import { postDocIng } from "../../service/Step3";
import { getMe } from "../../../../signup/services/User";

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

  //TODO: 응답받은 데이터 리스트로 렌더링해야함
  const [applicationData, setApplicationData] = useState<ApplicationResponse[]>(
    []
  );

  //FIX:
  const recruitId = 1;
  const mutation = useMutation(
    (data: DocBeforeRequest) => postDocIng(recruitId, data),
    {
      onSuccess: (response) => {
        console.log(
          "서류 평가하기 <평가 중> 지원서 리스트 불러오기가 성공적으로 실행되었습니다."
        );
        setApplicationData(response.data); // 응답 데이터 저장
        console.log("API 데이터", applicationData);
      },
      onError: (error) => {
        console.error(
          "서류 평가하기 <평가 중> 지원서 리스트 불러오기 중 오류 발생:",
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
    if (user) {
      let data = [...applicants];

      // 평가 중 상태를 가진 항목 필터링
      data = data.filter(
        (item) =>
          item.evaluators &&
          item.evaluators.some(
            (evaluator) =>
              evaluator.name === user.name &&
              evaluator.state === "평가 완료" &&
              item.isPass === false
          )
      );

      // 필터 처리
      if (filter !== "전체") {
        data = data.filter((item) => item.group === filter);
      }

      // 정렬 처리
      if (sortType === "가나다순") {
        data.sort((a, b) => a.name.localeCompare(b.name));
      }

      setFilteredData2(data);
    }
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
