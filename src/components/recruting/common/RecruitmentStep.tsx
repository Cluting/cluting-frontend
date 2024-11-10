//리크루팅 단계

import { RECRUIT_STEP_ITEMS } from "../../../constants/recruting";
import { useRecruitmentStepStore } from "../../../store/useStore";

export default function RecruitmentStep() {
  const { currentRecruitmentStep, setCurrentRecruitmentStep } =
    useRecruitmentStepStore(); // 상태와 상태 변경 함수 가져오기

  return (
    <div className="flex h-[157px]">
      <div className="w-[250px] flex flex-col items-center pr-[14px] border-r border-b border-gray-200 pt-[26px]">
        <section>
          <div className="h-[67px] bg-gray-100 px-[19px] py-[8px] rounded-[7px] text-left">
            <p className="text-caption1 text-gray-700">Today</p>
            <p className="text-gray-900 text-title3" aria-label="현재 날짜">
              10월 13일 화요일
            </p>
          </div>
        </section>

        <section className="mt-5 mb-[25px]">
          <p className="text-subheadline">
            {RECRUIT_STEP_ITEMS[currentRecruitmentStep]}
          </p>
        </section>
      </div>

      <section className="flex items-start w-full pt-[33px] pl-10 border-b border-gray-200 bg-gray-100">
        {RECRUIT_STEP_ITEMS.map((step, index) => (
          <div key={index} className="flex items-center">
            <div className="flex flex-col">
              <div
                className={`flex-center w-[70px] h-[70px] rounded-full ${
                  currentRecruitmentStep >= index
                    ? "bg-main-100"
                    : "bg-main-300  border-[2px] border-main-400 border-dotted"
                }`}
                onClick={() => setCurrentRecruitmentStep(index)} // 단계 클릭 시 상태 변경
                aria-label={`${step} 단계로 이동`}
              >
                <img
                  src={`/assets/ic-step-0${index + 1}.svg`}
                  alt={`${step} 단계 아이콘`}
                  className={index === 0 ? "w-[32px] h-[26px]" : "w-6 h-6"}
                />
              </div>
              <p className="w-[70px] text-caption2 text-gray-700 mt-2">
                {index + 1}.{step}
              </p>
            </div>
            {index < RECRUIT_STEP_ITEMS.length - 1 && ( // 마지막 단계가 아닐 때만 아이콘 표시
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
