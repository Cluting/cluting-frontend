import { useState } from "react";
import { useStepSixStore } from "../../../../store/useStore";
import { STEP6_ITEMS } from "../../../../constants/recruting";

export default function TopSection() {
  const { currentStep, setCurrentStep, steps } = useStepSixStore();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleMouseEnter = (index: number) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  const handleItemClick = (index: number) => {
    setCurrentStep(index); // 현재 단계를 업데이트
  };

  return (
    <div>
      <div className="relative flex justify-between items-center mb-[9px] text-left">
        <section className="flex items-center">
          <div className="flex-center mr-3 w-[33px] h-[30px] bg-white-100 border border-gray-500 rounded-[8px]">
            6
          </div>
          <h1 className="text-title1 mr-3">최종 합격자 및 동아리 안내하기</h1>
          <p className="text-headline">
            {`> (${currentStep + 1}) ${STEP6_ITEMS[currentStep]}`}
          </p>
        </section>
      </div>
      <section className="w-full h-[110px] flex-center bg-white-100 my-4 px-8 rounded-[12px]">
        {STEP6_ITEMS.map((item, index) => (
          <div key={index} className="flex items-center">
            <div
              className={`relative w-[469px] h-[64px] flex-center ${steps[index].completed ? "mr-[6px] pr-[20px]" : "px-[28px]"} rounded-[8px] text-subheadline ${
                currentStep === index
                  ? "bg-main-100 text-white-100"
                  : "bg-main-300 text-gray-900"
              }`}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
              onClick={() => handleItemClick(index)} // 클릭 시 단계 변경
            >
              {steps[index].completed && (
                <img
                  src="/assets/ic-step2-complete.svg"
                  alt="완료 아이콘"
                  className="w-[16px] h-[16px] ml-[11px] mr-[8px]"
                />
              )}
              {item}
            </div>
            {index < STEP6_ITEMS.length - 1 && (
              <img
                src={
                  hoveredIndex === index
                    ? "/assets/ic-nextHover.svg"
                    : "/assets/ic-next.svg"
                }
                alt="다음 클릭"
                className="w-[6.5px] h-[13px] mx-2"
              />
            )}
          </div>
        ))}
      </section>
    </div>
  );
}
