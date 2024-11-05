//리크루팅 일정 캘린더
import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./RecrutingCalender.css";
import { ko } from "date-fns/locale";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function RecrutingCalender() {
  const [value, onChange] = useState<Value>(new Date());
  return (
    <div className="mt-[30px] mx-10 bg-white-100 ">
      <div className="flex gap-10 text-left">
        <section className="w-[300px] text-caption3 flex flex-col ">
          <div className="text-headline mb-5">리크루팅 일정</div>
          <div className="flex items-center bg-white-100 py-3 pl-4 my-[6px] rounded-[8px] border  border-gray-200 text-subheadline text-gray-900">
            <img
              src="/assets/ic-dateList.svg"
              alt="리크루팅 일정 리스트"
              className="w-[17px] h-[20px] mr-2"
            />
            지원자 리스트 보기
          </div>
          <div className="flex items-center bg-white-100 py-3 pl-4 my-[6px] rounded-[8px] border  border-gray-200 text-subheadline text-gray-900">
            <img
              src="/assets/ic-dateList.svg"
              alt="리크루팅 일정 리스트"
              className="w-[17px] h-[20px] mr-2"
            />
            면접 일정 바로가기
          </div>
          <div className="flex items-center bg-white-100 py-3 pl-4 my-[6px] rounded-[8px] border  border-gray-200 text-subheadline text-gray-900">
            <img
              src="/assets/ic-dateList.svg"
              alt="리크루팅 일정 리스트"
              className="w-[17px] h-[20px] mr-2"
            />
            서류 합격자 리스트 보기
          </div>
          <div className="flex items-center bg-white-100 py-3 pl-4 my-[6px] rounded-[8px] border  border-gray-200 text-subheadline text-gray-900">
            <img
              src="/assets/ic-dateList.svg"
              alt="리크루팅 일정 리스트"
              className="w-[17px] h-[20px] mr-2"
            />
            최종 합격 리스트 보기
          </div>
        </section>
        <Calendar
          locale="ko-KR"
          selectRange={false}
          onChange={onChange}
          value={value}
        />
      </div>
    </div>
  );
}
