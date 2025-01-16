import { useState } from "react";

export default function ApplicantStatus() {
  //FIX: 임시 단계별 진행 상태
  const [completedSteps, setCompletedSteps] = useState([
    true,
    false,
    false,
    false,
    false,
    false
  ]);
  return (
    <div className="flex w-full h-[116.72px] my-3 bg-gray-100 rounded-[15.18px] border border-gray-200 ">
      <div className="w-[149px] flex flex-col items-center border-r border-gray-200 py-[14px] px-[10px]">
        <img
          src="/assets/ic-profile.svg"
          className="w-[42px] h-[42px] rounded-full mb-[5px]"
        />
        <p className="font-semibold font-[14px] text-center text-gray-800">
          IT 서비스 동아리 잇타
        </p>
      </div>

      <section className="flex items-center w-full  text-center pt-[33px] pb-[33px] pl-10  bg-gray-50 rounded-tr-[12px]">
        <div className="flex items-center">
          <div className="flex flex-col ">
            <div
              className={`flex-center w-[70px] h-[70px] rounded-full  ${
                completedSteps[0]
                  ? "bg-main-100 border-none"
                  : "bg-main-300 border border-main-400 border-dotted"
              }`}
            >
              {completedSteps[0] ? (
                <img
                  src={`/assets/applicant-step/ic-step-01-white.svg`}
                  alt={`1 단계 완료 아이콘`}
                  className="w-[34px] h-[34px]"
                />
              ) : (
                <img
                  src={`/assets/applicant-step/ic-step-01.svg`}
                  alt={`1 단계 미완료 아이콘`}
                  className="w-[34px] h-[34px]"
                />
              )}
            </div>
            <p className="w-[70px] text-caption2 text-gray-700 mt-2">
              지원 완료
            </p>
          </div>
        </div>

        <img
          src={`/assets/ic-progress.svg`}
          alt="진행 아이콘"
          className="w-[46px] h-[6px] mx-3 mb-5"
        />

        <div className="flex items-center">
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
                  src={`/assets/applicant-step/ic-step-02-white.svg`}
                  alt={`2 단계 완료 아이콘`}
                  className="w-[34px] h-[34px]"
                />
              ) : (
                <img
                  src={`/assets/applicant-step/ic-step-02.svg`}
                  alt={`2 단계 미완료 아이콘`}
                  className="w-[34px] h-[34px]"
                />
              )}
            </div>
            <p className="text-caption2 text-gray-700 mt-2">서류 평가 중</p>
          </div>
        </div>

        <img
          src={`/assets/ic-progress.svg`}
          alt="진행 아이콘"
          className="w-[46px] h-[6px] mx-3 mb-5"
        />

        <div className="flex items-center">
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
                  src={`/assets/applicant-step/ic-step-03-white.svg`}
                  alt={`3 단계 완료 아이콘`}
                  className="w-[34px] h-[34px]"
                />
              ) : (
                <img
                  src={`/assets/applicant-step/ic-step-03.svg`}
                  alt={`3 단계 미완료 아이콘`}
                  className="w-[34px] h-[34px]"
                />
              )}
            </div>
            <p className=" text-caption2 text-gray-700 mt-2">
              서류 합격자 발표
            </p>
          </div>
        </div>

        <img
          src={`/assets/ic-progress.svg`}
          alt="진행 아이콘"
          className="w-[46px] h-[6px] mx-3  mb-5"
        />

        <div className="flex items-center">
          <div className="flex flex-col text-center">
            <div
              className={`flex-center w-[70px] h-[70px] rounded-full  ${
                completedSteps[3]
                  ? "bg-main-100 border-none"
                  : "bg-main-300 border border-main-400 border-dotted"
              }`}
            >
              {completedSteps[3] ? (
                <img
                  src={`/assets/applicant-step/ic-step-04-white.svg`}
                  alt={`4 단계 완료 아이콘`}
                  className="w-[34px] h-[34px]"
                />
              ) : (
                <img
                  src={`/assets/applicant-step/ic-step-04.svg`}
                  alt={`4 단계 미완료아이콘`}
                  className="w-[34px] h-[34px]"
                />
              )}
            </div>
            <p className="w-[70px] text-caption2 text-gray-700 mt-2">
              면접 평가 중
            </p>
          </div>
        </div>

        <img
          src={`/assets/ic-progress.svg`}
          alt="진행 아이콘"
          className="w-[46px] h-[6px] mx-3 mb-5"
        />

        <div className="flex items-center">
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
                  src={`/assets/applicant-step/ic-step-05-white.svg`}
                  alt={`5 단계 완료 아이콘`}
                  className="w-[34px] h-[34px]"
                />
              ) : (
                <img
                  src={`/assets/applicant-step/ic-step-05.svg`}
                  alt={`5 단계 미완료 아이콘`}
                  className="w-[34px] h-[34px]"
                />
              )}
            </div>
            <p className=" text-caption2 text-gray-700 mt-2">
              최종 합격자 발표
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
