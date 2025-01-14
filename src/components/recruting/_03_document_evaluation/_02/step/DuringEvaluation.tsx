import React, { useCallback, useEffect, useState } from "react";
import FitMemberList from "../list/FitMemberList";
import { useMutation } from "@tanstack/react-query";
import { postDocIng } from "../../service/Step3";
// 임시 데이터 생성 함수
const createTempData = (): Applicant[] => {
  return [
    {
      id: "temp1",
      name: "김수정",
      phone: "010-1234-5678",
      group: "개발",
      incomplete: 3,
      all: 5,
      isPass: undefined,
      evaluators: [
        {
          name: "평가자1",
          state: "COMPLETE",
          totalScore: 85,
          criteriaScores: [
            { id: 1, name: "기술 이해도", score: 18 },
            { id: 2, name: "문제 해결 능력", score: 17 },
            { id: 3, name: "의사소통 능력", score: 16 },
            { id: 4, name: "팀워크", score: 17 },
            { id: 5, name: "열정", score: 17 }
          ],
          comment: "개발 능력이 뛰어나며 의사소통 능력도 우수합니다.",
          groupAccess: "개발"
        }
      ],
      isDecisionMode: false,
      isDisputed: false
    },
    {
      id: "temp2",
      name: "이열람",
      phone: "010-2345-6789",
      group: "디자인",
      incomplete: 4,
      all: 5,
      isPass: undefined,
      evaluators: [
        {
          name: "평가자2",
          state: "COMPLETE",
          totalScore: 80,
          criteriaScores: [
            { id: 1, name: "디자인 감각", score: 17 },
            { id: 2, name: "창의성", score: 16 },
            { id: 3, name: "도구 활용 능력", score: 16 },
            { id: 4, name: "의사소통 능력", score: 15 },
            { id: 5, name: "포트폴리오 퀄리티", score: 16 }
          ],
          comment: "창의적인 디자인 능력이 돋보입니다.",
          groupAccess: "개발"
        }
      ],
      isDecisionMode: false,
      isDisputed: false
    },
    {
      id: "temp3",
      name: "박수정",
      phone: "010-3456-7890",
      group: "기획",
      incomplete: 2,
      all: 5,
      isPass: undefined,
      evaluators: [
        {
          name: "평가자3",
          state: "COMPLETE",
          totalScore: 88,
          criteriaScores: [
            { id: 1, name: "기획력", score: 18 },
            { id: 2, name: "분석 능력", score: 18 },
            { id: 3, name: "의사소통 능력", score: 17 },
            { id: 4, name: "창의성", score: 17 },
            { id: 5, name: "프레젠테이션 스킬", score: 18 }
          ],
          comment: "뛰어난 기획 능력과 분석력을 보여주었습니다.",
          groupAccess: "기획"
        }
      ],
      isDecisionMode: false,
      isDisputed: false
    },
    {
      id: "temp4",
      name: "최열람",
      phone: "010-4567-8901",
      group: "마케팅",
      incomplete: 5,
      all: 5,
      isPass: undefined,
      evaluators: [
        {
          name: "평가자4",
          state: "COMPLETE",
          totalScore: 82,
          criteriaScores: [
            { id: 1, name: "마케팅 전략 수립 능력", score: 17 },
            { id: 2, name: "데이터 분석 능력", score: 16 },
            { id: 3, name: "창의성", score: 17 },
            { id: 4, name: "의사소통 능력", score: 16 },
            { id: 5, name: "트렌드 이해도", score: 16 }
          ],
          comment: "창의적인 마케팅 전략 수립 능력이 인상적입니다.",
          groupAccess: "개발"
        }
      ],
      isDecisionMode: false,
      isDisputed: false
    }
  ];
};

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
  const mutation = useMutation(
    (data: DocBeforeRequest) => postDocIng(recruitId, data),
    {
      onSuccess: (response: DocIngResponse) => {
        console.log(response);
        const transformedData = transformApiResponse(response.ING);
        setFilteredData(transformedData);
        //FIX: 평가중 - 팀원 평가중 데이터 백 수정 필요
        //  setFilteredData2(transformedData);
        setFilteredData2(createTempData());
      }
    }
  );
  const transformApiResponse = (apiData: DocIngApplicant[]): Applicant[] => {
    return apiData.map((item) => {
      const [incomplete, all] = item.applicationNumClubUser
        .split("/")
        .map(Number);
      return {
        id: item.createdAt,
        name: item.applicantName,
        phone: item.applicantPhone,
        group: item.groupName,
        incomplete,
        all,
        isPass: undefined,
        evaluators: undefined,
        isDecisionMode: false,
        isDisputed: false
      };
    });
  };

  // 컴포넌트 마운트 시 POST 요청
  const initialData: DocBeforeRequest = {
    // POST 요청에 필요한 초기 데이터 구성
    groupName: null,
    sortOrder: "newest"
  };
  useEffect(() => {
    console.group(initialData);
    mutation.mutate(initialData);
  }, []); // 빈 의존성 배열로 컴포넌트 마운트 시에만 실행

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
