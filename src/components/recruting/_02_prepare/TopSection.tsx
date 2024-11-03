import { useState } from "react";
import { STEP2_ITEMS } from "../../../constants/recruting";
import { useTopSectionStore } from "../../../store/useStore";

export default function TopSection() {
  const { currentStep, setCurrentStep } = useTopSectionStore();
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
    <div className="w-full h-[110px] flex-center bg-white-100 ml-8 my-4 px-8 rounded-[12px]">
      {STEP2_ITEMS.map((item, index) => (
        <div key={index} className="flex items-center">
          <div
            className={`w-[180px] h-[64px] flex-center mx-[6px] px-[30px] rounded-[8px] text-subheadline ${
              currentStep === index
                ? "bg-gray-900 text-white-100"
                : "bg-gray-300"
            }`}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleItemClick(index)} // 클릭 시 단계 변경
          >
            {item}
          </div>
          <img
            src={
              hoveredIndex === index
                ? "/assets/ic-nextHover.svg"
                : "/assets/ic-next.svg"
            }
            alt="다음 클릭"
            className="w-[6.5px] h-[13px] mx-2"
          />
        </div>
      ))}
    </div>
  );
}
