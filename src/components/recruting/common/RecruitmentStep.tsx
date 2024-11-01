//리크루팅 단계

import { useStore } from "../../../store/useStore";

const steps = [
  "계획 세우기",
  "모집 준비하기",
  "서류 평가하기",
  "서류 합격자 및 면접 안내",
  "면접 평가하기",
  "최종 합격자 및 활동 안내"
];

export default function RecruitmentStep() {
  const { currentStep, setCurrentStep } = useStore(); // 상태와 상태 변경 함수 가져오기

  return (
    <div className="flex">
      <div className="flex flex-col items-center">
        <section>
          <div className="bg-gray-100 px-[19px] py-[8px] rounded-[7px] text-left">
            <p className="text-caption1 text-gray-700">Today</p>
            <p className="text-gray-900 text-title3">10월 13일 화요일</p>
          </div>
        </section>

        <section className="mt-5 mb-[25px]">
          <p className="text-subheadline">{steps[currentStep]}</p>
        </section>
      </div>

      <section className="flex items-center ml-10">
        {steps.map((step, index) => (
          <div key={index} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={`w-[70px] h-[70px] rounded-full ${
                  currentStep >= index ? "bg-gray-800" : "bg-gray-400"
                }`}
                onClick={() => setCurrentStep(index)} // 단계 클릭 시 상태 변경
              ></div>
              <p className="w-max text-caption2 text-gray-700 mt-2">{step}</p>
            </div>
            {index < steps.length - 1 && ( // 마지막 단계가 아닐 때만 아이콘 표시
              <img
                src="/assets/ic-progress.svg"
                alt="진행 단계"
                className="w-[46px] h-[6px] mx-4 mb-5"
              />
            )}
          </div>
        ))}
      </section>
    </div>
  );
}
