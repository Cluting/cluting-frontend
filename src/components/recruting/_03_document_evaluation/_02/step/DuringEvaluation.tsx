import React, { useEffect, useState } from "react";
import FitMemberList from "../list/FitMemberList";
import { ButtonState } from "../list/types/buttonTypes";

interface DuringEvaluationProps {
  filter: string; // 필터링 기준
  sortType: string; // 정렬 기준
}

interface Member {
  id: string;
  state: ButtonState;
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
  // 목업 데이터 -> API 연결 시 삭제
  const mockData: Member[] = [
    {
      id: "1",
      state: "평가 중",
      name: "김은혜",
      phone: "010-1234-1234",
      group: "개발",
      incomplete: 3,
      all: 5,
      result: "합격"
    },
    {
      id: "2",
      state: "이의 제기",
      name: "윤다인",
      phone: "010-1234-1234",
      group: "개발",
      incomplete: 3,
      all: 5
    },
    {
      id: "3",
      state: "평가 중",
      name: "최예은",
      phone: "010-1234-1234",
      group: "디자인",
      incomplete: 3,
      all: 5
    },
    {
      id: "4",
      state: "평가 중",
      name: "김무무",
      phone: "010-1234-1234",
      group: "기획",
      incomplete: 3,
      all: 5,
      result: "불합격"
    }
  ];

  const mockData2: Member[] = [
    {
      id: "1",
      state: "수정 가능",
      name: "김은혜",
      phone: "010-1234-1234",
      group: "개발",
      incomplete: 3,
      all: 5
    },
    {
      id: "2",
      state: "이의 제기",
      name: "윤다인",
      phone: "010-1234-1234",
      group: "개발",
      incomplete: 3,
      all: 5
    },
    {
      id: "3",
      state: "수정 가능",
      name: "최예은",
      phone: "010-1234-1234",
      group: "디자인",
      incomplete: 3,
      all: 5
    },
    {
      id: "4",
      state: "열람 가능",
      name: "최예은",
      phone: "010-1234-1234",
      group: "디자인",
      incomplete: 3,
      all: 5
    },
    {
      id: "5",
      state: "열람 가능",
      name: "김예은",
      phone: "010-1234-1234",
      group: "기획",
      incomplete: 3,
      all: 5
    }
  ];

  const [filteredData1, setFilteredData1] = useState<Member[]>(mockData);
  const [filteredData2, setFilteredData2] = useState<Member[]>(mockData2);

  // 첫 번째 데이터
  useEffect(() => {
    let data = [...mockData];

    // 필터 처리
    if (filter !== "전체") {
      data = data.filter((item) => item.group === filter);
    }

    // 정렬 처리
    if (sortType === "가나다순") {
      data.sort((a, b) => a.name.localeCompare(b.name));
    }

    setFilteredData1(data);
  }, [filter, sortType]);

  // 두 번째 데이터
  useEffect(() => {
    let data = [...mockData2];

    // 필터 처리
    if (filter !== "전체") {
      data = data.filter((item) => item.group === filter);
    }

    // 정렬 처리
    if (sortType === "가나다순") {
      data.sort((a, b) => a.name.localeCompare(b.name));
    }

    setFilteredData2(data);
  }, [filter, sortType]);

  return (
    <div className="w-[1016px] flex items-start gap-[22px] p-[20px] self-stretch rounded-[21px] border border-[#D0D4E7] bg-white-100">
      <div className="flex flex-col gap-4 w-[476px]">
        <h2 className="text-left text-gray-1100 text-title3">
          이어서 평가를 완료해 주세요.
        </h2>
        {/* FitMemberList에 필터링된 데이터 전달 */}
        <FitMemberList items={filteredData1} />
      </div>

      <div className="flex flex-col gap-4 w-[476px]">
        <h2 className="text-left text-gray-1100 text-title3">
          팀원들이 아직 평가 중이에요.
        </h2>
        {/* FitMemberList에 필터링된 데이터 전달 */}
        <FitMemberList items={filteredData2} />
      </div>
    </div>
  );
};

export default DuringEvaluation;
