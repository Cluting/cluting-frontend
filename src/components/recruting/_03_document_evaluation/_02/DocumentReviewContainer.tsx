import EvalProcessBar from "./common/EvalProcessBar";
import React, { useState } from "react";
import BeforeEvaluation from "./step/BeforeEvaluation";
import DuringEvaluation from "./step/DuringEvaluation";
import AfterEvaluation from "./step/AfterEvaluation";
import CompletedEvaluation from "./step/CompletedEvaluation";
import Dropdown from "./common/DropDown";

const DocumentReviewContainer: React.FC = () => {
  const steps = ["평가 전", "평가 중", "평가 후", "평가 완료"];
  const [currentStep, setCurrentStep] = useState(0);
  // 목업데이터 : API 연결시 삭제
  const mockData = [
    {
      id: "1",
      state: "평가 전",
      name: "김은혜",
      phone: "010-1234-1234",
      group: "개발",
      incomplete: 3,
      all: 5
    },
    {
      id: "2",
      state: "평가 전",
      name: "윤다인",
      phone: "010-1234-1234",
      group: "개발",
      incomplete: 3,
      all: 5
    },
    {
      id: "3",
      state: "평가 전",
      name: "최예은",
      phone: "010-1234-1234",
      group: "디자인",
      incomplete: 3,
      all: 5
    },
    {
      id: "3",
      state: "평가 전",
      name: "최예은",
      phone: "010-1234-1234",
      group: "디자인",
      incomplete: 3,
      all: 5
    },
    {
      id: "4",
      state: "평가 전",
      name: "최예은",
      phone: "010-1234-1234",
      group: "디자인",
      incomplete: 3,
      all: 5
    },
    {
      id: "5",
      state: "평가 전",
      name: "최예은",
      phone: "010-1234-1234",
      group: "디자인",
      incomplete: 3,
      all: 5
    },
    {
      id: "6",
      state: "평가 전",
      name: "최예은",
      phone: "010-1234-1234",
      group: "디자인",
      incomplete: 3,
      all: 5
    },
    {
      id: "7",
      state: "평가 전",
      name: "최예은",
      phone: "010-1234-1234",
      group: "디자인",
      incomplete: 3,
      all: 5
    },
    {
      id: "8",
      state: "평가 전",
      name: "최예은",
      phone: "010-1234-1234",
      group: "디자인",
      incomplete: 3,
      all: 5
    },
    {
      id: "9",
      state: "평가 전",
      name: "최예은",
      phone: "010-1234-1234",
      group: "디자인",
      incomplete: 3,
      all: 5
    },
    {
      id: "10",
      state: "평가 전",
      name: "최예은",
      phone: "010-1234-1234",
      group: "디자인",
      incomplete: 3,
      all: 5
    },
    {
      id: "11",
      state: "평가 전",
      name: "최예은",
      phone: "010-1234-1234",
      group: "디자인",
      incomplete: 3,
      all: 5
    },
    {
      id: "12",
      state: "평가 전",
      name: "최예은",
      phone: "010-1234-1234",
      group: "디자인",
      incomplete: 3,
      all: 5
    },
    {
      id: "13",
      state: "평가 전",
      name: "최예은",
      phone: "010-1234-1234",
      group: "디자인",
      incomplete: 3,
      all: 5
    }
  ];

  const [filteredData, setFilteredData] = useState(mockData);

  // 필터링 핸들링
  const handleFilter = (filterType: string) => {
    if (filterType === "전체") {
      setFilteredData(mockData);
    } else {
      setFilteredData(mockData.filter((item) => item.group === filterType));
    }
  };

  // 정렬 핸들
  const handleSort = (sortType: string) => {
    if (sortType === "가나다순") {
      setFilteredData((prev) =>
        [...prev].sort((a, b) => a.name.localeCompare(b.name))
      );
    }
  };

  // 현재 단계에 따라 컴포넌트 렌더링
  const renderStepComponent = (): React.ReactNode => {
    switch (currentStep) {
      case 0:
        return (
          <BeforeEvaluation
            filteredData={filteredData}
            onFilter={handleFilter}
            onSort={handleSort}
          />
        );
      case 1:
        return (
          <DuringEvaluation
          // filteredData={filteredData}
          // onFilter={handleFilter}
          // onSort={handleSort}
          />
        );
      case 2:
        return (
          <AfterEvaluation
          // filteredData={filteredData}
          // onFilter={handleFilter}
          // onSort={handleSort}
          />
        );
      case 3:
        return (
          <CompletedEvaluation
          // filteredData={filteredData}
          // onFilter={handleFilter}
          // onSort={handleSort}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="ml-[32.38px]">
      <div className="flex items-center gap-3 mb-[10px]">
        <Dropdown
          label="필터 : "
          defaultValue="전체"
          options={["전체", "기획", "디자인", "개발"]}
          onSelect={handleFilter}
        />
        <Dropdown
          label="정렬 : "
          defaultValue="가나다순"
          options={["가나다순"]}
          onSelect={handleSort}
        />
      </div>

      <EvalProcessBar
        steps={steps}
        currentStep={currentStep}
        onStepClick={setCurrentStep}
      />
      <div className="mb-8">{renderStepComponent()}</div>
    </div>
  );
};

export default DocumentReviewContainer;
