import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useState } from "react";

interface CalendarEvent {
  id: string;
  title: string;
  start: string;
  end: string;
  allDay: boolean;
  backgroundColor?: string;
}

interface Club {
  id: number;
  name: string;
  color: string;
}

export default function ApplicantCalendar() {
  const [appliedClubs, setAppliedClubs] = useState<Club[]>([
    { id: 1, name: "IT 서비스 동아리 잇타", color: "#FF5733" }
  ]);

  const [events, setEvents] = useState<CalendarEvent[]>([
    {
      id: "1",
      title: "서류 모집 기간",
      start: "2025-01-15",
      end: "2025-01-25",
      allDay: true,
      backgroundColor: "#FF6347"
    },
    {
      id: "2",
      title: "서류 합격자 발표일",
      start: "2025-01-30",
      end: "2025-01-30",
      allDay: true,
      backgroundColor: "#FF6347"
    },
    {
      id: "3",
      title: "최종 합격자 발표일",
      start: "2025-02-01",
      end: "2025-02-01",
      allDay: true,
      backgroundColor: "#FF6347"
    }
  ]);

  return (
    <div className="flex gap-10">
      <div className="w-[300px] bg-gray-100 p-[15px] border rounded-[12px]">
        {appliedClubs.map((club) => (
          <div
            key={club.id}
            className="flex items-center py-3 pl-4 my-[6px] bg-gray-100 border border-gray-200 rounded-[8px]"
          >
            <div
              className="w-4 h-4 mr-4 bg-white-100 rounded-lg"
              style={{ backgroundColor: club.color }}
            ></div>
            <span className="text-subheadline text-gray-900">{club.name}</span>
          </div>
        ))}
      </div>

      <div className="flex-grow">
        <FullCalendar
          locale="ko"
          headerToolbar={{
            left: "prev",
            center: "title",
            right: "next"
          }}
          timeZone="UTC"
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          events={events}
          eventContent={(eventInfo) => (
            <div
              className="text-xs h-[15px] text-[7.89px] font-medium rounded-full "
              style={{
                backgroundColor: eventInfo.event.backgroundColor
              }}
            >
              <b>{eventInfo.event.title}</b>
            </div>
          )}
          height="auto"
        />
      </div>
    </div>
  );
}
