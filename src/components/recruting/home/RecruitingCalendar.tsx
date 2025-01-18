import "../../../style/calendar.css";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import { Link } from "react-router-dom";
import { CALENDAR_COLORS, CALENDAR_ITEMS } from "../../../constants/recruting";
import { useEffect, useState } from "react";
import { addDays } from "date-fns";

interface RecrutingCalenderProps {
  apiSchedule?: RecruitSchedule;
}

export default function RecruitingCalender({
  apiSchedule
}: RecrutingCalenderProps) {
  const [events, setEvents] = useState<CalendarEvent[]>([]);

  //불러온 일정 캘린더에 표시
  useEffect(() => {
    if (apiSchedule) {
      const events = CALENDAR_ITEMS.map((title, index) => {
        const stageNumber = index + 1;
        const start = (apiSchedule as any)[`stage${stageNumber}Start`];
        const end = (apiSchedule as any)[`stage${stageNumber}End`];

        if (start && end) {
          return {
            id: `stage${stageNumber}`,
            title: title,
            start: start,
            end: addDays(new Date(end), 1).toISOString().split("T")[0],
            allDay: true,
            backgroundColor: CALENDAR_COLORS[index % CALENDAR_COLORS.length],
            display: "block"
          };
        }
        return null;
      }).filter((event) => event !== null);

      setEvents(events as CalendarEvent[]);

      // Update completedTitles based on apiSchedule
      const completedTitles = CALENDAR_ITEMS.filter((item, index) => {
        const stageNumber = index + 1;
        return (
          (apiSchedule as any)[`stage${stageNumber}Start`] &&
          (apiSchedule as any)[`stage${stageNumber}End`]
        );
      });
    }
  }, [apiSchedule]);

  return (
    <div className="mt-[30px]  bg-white-100 flex gap-[49px] pl-[33px]">
      <div className="flex flex-col">
        <p className="text-headline  text-left mb-[21px]">
          리크루팅 정보 바로가기
        </p>
        <section className="w-[307px] text-caption3 bg-white-100  flex flex-col rounded-[12px]">
          <Link
            to="/recruting/03_document_evaluation/doc/before"
            className="bg-gray-100 border border-gray-200 flex items-center py-[14px] pl-4 mb-[17px] rounded-[8px] text-subheadline text-gray-900"
          >
            <img
              src="/assets/ic-recruitingList-01.svg"
              alt=" 서류 평가로 이동하기"
              className="w-5 h-5 mr-2"
            />
            서류 평가로 이동하기
          </Link>
          <Link
            to="/recruting/04_interview_notification"
            className="bg-gray-100 border border-gray-200 flex items-center  py-[14px] pl-4 mb-[17px] rounded-[8px] text-subheadline text-gray-900"
          >
            <img
              src="/assets/ic-recruitingList-02.svg"
              alt=" 서류 결과 보기"
              className="w-5 h-5 mr-2"
            />
            서류 결과 보기
          </Link>
          <Link
            to="/recruting/05_interview_evaluation/interview/after/before"
            className="bg-gray-100 border border-gray-200 flex items-center  py-[14px] pl-4 mb-[17px] rounded-[8px] text-subheadline text-gray-900"
          >
            <img
              src="/assets/ic-recruitingList-03.svg"
              alt="면접 평가로 이동하기"
              className="w-5 h-5 mr-2"
            />
            면접 평가로 이동하기
          </Link>
          <Link
            to="/recruting/06_final_selection"
            className="bg-gray-100 border border-gray-200 flex items-center  py-[14px] pl-4 mb-[17px] rounded-[8px] text-subheadline text-gray-900"
          >
            <img
              src="/assets/ic-recruitingList-04.svg"
              alt=" 최종 결과 보기"
              className="w-5 h-5 mr-2"
            />
            최종 결과 보기
          </Link>
        </section>
      </div>

      <div className="relative flex flex-col datepicker-container">
        <p className="text-headline text-left mb-[21px]">리크루팅 달력</p>
        <FullCalendar
          locale="ko"
          events={events}
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          editable={false}
          selectable={false}
          selectMirror={false}
          nowIndicator={true}
          headerToolbar={{
            left: "prev",
            center: "title",
            right: "next"
          }}
          timeZone="UTC"
        />
      </div>
    </div>
  );
}
