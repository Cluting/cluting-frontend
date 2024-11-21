import React from "react";

interface ProcessBarProps {
  steps: string[];
  currentStep: number;
  onStepClick: (stepIndex: number) => void;
}

const EvalProcessBar: React.FC<ProcessBarProps> = ({
  steps,
  currentStep,
  onStepClick
}) => {
  return (
    <div className="flex w-[1016px] p-[10px_18.5px] bg-gray-50 rounded-[7px] mb-[16px]">
      {steps.map((step, index) => (
        <div key={index} className="flex items-center">
          <div
            className={`flex w-[223px] h-[45px] px-[18.353px] py-[10.626px] justify-center items-center gap-[7.728px] rounded-[10.626px] cursor-pointer text-[13.524px] font-Pretendard font-semibold ${
              currentStep === index
                ? "bg-main-400 text-[#5E2BE8]"
                : "bg-main-300 text-[#565965]"
            }`}
            onClick={() => {
              onStepClick(index);
            }}
          >
            {step}
          </div>
          {index !== steps.length - 1 && (
            <img
              src="/assets/ic-next.svg"
              alt="Next"
              className="mx-[12px] w-[5px] h-[10px]"
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default EvalProcessBar;
