import React from "react";

const labels = [
  "접수 기간",
  "서류 합격자 발표일",
  "최종 합격자 발표일",
  "모집 인원",
  "활동 기간",
  "활동 요일",
  "활동 시간",
  "동아리 회비"
];

const data = {
  receptionPeriod: "2월 16일(월) ~ 2월 27일(수)",
  documentResult: "2월 28일(목)",
  finalResult: "3월 2일(일)",
  recruitNumber: "약 50명",
  activePeriod: "2025년 3월 ~ 2025년 8월 (약 5개월)",
  activeDay: "매주 토요일",
  activeTime: "2 ~ 3시간 내외",
  fee: "5만원",
  dDay: "D-3"
};

export default function ClubInformation() {
  const values = [
    <>
      <div className="flex gap-1">
        <p>{data.receptionPeriod}</p>
        <div className="flex flex-center px-2 py-1 border border-[#D0D4E7] rounded-md bg-white-100">
          <span className="text-[#ff4e4e] font-Pretendard text-xs font-bold leading-3 tracking-normal">
            {data.dDay}
          </span>
        </div>
      </div>
    </>,
    data.documentResult,
    data.finalResult,
    data.recruitNumber,
    data.activePeriod,
    data.activeDay,
    data.activeTime,
    data.fee
  ];

  return (
    <div className="flex gap-20">
      {/* 고정된 텍스트 */}
      <div className="flex flex-col gap-7">
        {labels.map((label, index) => (
          <h4
            key={index}
            className="text-[#2c2e35] font-Pretendard font-bold text-lg leading-5 tracking-normal text-left"
          >
            {label}
          </h4>
        ))}
      </div>

      {/* API 데이터 값 */}
      <div className="flex flex-col gap-7">
        {values.map((value, index) => (
          <p
            key={index}
            className="font-medium leading-5 tracking-normal text-left text-gray-1100 font-Pretendard"
          >
            {value}
          </p>
        ))}
      </div>
    </div>
  );
}
