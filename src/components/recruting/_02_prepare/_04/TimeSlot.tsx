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
    if (newStartTime >= endTime && endTime !== "") {
      setEndTime(newStartTime);
    }
  };

  const handleEndTimeChange = (newEndTime: string) => {
    if (newEndTime <= startTime) {
      alert("종료 시간은 시작 시간보다 늦어야 합니다.");
      return;
    }
    setEndTime(newEndTime);
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

  // 적용하기 버튼 클릭 시 호출될 함수
  const handleApplyTimeSettings = () => {
    if (!startTime || !endTime) {
      alert("시작 시간과 종료 시간을 모두 선택해 주세요.");
      return;
    }

    setInterviewStartTime(new Date(`1970-01-01T${startTime}:00`));
    setInterviewEndTime(new Date(`1970-01-01T${endTime}:00`));
    applyTimeSettings(); // isTimeSet을 true로 설정

    // 캡션을 빈 문자열로 설정하여 캡션을 숨김
    setCaption("");
  };

  return (
    <div className="relative section-background">
      {showCaption && (
        <p className="absolute top-[0px] right-[300px] text-main-100 text-caption2">
          {caption}
        </p>
      )}
      <div className="flex gap-[150px]">
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
              className="button-main-bg py-[7px] px-[24px] rounded-[12px]"
            >
              적용하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
