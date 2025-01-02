import { useMemo, useState } from "react";
import { useInterviewStore } from "../../../../store/useStore";

// 인터뷰 날짜 타입 정의
interface Day {
  date: string;
  dayOfWeek: string;
}

//날짜 새성 함수
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

// 시간대 생성 함수
const generateTimeSlots = (start: Date, end: Date): string[] => {
  const times: string[] = [];
  const current = new Date(start);
  const endTime = new Date(end);
  endTime.setMinutes(endTime.getMinutes() + 30); // 종료 시간을 30분 연장

  while (current <= endTime) {
    const hours = current.getHours();
    const minutes = current.getMinutes();
    const timeString = `${hours % 12 || 12}:${minutes === 0 ? "00" : "30"} ${
      hours < 12 ? "AM" : "PM"
    }`;

    times.push(timeString);

    // 30분 증가
    current.setMinutes(current.getMinutes() + 30);
  }

  return times;
};
export default function InterviewAvailableTime() {
  const {
    isTimeSet,
    interviewStartTime,
    interviewEndTime,
    interviewStartDate,
    interviewEndDate
  } = useInterviewStore();
  const days = generateDaysArray(interviewStartDate, interviewEndDate);
  // 하드코딩된 시간 배열
  const times = generateTimeSlots(interviewStartTime, interviewEndTime);

  const [selectedSlots, setSelectedSlots] = useState<{
    [key: string]: boolean;
  }>({});
  const [isDragging, setIsDragging] = useState(false);

  const [isSelectTime, setIsSelectTime] = useState(false);
  const handleButtonClick = () => {
    setIsSelectTime(!isSelectTime);
  };

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

  const hasSelectedSlots = useMemo(() => {
    return Object.values(selectedSlots).some((value) => value);
  }, [selectedSlots]);

  return (
    <div className="section-background flex items-center flex-wrap space-y-4 ">
      {/* 시간표 렌더링 (표 안) */}
      <section
        className="overflow-auto scrollbar-hidden w-[940px] h-auto relative border border-gray-300 rounded-[12px] py-[27px] px-4"
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
        {isTimeSet && (
          <table className="animate-slide-down text-center table-layout:fixed table-fixed mb-3 border-separate  border-spacing-x-2">
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
                  <td className="user-select-none text-caption2 text-gray-900 w-[77.85px] min-w-[77.85px] max-w-[77.85px]">
                    {index % 2 === 0 ? time : ""}
                  </td>
                  {days.map((day) => {
                    const key = `${day.date}-${time}`;
                    return (
                      <td
                        key={key}
                        className={`
                          p-2 
                          cursor-pointer 
                          h-[20px] w-[77.85px] min-w-[77.85px] max-w-[77.85px] 
                          ${selectedSlots[key] ? "bg-main-100" : "bg-main-300"}
                          ${
                            index % 2 === 1
                              ? "border-t-0 border-r-0 border-l-0 border-b-[2px] border-gray-700"
                              : "border-t border-r-0 border-l-0 border-b border-gray-400"
                          }
                        `}
                        onMouseDown={() => handleMouseDown(day.date, time)}
                        onMouseEnter={() => handleMouseEnter(day.date, time)}
                      ></td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
      <button
        onClick={handleButtonClick}
        disabled={!hasSelectedSlots}
        className={`rounded-lg text-subheadline w-fit py-2 px-6 
        ${
          isSelectTime
            ? "bg-main-300 text-main-100 border border-main-400"
            : "bg-gray-300 text-white-100 hover:bg-main-100 hover:text-white-100"
        }
        ${hasSelectedSlots && !isSelectTime && "bg-main-500 text-white-100"}
          `}
      >
        {isSelectTime ? "수정하기" : "선택 완료"}
      </button>
    </div>
  );
}
