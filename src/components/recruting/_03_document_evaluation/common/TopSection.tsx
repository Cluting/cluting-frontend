import { useEffect, useState } from "react";
import { STEP3_ITEMS } from "../../../../constants/recruting";
import {
  useRecruitmentStepStore,
  useStepTwoStore
} from "../../../../store/useStore";
import AddAdmin from "../../home/_admin/AddAdmin";
import { useNavigate } from "react-router-dom";

export default function TopSection() {
  const { currentStep, setCurrentStep } = useStepTwoStore();
  const { currentRecruitmentStep, setCurrentRecruitmentStep } =
    useRecruitmentStepStore(); //전체 스텝
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [showAdmin, setShowAdmin] = useState(false); //권한자 보기 드롭다운
  const navigate = useNavigate();

  useEffect(() => {
    const paths = [
      "/recruting/03_document_evaluation/docPrep",
      "/recruting/03_document_evaluation/doc"
    ];
    const index = paths.findIndex((path) => location.pathname.includes(path));
    if (index !== -1) {
      setCurrentStep(index);
    }
  }, [location.pathname, setCurrentStep]);

  const handleMouseEnter = (index: number) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  const handleItemClick = (index: number) => {
    setCurrentStep(index); // 현재 단계를 업데이트
    const paths = ["docPrep", "doc"];
    navigate(`/recruting/03_document_evaluation/${paths[index]}`);
  };

  return (
    <div>
      <div className="relative flex justify-between items-center pl-8 mb-[9px] text-left">
        <div className="flex items-center">
          <div className="flex-center mr-3 w-[33px] h-[30px] bg-white-100 border border-gray-500 rounded-[8px]">
            3
          </div>
          <h1 className="text-title1 mr-3">
            {currentRecruitmentStep || "서류 평가하기"}
          </h1>
          <p className="text-headline">
            {`> (${currentStep + 1}) ${STEP3_ITEMS[currentStep]}`}
          </p>
        </div>
        <button
          onClick={() => {
            setShowAdmin(!showAdmin);
          }}
          className="text-gray-700 hover:underline"
        >
          권한자 보기
        </button>

        {showAdmin && <AddAdmin isDropdown />}
      </div>
      <div className="w-full h-[110px] flex-center bg-white-100 ml-8 my-4 px-8 rounded-[12px]">
        {STEP3_ITEMS.map((item, index) => (
          <div key={index} className="flex items-center">
            <div
              className={`w-[469px] h-[62px] flex-center mx-[6px] px-[28px] rounded-[8px] text-subheadline ${
                currentStep === index
                  ? "bg-main-100 text-white-100"
                  : "bg-main-300 text-gray-900"
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
    </div>
  );
}
