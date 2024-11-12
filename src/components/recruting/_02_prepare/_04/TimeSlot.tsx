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
    setInterviewEndTime
  } = useInterviewStore();

  const [startTime, setStartTime] = useState(""); // 초기값을 빈 문자열로 설정
  const [endTime, setEndTime] = useState("");
  const [caption, setCaption] = useState<string | null>(
    "하루 중 면접 최초 시작 시간을 선택해 주세요."
  );
  const [showCaption, setShowCaption] = useState(false);
  const handleStartTimeChange = (newStartTime: string) => {
    setStartTime(newStartTime);
    // setInterviewStartTime(new Date(`1970-01-01T${newStartTime}:00`)); // 시작 시간 설정

    // 새로운 시작 시간이 현재 종료 시간보다 같거나 크면 종료 시간 갱신
    if (newStartTime >= endTime && endTime !== "") {
      setEndTime(newStartTime); // 종료 시간을 시작 시간과 같거나 더 늦은 시간으로 설정
      setInterviewEndTime(new Date(`1970-01-01T${newStartTime}:00`));
    }
  };

  const handleEndTimeChange = (newEndTime: string) => {
    // 종료 시간이 시작 시간보다 빠르면 종료 시간 갱신을 막음
    if (newEndTime <= startTime) {
      alert("종료 시간은 시작 시간보다 늦어야 합니다.");
      return;
    }

    setEndTime(newEndTime);
    setInterviewEndTime(new Date(`1970-01-01T${newEndTime}:00`));
  };

  // 시간 옵션 생성 함수
  const generateTimeOptions = (): string[] => {
    const options: string[] = [];
    for (let hour = 7; hour <= 20; hour++) {
      const time = `${hour < 10 ? `0${hour}` : hour}:00`;
      options.push(time);
    }
    return options;
  };

  return (
    <div className="relative section-background">
      {showCaption && (
        <p className="absolute top-[11px] right-[300px] text-main-100 text-caption2">
          {caption}
        </p>
      )}
      <div className="flex gap-[150px]">
        <div className="flex items-center gap-[14px]">
          <div className="bg-gray-100 rounded-[8px] px-3 py-[7px] text-subheadline text-gray-800">
            면접 기간
          </div>
          <div className="text-subheadline">
            {" "}
            {interviewStartDate && interviewEndDate
              ? `${formatDateWithDay(interviewStartDate)}~${formatDateWithDay(interviewEndDate)}`
              : "기간을 설정해 주세요"}
          </div>
        </div>

        <div className="flex items-center gap-[14px]">
          <div className="bg-gray-100 rounded-[8px] px-3 py-[7px] text-subheadline text-gray-800">
            면접 시간
          </div>
          <CustomSelect
            value={startTime}
            onChange={handleStartTimeChange} // onChange는 string 값을 받음
            options={generateTimeOptions()} // options는 string[] 배열
            placeholder="시간대 선택"
          />

          <p className="text-subheadline text-gray-600">~</p>
          <CustomSelect
            value={endTime}
            onChange={handleEndTimeChange} // onChange는 string 값을 받음
            options={generateTimeOptions()} // options는 string[] 배열
            placeholder="시간대 선택"
          />
        </div>
      </div>
    </div>
  );
}
