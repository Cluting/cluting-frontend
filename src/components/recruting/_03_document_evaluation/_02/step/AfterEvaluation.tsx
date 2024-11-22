import React, { useEffect, useState } from "react";
import WideMemberList from "../list/WideMemberList";

interface AfterEvaluationProps {
  filter: string;
  sortType: string;
}

const AfterEvaluation: React.FC<AfterEvaluationProps> = ({
  filter,
  sortType
}) => {
  // 목업 데이터 -> API 연결 시 삭제
  const mockData = [
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
      state: "수정 가능",
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
      state: "수정 가능",
      name: "최예은",
      phone: "010-1234-1234",
      group: "디자인",
      incomplete: 3,
      all: 5
    },
    {
      id: "5",
      state: "열람 가능",
      name: "최예은",
      phone: "010-1234-1234",
      group: "디자인",
      incomplete: 3,
      all: 5
    },
    {
      id: "6",
      state: "열람 가능",
      name: "최예은",
      phone: "010-1234-1234",
      group: "디자인",
      incomplete: 3,
      all: 5
    },
    {
      id: "7",
      state: "열람 가능",
      name: "최예은",
      phone: "010-1234-1234",
      group: "디자인",
      incomplete: 3,
      all: 5
    },
    {
      id: "8",
      state: "열람 가능",
      name: "최예은",
      phone: "010-1234-1234",
      group: "디자인",
      incomplete: 3,
      all: 5
    },
    {
      id: "9",
      state: "수정 가능",
      name: "최예은",
      phone: "010-1234-1234",
      group: "디자인",
      incomplete: 3,
      all: 5
    },
    {
      id: "10",
      state: "수정 가능",
      name: "최예은",
      phone: "010-1234-1234",
      group: "디자인",
      incomplete: 3,
      all: 5
    },
    {
      id: "11",
      state: "수정 가능",
      name: "최예은",
      phone: "010-1234-1234",
      group: "디자인",
      incomplete: 3,
      all: 5
    },
    {
      id: "12",
      state: "수정 가능",
      name: "최예은",
      phone: "010-1234-1234",
      group: "디자인",
      incomplete: 3,
      all: 5
    },
    {
      id: "13",
      state: "수정 가능",
      name: "최예은",
      phone: "010-1234-1234",
      group: "디자인",
      incomplete: 3,
      all: 5
    }
  ];

  const [filteredData, setFilteredData] = useState(mockData);

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

    setFilteredData(data);
  }, [filter, sortType]);

  return (
    <div className="w-[1016px] flex flex-col items-start gap-2.5 p-[20px] self-stretch rounded-[21px] border border-[#D0D4E7] bg-white-100">
      <WideMemberList items={filteredData} />
    </div>
  );
};

export default AfterEvaluation;
