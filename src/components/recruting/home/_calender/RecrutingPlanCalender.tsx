//리크루팅 일정 캘린더
import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./RecrutingCalender.css";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function RecrutingCalender() {
  const [value, onChange] = useState<Value>(new Date());
  return (
    <div className="bg-white-100 w-full rounded-[12px]">
      <div className="flex gap-10">
        <section className="w-[260px] bg-gray-100 p-[15px] text-caption3 flex flex-col border border-2px border-gray-900 rounded-[12px] ">
          <div className="bg-white-100 py-3 my-[6px] rounded-[8px] border  border-gray-100 ">
            리크루팅 준비 기간
          </div>
          <div className="bg-white-100 py-3 my-[6px] rounded-[8px] border  border-gray-100 ">
            공고 업로드
          </div>
          <div className="bg-white-100 py-3 my-[6px] rounded-[8px] border  border-gray-100 ">
            모집 기간
          </div>
          <div className="bg-white-100 py-3 my-[6px] rounded-[8px] border  border-gray-100 ">
            서류 평가 기간
          </div>
          <div className="bg-white-100 py-3 my-[6px] rounded-[8px] border  border-gray-100 ">
            1차 함격자 발표
          </div>
          <div className="bg-white-100 py-3 my-[6px] rounded-[8px] border  border-gray-100 ">
            면접 기간
          </div>
          <div className="bg-white-100 py-3 my-[6px] rounded-[8px] border  border-gray-100 ">
            면접 평가 기간
          </div>
        </section>
        <Calendar onChange={onChange} value={value} />
      </div>
    </div>
  );
}
