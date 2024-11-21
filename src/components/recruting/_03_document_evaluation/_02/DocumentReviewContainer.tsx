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
  const mockData = [
    { id: 1, type: "기획", name: "기획 아이템 1" },
    { id: 2, type: "디자인", name: "디자인 아이템 1" },
    { id: 3, type: "개발", name: "개발 아이템 1" },
    { id: 4, type: "기획", name: "기획 아이템 2" }
  ];

  const [filteredData, setFilteredData] = useState(mockData);

  // 필터링 핸들링
  const handleFilter = (filterType: string) => {
    if (filterType === "전체") {
      setFilteredData(mockData);
    } else {
      setFilteredData(mockData.filter((item) => item.type === filterType));
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
      {renderStepComponent()}
    </div>
  );
};

export default DocumentReviewContainer;
