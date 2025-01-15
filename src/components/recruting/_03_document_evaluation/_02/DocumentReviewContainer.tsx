import React, { useEffect, useState } from "react";
import EvalProcessBar from "./common/EvalProcessBar";
import BeforeEvaluation from "./step/BeforeEvaluation";
import DuringEvaluation from "./step/DuringEvaluation";
import AfterEvaluation from "./step/AfterEvaluation";
import CompletedEvaluation from "./step/CompletedEvaluation";
import Dropdown from "./common/DropDown";
import { useNavigate, useParams } from "react-router-dom";

const steps = ["평가 전", "평가 중", "평가 후", "평가 완료"];
const stepsPath = ["before", "ing", "after", "complete"];

const DocumentReviewContainer: React.FC = () => {
  const navigate = useNavigate();
  const { stage } = useParams<{ stage: string }>();

  const [currentStep, setCurrentStep] = useState(0);

  // 필터와 정렬 상태 관리
  const [filter, setFilter] = useState("전체");
  const [sortType, setSortType] = useState("지원순");

  // URL과 현재 단계 동기화
  useEffect(() => {
    const index = stepsPath.indexOf(stage || "before");
    if (index !== -1) {
      setCurrentStep(index);
    }
  }, [stage, location.pathname]);

  // 단계 변경 핸들러
  const handleStepClick = (index: number) => {
    const newStage = stepsPath[index];
    const newPath = `/recruting/03_document_evaluation/doc/${newStage}`;

    if (location.pathname !== newPath) {
      navigate(newPath, { replace: false });
      setCurrentStep(index);
    }
  };

  // 현재 단계에 따라 컴포넌트 렌더링
  const renderStepComponent = (): React.ReactNode => {
    switch (stage) {
      case "before":
        return <BeforeEvaluation filter={filter} sortType={sortType} />;
      case "ing":
        return <DuringEvaluation filter={filter} sortType={sortType} />;
      case "after":
        return <AfterEvaluation filter={filter} sortType={sortType} />;
      case "complete":
        return <CompletedEvaluation filter={filter} sortType={sortType} />;
      default:
        return <BeforeEvaluation filter={filter} sortType={sortType} />;
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
          defaultValue="지원순"
          options={["지원순", "최신순"]}
          onSelect={(value) => setSortType(value)}
        />
      </div>

      {/* 평가 단계 Progress Bar */}
      <EvalProcessBar
        steps={steps}
        currentStep={currentStep}
        onStepClick={handleStepClick}
      />

      {/* 단계별 컴포넌트 */}
      <div className="mb-8">{renderStepComponent()}</div>
    </div>
  );
};

export default DocumentReviewContainer;
