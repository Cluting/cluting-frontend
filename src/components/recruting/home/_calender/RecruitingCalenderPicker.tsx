import "./calendar.css";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import { useState } from "react";
import { DateSelectArg, EventClickArg } from "@fullcalendar/core";
import {
  CALENDAR_ITEMS,
  CALENDAR_COLORS
} from "../../../../constants/recruting";

interface CalendarEvent {
  id: string;
  title: string;
  start: string;
  end: string;
  allDay: boolean;
  backgroundColor?: string; // 색상 속성 추가
}

export default function RecrutingCalenderPicker() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [currrentTitle, setCurrentTitle] = useState("");
  const [selectedRange, setSelectedRange] = useState<{
    start: string;
    end: string;
  } | null>(null); // 선택된 날짜 범위 상태
  const [instructionMessage, setInstructionMessage] = useState<string | null>(
    null
  ); // 드래그 시작시 표시되는 안내 메시지
  const [completedTitles, setCompletedTitles] = useState<string[]>([]); // 완료된 제목 상태

  // 날짜 선택 시 이벤트 추가 함수
  const handleDateSelect = (selectInfo: DateSelectArg) => {
    const title = currrentTitle;
    const calendarApi = selectInfo.view.calendar;
    const colorIndex = CALENDAR_ITEMS.indexOf(title);
    const backgroundColor =
      CALENDAR_COLORS[colorIndex % CALENDAR_COLORS.length];

    calendarApi.unselect(); // 선택 해제

    // 이미 존재하는 제목인지 확인
    const isDuplicateTitle = events.some((event) => event.title === title);

    if (title && !isDuplicateTitle) {
      const newEvent: CalendarEvent = {
        id: String(events.length + 1),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
        backgroundColor: backgroundColor
      };
      setEvents((prevEvents) => [...prevEvents, newEvent]);
      setCompletedTitles((prevTitles) => [...prevTitles, title]); // 완료된 제목에 추가
      console.log(events);
      setInstructionMessage("");
    } else if (isDuplicateTitle) {
      alert("같은 제목의 이벤트가 이미 있습니다.");
    }

    // 날짜 선택 시작 시 안내 메시지 표시
    setInstructionMessage(
      "캘린더 위로 해당 일정의 시작 날짜부터 마지막 날짜까지 드래그 해주세요."
    );
  };

  // 이벤트 클릭 시 삭제 함수
  const handleEventClick = (clickInfo: EventClickArg) => {
    if (confirm(`"${clickInfo.event.title}" 이벤트를 삭제할까요?`)) {
      clickInfo.event.remove();
      setEvents((prevEvents) =>
        prevEvents.filter((event) => event.id !== clickInfo.event.id)
      );
      setCompletedTitles((prevTitles) =>
        prevTitles.filter((title) => title !== clickInfo.event.title)
      ); // 취소된 제목은 완료 리스트에서 제거
    }
  };

  return (
    <div className="mt-[30px] mx-10 bg-white-100">
      <div className="flex gap-10 text-left">
        <section className="w-[300px] text-caption3 bg-gray-100 p-[15px] border border-gray-400 flex flex-col rounded-[12px]">
          {CALENDAR_ITEMS.map((item, index) => (
            <button
              key={item}
              className={`${
                currrentTitle === item
                  ? "bg-gray-200 border border-gray-400"
                  : "bg-white-100 border border-gray-200"
              } flex items-center py-3 pl-4 my-[6px] rounded-[8px] text-subheadline text-gray-900 ${
                completedTitles.includes(item) ? "line-through" : ""
              }`}
              onClick={() => setCurrentTitle(item)}
            >
              <div
                className="bg-red-100 w-4 h-4 rounded-full mr-4"
                style={{
                  backgroundColor:
                    CALENDAR_COLORS[index % CALENDAR_COLORS.length]
                }} // 각 순서에 맞는 색상 적용
              ></div>
              {item}
            </button>
          ))}
        </section>

        <div className="flex flex-col datepicker-container relative">
          {/* 안내 메시지 표시 */}
          {instructionMessage && (
            <div className="text-red-100 text-caption1 mb-2 rounded">
              {instructionMessage}
            </div>
          )}
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
