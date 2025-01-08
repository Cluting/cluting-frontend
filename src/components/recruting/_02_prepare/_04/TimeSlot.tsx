import { useState } from "react";
import { useInterviewStore } from "../../../../store/useStore";
import CustomSelect from "./CustomSelect";

function formatDateWithDay(date: Date | null): string {
  if (!date) return "";

  const days = ["일", "월", "화", "수", "목", "금", "토"];
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const dayOfWeek = days[date.getDay()];

  return `${month}.${day}(${dayOfWeek})`;
}

// 3 - 면접 진행 시간대 선택
export default function TimeSlot() {
  const {
    interviewStartDate,
    interviewEndDate,
    setInterviewStartTime,
    setInterviewEndTime,
    applyTimeSettings
  } = useInterviewStore();

  const [startTime, setStartTime] = useState(""); // 초기값을 빈 문자열로 설정
  const [endTime, setEndTime] = useState("");
  const [caption, setCaption] = useState<string | null>("");
  const [showCaption, setShowCaption] = useState(false);

  const handleStartTimeChange = (newStartTime: string) => {
    setStartTime(newStartTime);
    const startIndex = generateTimeOptions().indexOf(newStartTime);
    const endIndex = generateTimeOptions().indexOf(endTime);
    if (startIndex >= endIndex && endTime !== "") {
      setEndTime(newStartTime);
    }
  };

  const handleEndTimeChange = (newEndTime: string) => {
    const startIndex = generateTimeOptions().indexOf(startTime);
    const endIndex = generateTimeOptions().indexOf(newEndTime);
    if (endIndex <= startIndex && endIndex !== 0) {
      alert("종료 시간은 시작 시간보다 늦어야 합니다.");
      return;
    }
    setEndTime(newEndTime);
  };

  // handleApplyTimeSettings 함수 수정
  const handleApplyTimeSettings = () => {
    if (!startTime || !endTime) {
      alert("시작 시간과 종료 시간을 모두 선택해 주세요.");
      return;
    }

    const [startHour, startMinute, startAmPm] = startTime.split(/[:\s]/);
    const [endHour, endMinute, endAmPm] = endTime.split(/[:\s]/);

    const startDate = new Date(
      1970,
      0,
      1,
      parseInt(startHour) + (startAmPm === "PM" && startHour !== "12" ? 12 : 0),
      parseInt(startMinute)
    );
    const endDate = new Date(
      1970,
      0,
      1,
      parseInt(endHour) + (endAmPm === "PM" && endHour !== "12" ? 12 : 0),
      parseInt(endMinute)
    );

    setInterviewStartTime(startDate);
    setInterviewEndTime(endDate);
    applyTimeSettings();
    setCaption("");
  };

  // 시간 옵션 생성 함수
  const generateTimeOptions = (): string[] => {
    const options: string[] = [];
    const interval = 60;
    const totalMinutes = 24 * 60;

    for (let minutes = 0; minutes < totalMinutes; minutes += interval) {
      const hour = Math.floor(minutes / 60);
      const minute = minutes % 60;
      const ampm = hour < 12 ? "AM" : "PM";
      const hour12 = hour % 12 || 12;
      const time = `${hour12}:${minute.toString().padStart(2, "0")} ${ampm}`;
      options.push(time);
    }
    return options;
  };

  return (
    <div className="relative section-background">
      {showCaption && (
        <p className="absolute top-[0px] right-[300px] text-main-100 text-caption2">
          {caption}
        </p>
      )}
      <div className="flex justify-between">
        <div className="flex items-center gap-[14px]">
          <div className="bg-gray-100 rounded-[8px] px-3 py-[7px] text-subheadline text-gray-800">
            면접 기간
          </div>
          <div className="text-subheadline">
            {interviewStartDate && interviewEndDate
              ? `${formatDateWithDay(interviewStartDate)}~${formatDateWithDay(interviewEndDate)}`
              : "기간을 설정해 주세요"}
          </div>
        </div>

        <div className="flex flex-col">
          {caption && <p className="text-caption3 text-main-100">{caption}</p>}

          <div className="flex items-center gap-[14px]">
            <div className="bg-gray-100 rounded-[8px] px-3 py-[7px] text-subheadline text-gray-800">
              면접 시간
            </div>

            <CustomSelect
              value={startTime}
              onChange={handleStartTimeChange}
              options={generateTimeOptions()}
              placeholder="시간대 선택"
              onFocus={() =>
                setCaption("하루 중 면접 최초 시작 시간을 선택해 주세요.")
              }
            />

            <p className="text-subheadline text-gray-600">~</p>
            <CustomSelect
              value={endTime}
              onChange={handleEndTimeChange}
              options={generateTimeOptions()}
              placeholder="시간대 선택"
              onFocus={() =>
                setCaption("하루 중 면접의 마지막 시작 시간을 선택해 주세요.")
              }
            />
            <button
              onClick={handleApplyTimeSettings}
              className={` py-[7px] px-[24px] rounded-[12px] text-white-100  ${
                interviewStartDate && interviewEndDate && startTime && endTime
                  ? " button-main-bg cursor-pointer"
                  : "bg-gray-500 cursor-not-allowed"
              }`}
            >
              적용하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
