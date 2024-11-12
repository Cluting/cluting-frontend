import { useState } from "react";
import { useInterviewStore } from "../../../../store/useStore";

// 인터뷰 날짜 타입 정의
interface Day {
  date: string;
  dayOfWeek: string;
}

const generateDaysArray = (startDate: Date, endDate: Date): Day[] => {
  const days: Day[] = [];
  const currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    const dayOfWeek = ["일", "월", "화", "수", "목", "금", "토"][
      currentDate.getDay()
    ];
    const date = `${currentDate.getMonth() + 1}월 ${currentDate.getDate()}일`;

    days.push({ date, dayOfWeek });
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return days;
};

export default function InterviewAvailableTime() {
  const {
    interviewStartTime,
    interviewEndTime,
    interviewStartDate,
    interviewEndDate
  } = useInterviewStore();
  const days = generateDaysArray(interviewStartDate, interviewEndDate);
  // 하드코딩된 시간 배열
  const times = [
    "9:00 AM",
    "9:30 AM",
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM"
  ];

  const [selectedSlots, setSelectedSlots] = useState<{
    [key: string]: boolean;
  }>({});
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = (day: string, time: string) => {
    const key = `${day}-${time}`;
    setSelectedSlots((prev) => {
      const updatedSlots = {
        ...prev,
        [key]: !prev[key]
      };
      console.log("Selected time slot:", updatedSlots); // 드래그 혹은 선택된 시간대 출력
      return updatedSlots;
    });
    setIsDragging(true);
  };

  const handleMouseEnter = (day: string, time: string) => {
    if (isDragging) {
      const key = `${day}-${time}`;
      setSelectedSlots((prev) => {
        const updatedSlots = {
          ...prev,
          [key]: true
        };
        console.log("Selected time slot:", updatedSlots); // 드래그 중 선택된 시간대 출력
        return updatedSlots;
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div className="section-background flex flex-wrap space-y-4 ">
      {/* 시간표 렌더링 (표 안) */}
      <section
        className="overflow-auto scrollbar-hidden w-[963px] h-auto relative border border-gray-300 custom-shadow rounded-[12px] pt-[27px] px-4"
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {/* 요일, 날짜 렌더링 (표 밖) */}
        <div className="relative flex left-[92px] gap-[7.5px] ">
          {days.map((day) => (
            <div
              key={day.date}
              className="flex flex-col items-center p-2 w-[77.85px] min-w-[77.85px] max-w-[77.85px] bg-gray-100 rounded-[8px]"
            >
              <p className="text-caption2 text-gray-900">{day.date}</p>
              <p className="text-subheadline text-gray-900">{day.dayOfWeek}</p>
            </div>
          ))}
        </div>

        <table className=" text-center table-layout:fixed table-fixed mb-3 border-separate  border-spacing-x-2">
          <thead>
            <tr>
              <th className="p-2 border-gray-300 w-[77.85px] min-w-[77.85px] max-w-[77.85px]"></th>
              {days.map((day) => (
                <th
                  key={day.date}
                  className="p-2 border-b border-gray-300 w-[77.85px] min-w-[77.85px] max-w-[77.85px]"
                >
                  {/* 날짜 및 요일 */}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {times.map((time, index) => (
              <tr
                key={time}
                className={index % 2 === 1 ? "border-b border-gray-500" : ""}
              >
                <td className="text-caption2 text-gray-900 w-[77.85px] min-w-[77.85px] max-w-[77.85px]">
                  {index % 2 === 0 ? time : ""}
                </td>
                {days.map((day) => {
                  const key = `${day.date}-${time}`;
                  return (
                    <td
                      key={key}
                      className={`p-2 border cursor-pointer h-[20px]w-[77.85px] min-w-[77.85px] max-w-[77.85px] ${
                        selectedSlots[key] ? "bg-main-100" : "bg-main-300"
                      } ${index % 2 === 1 ? "border-b border-gray-700 border-r-0 border-l-0" : "border border-gray-400 "} border border-gray-400 border-r-[1px] border-r-gray-400 `}
                      onMouseDown={() => handleMouseDown(day.date, time)}
                      onMouseEnter={() => handleMouseEnter(day.date, time)}
                    ></td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
