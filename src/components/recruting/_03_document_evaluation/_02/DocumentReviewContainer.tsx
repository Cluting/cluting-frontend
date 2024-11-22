import React, { useState } from "react";
import EvalProcessBar from "./common/EvalProcessBar";
import BeforeEvaluation from "./step/BeforeEvaluation";
import DuringEvaluation from "./step/DuringEvaluation";
import AfterEvaluation from "./step/AfterEvaluation";
import CompletedEvaluation from "./step/CompletedEvaluation";
import Dropdown from "./common/DropDown";

const DocumentReviewContainer: React.FC = () => {
  const steps = ["평가 전", "평가 중", "평가 후", "평가 완료"];
  const [currentStep, setCurrentStep] = useState(0);

  // 필터와 정렬 상태 관리
  const [filter, setFilter] = useState("전체");
  const [sortType, setSortType] = useState("가나다순");

  // 현재 단계에 따라 컴포넌트 렌더링
  const renderStepComponent = (): React.ReactNode => {
    switch (currentStep) {
      case 0:
        return <BeforeEvaluation filter={filter} sortType={sortType} />;
      case 1:
        return (
          <DuringEvaluation
          // filter={filter} sortType={sortType}
          />
        );
      case 2:
        return <AfterEvaluation filter={filter} sortType={sortType} />;
      case 3:
        return (
          <CompletedEvaluation
          // filter={filter} sortType={sortType}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="ml-[32.38px]">
      {/* 필터와 정렬 Dropdown */}
      <div className="flex items-center gap-3 mb-[10px]">
        <Dropdown
          label="필터 : "
          defaultValue="전체"
          options={["전체", "기획", "디자인", "개발"]}
          onSelect={(value) => setFilter(value)}
        />
        <Dropdown
          label="정렬 : "
          defaultValue="가나다순"
          options={["가나다순"]}
          onSelect={(value) => setSortType(value)}
        />
      </div>

      {/* 평가 단계 Progress Bar */}
      <EvalProcessBar
        steps={steps}
        currentStep={currentStep}
        onStepClick={setCurrentStep}
      />

      {/* 단계별 컴포넌트 */}
      <div className="mb-8">{renderStepComponent()}</div>
    </div>
  );
};

export default DocumentReviewContainer;
