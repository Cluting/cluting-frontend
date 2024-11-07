import "react-datepicker/dist/react-datepicker.css";
import "./calendar.css";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import { useState } from "react";
import { DateSelectArg, EventClickArg } from "@fullcalendar/core";

interface CalendarEvent {
  id: string;
  title: string;
  start: string;
  end: string;
  allDay: boolean;
}

export default function RecrutingCalenderPicker() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [currrentTitle, setCurrentTitle] = useState("");
  const [selectedRange, setSelectedRange] = useState<{
    start: string;
    end: string;
  } | null>(null); // 선택된 날짜 범위 상태

  // 날짜 선택 시 이벤트 추가 함수
  const handleDateSelect = (selectInfo: DateSelectArg) => {
    const title = currrentTitle;
    const calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // 선택 해제

    if (title) {
      const newEvent: CalendarEvent = {
        id: String(events.length + 1),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay
      };
      setEvents((prevEvents) => [...prevEvents, newEvent]);
    }
  };

  // 이벤트 클릭 시 삭제 함수
  const handleEventClick = (clickInfo: EventClickArg) => {
    if (confirm(`"${clickInfo.event.title}" 이벤트를 삭제할까요?`)) {
      clickInfo.event.remove();
      setEvents((prevEvents) =>
        prevEvents.filter((event) => event.id !== clickInfo.event.id)
      );
    }
  };

  return (
    <div className="mt-[30px] mx-10 bg-white-100">
      <div className="flex gap-10 text-left">
        <section className="w-[300px] text-caption3 flex flex-col">
          <button
            className="flex items-center bg-white-100 py-3 pl-4 my-[6px] rounded-[8px] border border-gray-200 text-subheadline text-gray-900"
            onClick={() => {
              setCurrentTitle("지원자 리스트 보기");
            }}
          >
            <img
              src="/assets/ic-dateList.svg"
              alt="리크루팅 일정 리스트"
              className="w-[17px] h-[20px] mr-2"
            />
            지원자 리스트 보기
          </button>
          <button
            onClick={() => {
              setCurrentTitle("면접 일정 바로가기");
            }}
            className="flex items-center bg-white-100 py-3 pl-4 my-[6px] rounded-[8px] border border-gray-200 text-subheadline text-gray-900"
          >
            <img
              src="/assets/ic-dateList.svg"
              alt="리크루팅 일정 리스트"
              className="w-[17px] h-[20px] mr-2"
            />
            면접 일정 바로가기
          </button>
          <button
            onClick={() => {
              setCurrentTitle("서류 합격자 리스트 보기");
            }}
            className="flex items-center bg-white-100 py-3 pl-4 my-[6px] rounded-[8px] border border-gray-200 text-subheadline text-gray-900"
          >
            <img
              src="/assets/ic-dateList.svg"
              alt="리크루팅 일정 리스트"
              className="w-[17px] h-[20px] mr-2"
            />
            서류 합격자 리스트 보기
          </button>
          <button
            onClick={() => {
              setCurrentTitle("최종 합격 리스트 보기");
            }}
            className="flex items-center bg-white-100 py-3 pl-4 my-[6px] rounded-[8px] border border-gray-200 text-subheadline text-gray-900"
          >
            <img
              src="/assets/ic-dateList.svg"
              alt="리크루팅 일정 리스트"
              className="w-[17px] h-[20px] mr-2"
            />
            최종 합격 리스트 보기
          </button>
        </section>

        <div className="datepicker-container relative">
          <FullCalendar
            locale="ko"
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            editable={true}
            selectable={true}
            selectMirror={true}
            nowIndicator={true}
            events={events} // 생성된 이벤트를 FullCalendar에 전달
            eventClick={handleEventClick}
            select={handleDateSelect} // 날짜 범위를 선택할 때의 이벤트
            headerToolbar={{
              left: "prev",
              center: "title",
              right: "next"
            }}
            eventBackgroundColor="#ff0000"
            eventBorderColor="#0000ff"
            timeZone="UTC"
            // 날짜 범위 선택 시 선택된 범위를 업데이트
            datesSet={(dateInfo) => {
              if (dateInfo.view.type === "dayGridMonth") {
                const start = dateInfo.view.currentStart;
                const end = dateInfo.view.currentEnd;
                setSelectedRange({
                  start: start.toISOString().split("T")[0], // 'yyyy-mm-dd' 형식
                  end: end.toISOString().split("T")[0] // 'yyyy-mm-dd' 형식
                });
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}
