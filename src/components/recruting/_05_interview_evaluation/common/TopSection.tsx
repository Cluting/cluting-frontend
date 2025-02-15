import { useEffect, useState } from "react";
import { useStepFiveStore } from "../../../../store/useStore";
import { STEP5_ITEMS } from "../../../../constants/recruting";
import { useNavigate } from "react-router-dom";

export default function TopSection() {
  const { currentStep, setCurrentStep, steps } = useStepFiveStore();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const paths = [
      "/recruting/05_interview_evaluation/interviewPrep",
      "/recruting/05_interview_evaluation/interview"
    ];
    const index = paths.findIndex((path) => location.pathname.includes(path));
    if (index !== -1) {
      setCurrentStep(index);
    }
  }, [location.pathname, setCurrentStep]);

  const navigate = useNavigate();

  const handleMouseEnter = (index: number) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  const handleItemClick = (index: number) => {
    setCurrentStep(index); // 현재 단계를 업데이트
    const paths = ["interviewPrep", "interview/day"];
    navigate(`/recruting/05_interview_evaluation/${paths[index]}`);
  };

  return (
    <div>
      <div className="relative flex justify-between items-center mb-[9px] text-left">
        <section className="flex items-center">
          <div className="flex-center mr-3 w-[33px] h-[30px] bg-white-100 border border-gray-500 rounded-[8px]">
            5
          </div>
          <h1 className="text-title1 mr-3">면접 평가하기</h1>
          <p className="text-headline">
            {`> (${currentStep + 1}) ${STEP5_ITEMS[currentStep]}`}
          </p>
        </section>
      </div>
      <section className="w-full h-[110px] flex-center bg-white-100 my-4 px-8 rounded-[12px]">
        {STEP5_ITEMS.map((item, index) => (
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
            {index < STEP5_ITEMS.length - 1 && (
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
