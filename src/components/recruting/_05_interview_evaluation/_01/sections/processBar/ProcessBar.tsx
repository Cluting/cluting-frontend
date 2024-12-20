import React from "react";
interface ProgressBarProps {
  steps: string[];
  currentStep: number;
  onStepClick: (stepIndex: number) => void;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  steps,
  currentStep,
  onStepClick
}) => {
  return (
    <div className="flex gap-3 flex-center">
      {steps.map((step, index) => (
        <div key={index} className="flex gap-3 flex-center">
          {/* 현재 최상위 부모 컨테이너 값이 잘못되어있어 추후 width, height 수정 필요 */}
          <div
            className={`flex rounded-lg flex-center w-72 h-11 cursor-pointer ${currentStep === index ? "bg-main-400" : "bg-main-300"} `}
            onClick={() => onStepClick(index)}
          >
            <span
              className={`${currentStep === index ? "text-[#5E2BE8]" : "text-[#565965]"}  font-Pretendard font-semibold text-sm`}
            >
              {step}
            </span>
          </div>
          {index !== steps.length - 1 && (
            <img src="/assets/ic-next.svg" alt="Next" className="w-2 h-4" />
          )}
        </div>
      ))}
    </div>
  );
};

export default ProgressBar;
