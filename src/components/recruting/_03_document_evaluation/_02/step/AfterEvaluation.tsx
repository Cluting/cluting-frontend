import React, { useEffect, useState } from "react";
import WideMemberList from "../list/WideMemberList";
import { useApplicantEvaluationStore } from "../../../../../store/useEvaluationStore";
import { useMutation, useQuery } from "@tanstack/react-query";
import { postDocAfter } from "../../service/Step3";
import { getMe } from "../../../../signup/services/User";

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

  //TODO: 응답받은 데이터 리스트로 렌더링해야함
  const [applicationData, setApplicationData] = useState<ApplicationResponse[]>(
    []
  );

  //FIX:
  const recruitId = 1;
  const mutation = useMutation(
    (data: DocBeforeRequest) => postDocAfter(recruitId, data),
    {
      onSuccess: (response) => {
        console.log(
          "서류 평가하기 <평가 후> 지원서 리스트 불러오기가 성공적으로 실행되었습니다."
        );
        setApplicationData(response.data); // 응답 데이터 저장
        console.log("API 데이터", applicationData);
      },
      onError: (error) => {
        console.error(
          "서류 평가하기 <평가 후> 지원서 리스트 불러오기 중 오류 발생:",
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

    // 평가 완료 상태를 가진 항목 필터링
    data = data.filter(
      (item) =>
        item.evaluators &&
        item.incomplete === item.all &&
        item.evaluators.some(
          (evaluator) =>
            evaluator.state === "평가 완료" && evaluator.name === user.name
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
