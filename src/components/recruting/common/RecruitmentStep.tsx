//리크루팅 단계

import { RECRUIT_STEP_ITEMS } from "../../../constants/recruting";
import { useRecruitmentStepStore } from "../../../store/useStore";

export default function RecruitmentStep() {
  const { completedSteps } = useRecruitmentStepStore();

  // 현재 날짜 가져오기
  const currentDate = new Date();
  const options = {
    month: "long" as const,
    day: "numeric" as const,
    weekday: "long" as const
  };
  const formattedDate = currentDate.toLocaleDateString("ko-KR", options);

  return (
    <div className="flex h-[157px]">
      <div className="w-[240px] flex flex-col items-center pr-[14px] border-r border-b border-gray-200 pt-[26px]">
        <section className="ml-[14px]">
          <div className="h-[67px] bg-gray-100 px-[19px] py-[8px] rounded-[7px] text-left">
            <p className="text-caption1 text-main-100">Today</p>
            <p
              className="text-gray-900 text-[18px] font-semibold"
              aria-label="현재 날짜"
            >
              {formattedDate}
            </p>
          </div>
        </section>

        <section className="mt-5 mb-[25px] ml-[14px]">
          <p className="text-subheadline">{"다음 일정이 곧 시작됩니다."}</p>
        </section>
      </div>

      <section className="flex items-center w-full pt-[33px] pb-[33px] pl-10 border-b border-gray-200 bg-gray-50 rounded-tr-[12px]">
        <div className="flex items-center mb-4">
          <div className="flex flex-col">
            <div
              className={`flex-center w-[70px] h-[70px] rounded-full  ${
                completedSteps[0]
                  ? "bg-main-100 border-none"
                  : "bg-main-300 border border-main-400 border-dotted"
              }`}
            >
              {completedSteps[0] ? (
                <img
                  src={`/assets/recruting-step/ic-step-01-white.svg`}
                  alt={`1 단계 완료 아이콘`}
                  className="w-[38px] h-[38px]"
                />
              ) : (
                <img
                  src={`/assets/recruting-step/ic-step-01.svg`}
                  alt={`1 단계 미완료 아이콘`}
                  className="w-[38px] h-[38px]"
                />
              )}
            </div>
            <p className="w-[70px] text-caption2 text-gray-700 mt-2">
              1. {RECRUIT_STEP_ITEMS[0]}
            </p>
          </div>
        </div>

        <img
          src={`/assets/ic-progress.svg`}
          alt="진행 아이콘"
          className="w-[46px] h-[6px] mx-[6px] mb-5"
        />

        <div className="flex items-center mb-4">
          <div className="flex flex-col">
            <div
              className={`flex-center w-[70px] h-[70px] rounded-full  ${
                completedSteps[1]
                  ? "bg-main-100 border-none"
                  : "bg-main-300 border border-main-400 border-dotted"
              }`}
            >
              {completedSteps[1] ? (
                <img
                  src={`/assets/recruting-step/ic-step-02-white.svg`}
                  alt={`2 단계 완료 아이콘`}
                  className="w-[30px] h-[30px]"
                />
              ) : (
                <img
                  src={`/assets/recruting-step/ic-step-02.svg`}
                  alt={`2 단계 미완료 아이콘`}
                  className="w-[30px] h-[30px]"
                />
              )}
            </div>
            <p className="text-caption2 text-gray-700 mt-2">
              2. {RECRUIT_STEP_ITEMS[1]}
            </p>
          </div>
        </div>

        <img
          src={`/assets/ic-progress.svg`}
          alt="진행 아이콘"
          className="w-[46px] h-[6px] mx-[6px]  mb-5"
        />

        <div className="flex items-center mb-4">
          <div className="flex flex-col">
            <div
              className={`flex-center w-[70px] h-[70px] rounded-full  ${
                completedSteps[2]
                  ? "bg-main-100 border-none"
                  : "bg-main-300 border border-main-400 border-dotted"
              }`}
            >
              {completedSteps[2] ? (
                <img
                  src={`/assets/recruting-step/ic-step-03-white.svg`}
                  alt={`3 단계 완료 아이콘`}
                  className="w-[28px] h-[28px]"
                />
              ) : (
                <img
                  src={`/assets/recruting-step/ic-step-03.svg`}
                  alt={`3 단계 미완료 아이콘`}
                  className="w-[28px] h-[28px]"
                />
              )}
            </div>
            <p className=" text-caption2 text-gray-700 mt-2">
              3.{RECRUIT_STEP_ITEMS[2]}
            </p>
          </div>
        </div>

        <img
          src={`/assets/ic-progress.svg`}
          alt="진행 아이콘"
          className="w-[46px] h-[6px] mx-[6px] mb-5"
        />

        <div className="flex items-center">
          <div className="flex flex-col">
            <div
              className={`flex-center w-[70px] h-[70px] rounded-full  ${
                completedSteps[3]
                  ? "bg-main-100 border-none"
                  : "bg-main-300 border border-main-400 border-dotted"
              }`}
            >
              {completedSteps[3] ? (
                <img
                  src={`/assets/recruting-step/ic-step-04-white.svg`}
                  alt={`4 단계 완료 아이콘`}
                  className="w-6 h-6"
                />
              ) : (
                <img
                  src={`/assets/recruting-step/ic-step-04.svg`}
                  alt={`4 단계 미완료아이콘`}
                  className="w-6 h-6"
                />
              )}
            </div>
            <p className="w-[70px] text-caption2 text-gray-700 mt-2">
              4. {RECRUIT_STEP_ITEMS[3]}
            </p>
          </div>
        </div>

        <img
          src={`/assets/ic-progress.svg`}
          alt="진행 아이콘"
          className="w-[46px] h-[6px] mx-[6px] mb-5"
        />

        <div className="flex items-center mb-4">
          <div className="flex flex-col">
            <div
              className={`flex-center w-[70px] h-[70px] rounded-full  ${
                completedSteps[4]
                  ? "bg-main-100 border-none"
                  : "bg-main-300 border border-main-400 border-dotted"
              }`}
            >
              {completedSteps[4] ? (
                <img
                  src={`/assets/recruting-step/ic-step-05-white.svg`}
                  alt={`5 단계 완료 아이콘`}
                  className="w-6 h-6"
                />
              ) : (
                <img
                  src={`/assets/recruting-step/ic-step-05.svg`}
                  alt={`5 단계 미완료 아이콘`}
                  className="w-[35px] h-[35px]"
                />
              )}
            </div>
            <p className=" text-caption2 text-gray-700 mt-2">
              5. {RECRUIT_STEP_ITEMS[4]}
            </p>
          </div>
        </div>

        <img
          src={`/assets/ic-progress.svg`}
          alt="진행 아이콘"
          className="w-[46px] h-[6px] mx-[6px] mb-5"
        />

        <div className="flex items-center">
          <div className="flex flex-col">
            <div
              className={`flex-center w-[70px] h-[70px] rounded-full  ${
                completedSteps[5]
                  ? "bg-main-100 border-none"
                  : "bg-main-300 border border-main-400 border-dotted"
              }`}
            >
              {completedSteps[5] ? (
                <img
                  src={`/assets/recruting-step/ic-step-06-white.svg`}
                  alt={`6 단계 완료 아이콘`}
                  className="w-6 h-6"
                />
              ) : (
                <img
                  src={`/assets/recruting-step/ic-step-06.svg`}
                  alt={`6 단계 아이콘`}
                  className="w-6 h-6"
                />
              )}
            </div>
            <p className="w-[70px] text-caption2 text-gray-700 mt-2">
              6.{RECRUIT_STEP_ITEMS[5]}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
