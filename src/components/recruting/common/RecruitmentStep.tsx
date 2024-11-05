//리크루팅 단계

import { useRecruitmentStepStore } from "../../../store/useStore";

const steps = [
  "계획 세우기",
  "모집 준비하기",
  "서류 평가하기",
  "서류 합격자 및 면접 안내",
  "면접 평가하기",
  "최종 합격자 및 활동 안내"
];

export default function RecruitmentStep() {
  const { currentStep, setCurrentStep } = useRecruitmentStepStore(); // 상태와 상태 변경 함수 가져오기

  return (
    <div className="flex h-[157px]">
      <div className="w-[250px] flex flex-col items-center pr-[14px] border-r border-b border-gray-200 pt-[26px]">
        <section>
          <div className="h-[67px] bg-gray-100 px-[19px] py-[8px] rounded-[7px] text-left">
            <p className="text-caption1 text-gray-700">Today</p>
            <p className="text-gray-900 text-title3">10월 13일 화요일</p>
          </div>
        </section>

        <section className="mt-5 mb-[25px]">
          <p className="text-subheadline">{steps[currentStep]}</p>
        </section>
      </div>

      <section className="flex items-start w-full pt-[33px] pl-10 border-b border-gray-200 bg-gray-100">
        {steps.map((step, index) => (
          <div key={index} className="flex items-center">
            <div className="flex flex-col">
              <div
                className={`w-[70px] h-[70px] rounded-full ${
                  currentStep >= index ? "bg-gray-800" : "bg-gray-400"
                }`}
                onClick={() => setCurrentStep(index)} // 단계 클릭 시 상태 변경
              ></div>
              <p className="w-[70px] text-caption2 text-gray-700 mt-2">
                {step}
              </p>
            </div>
            {index < steps.length - 1 && ( // 마지막 단계가 아닐 때만 아이콘 표시
              <img
                src="/assets/ic-progress.svg"
                alt="진행 단계"
                className="w-[46px] h-[6px] mx-4"
              />
            )}
          </div>
        ))}
      </section>
    </div>
  );
}
