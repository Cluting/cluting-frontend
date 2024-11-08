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
  ); // 캘린더 영역 hover시 표시되는 안내 메시지
  const [isListHovered, setIsListHovered] = useState(false);
  const [listMessage, setListMessage] = useState<string | null>(null); // 리스트 hover시 표시되는 안내 메시지
  const [completedTitles, setCompletedTitles] = useState<string[]>([]); // 완료된 제목 상태
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(
    null
  );
  const [editMode, setEditMode] = useState(false);

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

  const handleEventClick = (clickInfo: EventClickArg) => {
    const { title, start, end } = clickInfo.event;
    setSelectedEvent({
      id: clickInfo.event.id,
      title,
      start: start ? start.toISOString().split("T")[0] : "",
      end: end ? end.toISOString().split("T")[0] : "",
      allDay: clickInfo.event.allDay
    });
    setEditMode(false); // 수정 모드 비활성화
  };

  const handleEditEvent = () => {
    setEditMode(true);
  };

  const handleSaveEvent = () => {
    if (selectedEvent) {
      setEvents((prevEvents) =>
        prevEvents.map((event) =>
          event.id === selectedEvent.id
            ? { ...event, start: selectedEvent.start, end: selectedEvent.end }
            : event
        )
      );
      setEditMode(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (selectedEvent) {
      setSelectedEvent({
        ...selectedEvent,
        [e.target.name]: e.target.value
      });
    }
  };

  // 일정 리스트 위로 마우스가 들어올 때 안내 메시지 표시
  const handleListMouseEnter = () => {
    setListMessage("일정을 선택해 주세요.");
    setIsListHovered(true);
  };

  // 일정 리스트  위에서 마우스가 나갈 때 안내 메시지 숨기기
  const handleListMouseLeave = () => {
    setListMessage(null);
    setIsListHovered(false);
  };

  // 캘린더 위로 마우스가 들어올 때 안내 메시지 표시
  const handleCalendarMouseEnter = () => {
    setInstructionMessage(
      "캘린더 위로 해당 일정의 시작 날짜부터 마지막 날짜까지 드래그 해주세요."
    );
  };

  // 캘린더 위에서 마우스가 나갈 때 안내 메시지 숨기기
  const handleCalendarMouseLeave = () => {
    setInstructionMessage(null);
  };

  return (
    <div className="mt-[30px] mx-10 bg-white-100">
      {selectedEvent && (
        <section className="absolute top-[274px] right-[607px] bg-white-100 border border-gray-400 p-[15px] rounded-[12px] z-10">
          <div className="flex items-center justify-between">
            <h4 className="text-headline text-left">{selectedEvent.title}</h4>
            <div
              className={` bg-${selectedEvent.backgroundColor} w-4 h-4 rounded-full mr-4`}
            ></div>
          </div>
          <hr className="w-[194px] py- border border-gray-200 mt-4 mb-4" />

          <div className="flex items-center mb-[11px]">
            <div className="text-caption3 text-gray-900 mr-2">시작일</div>
            {editMode ? (
              <input
                type="date"
                name="start"
                value={selectedEvent.start}
                onChange={handleInputChange}
                className="border rounded-[7px] text-caption3 px-2 py-1"
              />
            ) : (
              <p className="text-caption3 text-gray-900 py-[2px] px-2 bg-gray-100">
                {selectedEvent.start}
              </p>
            )}
          </div>

          <div className="flex items-center">
            <div className="text-caption3 text-gray-900 mr-2">종료일</div>
            {editMode ? (
              <input
                type="date"
                name="end"
                value={selectedEvent.end}
                onChange={handleInputChange}
                className="border rounded-[7px] text-caption3 px-2 py-1"
              />
            ) : (
              <p className="text-caption3 text-gray-900 py-[2px] px-2 bg-gray-100">
                {selectedEvent.end}
              </p>
            )}
          </div>

          {editMode ? (
            <button
              className="bg-main-300 border border-main-400 hover:bg-main-100 hover:text-gray-100 text-caption3 text-gray-900 py-1 px-2 mt-[11px] mr-[10px] rounded-[6px]"
              onClick={handleSaveEvent}
            >
              저장
            </button>
          ) : (
            <button
              className="bg-main-300 border border-main-400 hover:bg-main-100 hover:text-gray-100 text-caption3 text-gray-900 py-1 px-2 mt-[11px] mr-[10px] rounded-[6px]"
              onClick={handleEditEvent}
            >
              수정
            </button>
          )}

          <button
            className="bg-gray-100 border border-gray-200 hover:bg-gray-400 hover:text-gray-900 text-caption3 text-gray-900 py-1 px-2 mt-[11px] mr-[10px] rounded-[6px]"
            onClick={() => setSelectedEvent(null)}
          >
            닫기
          </button>
        </section>
      )}

      <div className="flex gap-10 text-left">
        <div className="relative flex-col">
          {listMessage && (
            <div className="absolute top-[-25px] text-main-100 text-caption1 mb-2 rounded">
              {listMessage}
            </div>
          )}
          <section
            onMouseEnter={handleListMouseEnter}
            onMouseLeave={handleListMouseLeave}
            className={`${isListHovered ? "border-main-100 border-[2px]" : "border-gray-400 "} w-[300px] text-caption3 bg-gray-100 p-[15px] border flex flex-col rounded-[12px]`}
          >
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
        </div>

        <div
          onMouseEnter={handleCalendarMouseEnter}
          onMouseLeave={handleCalendarMouseLeave}
          className="relative flex flex-col datepicker-container relative"
        >
          {/* 안내 메시지 표시 */}
          {instructionMessage && (
            <div className=" absolute top-[-25px] text-main-100 text-caption1 mb-2 rounded">
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
