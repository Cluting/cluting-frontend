import React, { useState } from "react";
import Dropdown from "../../../_03_document_evaluation/_02/common/DropDown";
import EvalProcessBar from "../../../_03_document_evaluation/_02/common/EvalProcessBar";
import BeforeEvaluation from "../../../_03_document_evaluation/_02/step/BeforeEvaluation";
import DuringEvaluation from "../../../_03_document_evaluation/_02/step/DuringEvaluation";
import AfterEvaluation from "../../../_03_document_evaluation/_02/step/AfterEvaluation";
import CompletedEvaluation from "../../../_03_document_evaluation/_02/step/CompletedEvaluation";

export default function AfterInterviewContainer() {
  const steps = ["평가 전", "평가 중", "평가 후", "평가 완료"];
  const [currentStep, setCurrentStep] = useState(0);

  const renderStepComponent = (): React.ReactNode => {
    switch (currentStep) {
      case 0:
        return <BeforeEvaluation filter={filter} sortType={sortType} />;
      case 1:
        return <DuringEvaluation filter={filter} sortType={sortType} />;
      case 2:
        return <AfterEvaluation filter={filter} sortType={sortType} />;
      case 3:
        return <CompletedEvaluation filter={filter} sortType={sortType} />;
    }
  };

  const [filter, setFilter] = useState("전체");
  const [sortType, setSortType] = useState("가나다순");
  return (
    <div className="flex flex-col gap-5 mt-6">
      <div className="flex flex-col gap-3">
        <div className="flex gap-3">
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
        <EvalProcessBar
          steps={steps}
          currentStep={currentStep}
          onStepClick={setCurrentStep}
        />
      </div>
      <div className="mb-8">{renderStepComponent()}</div>
    </div>
  );
}
