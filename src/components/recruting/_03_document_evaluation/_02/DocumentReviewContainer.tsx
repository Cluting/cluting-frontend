import EvalProcessBar from "./EvalProcessBar";
import React, { useState } from "react";
import BeforeEvaluation from "./step/BeforeEvaluation";
import DuringEvaluation from "./step/DuringEvaluation";
import AfterEvaluation from "./step/AfterEvaluation";
import CompletedEvaluation from "./step/CompletedEvaluation";

const DocumentReviewContainer: React.FC = () => {
  const steps = ["평가 전", "평가 중", "평가 후", "평가 완료"];
  const [currentStep, setCurrentStep] = useState(0);

  const renderStepComponent = (): React.ReactNode => {
    switch (currentStep) {
      case 0:
        return <BeforeEvaluation />;
      case 1:
        return <DuringEvaluation />;
      case 2:
        return <AfterEvaluation />;
      case 3:
        return <CompletedEvaluation />;
      default:
        return null;
    }
  };

  return (
    <div className="ml-[32.38px]">
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
