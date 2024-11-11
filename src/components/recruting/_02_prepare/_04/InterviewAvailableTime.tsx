import { useState } from "react";

const days = [
  { date: "10월 13일", dayOfWeek: "월" },
  { date: "10월 14일", dayOfWeek: "화" },
  { date: "10월 15일", dayOfWeek: "수" },
  { date: "10월 16일", dayOfWeek: "목" },
  { date: "10월 17일", dayOfWeek: "금" }
];

const generateTimes = () => {
  const times = [];
  for (let hour = 9; hour <= 17; hour++) {
    times.push({
      display: `${String(hour).padStart(2, "0")}:00`,
      value: `${String(hour).padStart(2, "0")}:00`
    });
    times.push({ display: "", value: `${String(hour).padStart(2, "0")}:30` });
  }
  return times;
};

const times = generateTimes();

export default function InterviewAvailableTime() {
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
        className="relative border border-gray-300 custom-shadow rounded-[12px] pt-[27px] px-4"
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {/* 요일, 날짜 렌더링 (표 밖) */}
        <div className="relative flex left-[92px] gap-[7px] ">
          {days.map((day) => (
            <div
              key={day.date}
              className="flex flex-col items-center p-2 w-[77px] bg-gray-100 rounded-[8px]"
            >
              <p className="text-caption2 text-gray-900">{day.date}</p>
              <p className="text-subheadline text-gray-900">{day.dayOfWeek}</p>
            </div>
          ))}
        </div>

        <table
          className="w-[512px] text-center border-collapse table-fixed mb-3"
          style={{ borderSpacing: "9px" }} // 각 열 사이에 9px 간격 추가
        >
          <thead>
            <tr>
              <th className="p-2 border-b border-gray-300 w-[77.85px]"></th>
              {days.map((day) => (
                <th
                  key={day.date}
                  className="p-2 border-b border-gray-300 "
                  style={{ width: "77.85px" }} // 각 열 너비 정확히 77.85px로 설정
                >
                  {/* 날짜 및 요일 */}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {times.map((time, index) => (
              <tr
                key={time.value}
                className={index % 2 === 1 ? "border-b border-gray-500" : ""}
              >
                <td
                  className="border-r text-caption2 text-gray-900"
                  style={{ width: "77.85px" }}
                >
                  {time.display}
                </td>
                {days.map((day) => {
                  const key = `${day.date}-${time.value}`;
                  return (
                    <td
                      key={key}
                      className={`p-2 border cursor-pointer h-[20px] ${
                        selectedSlots[key] ? "bg-main-100" : "bg-main-300"
                      } ${index % 2 === 1 ? "border-b border-gray-700 border-r-0 border-l-0" : "border border-gray-400 "} border border-gray-400 border-r-[1px] border-r-gray-400 `}
                      style={{ width: "77.85px" }} // 각 셀 너비 설정
                      onMouseDown={() => handleMouseDown(day.date, time.value)}
                      onMouseEnter={() =>
                        handleMouseEnter(day.date, time.value)
                      }
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
