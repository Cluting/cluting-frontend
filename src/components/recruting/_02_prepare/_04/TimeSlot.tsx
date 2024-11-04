import { useState, ChangeEvent } from "react";

// 3 - 면접 진행 시간대 선택
export default function TimeSlot() {
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const handleStartTimeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newStartTime = e.target.value;
    setStartTime(newStartTime);

    // 종료 시간이 시작 시간보다 빠른 경우 종료 시간을 시작 시간으로 설정
    if (endTime && newStartTime > endTime) {
      setEndTime(newStartTime);
    }
  };

  const handleEndTimeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newEndTime = e.target.value;

    // 종료 시간이 시작 시간보다 빠른지 확인
    if (newEndTime < startTime) {
      alert("종료 시간은 시작 시간보다 늦어야 합니다.");
      return;
    }
    setEndTime(newEndTime);
  };

  return (
    <div className="section-background ">
      <div className="flex gap-[150px]">
        <div className="flex items-center  gap-[14px]">
          <div className="bg-gray-100 rounded-[8px] px-3 py-[7px] text-subheadline text-gray-800">
            면접 시간
          </div>
          <div className=" text-subheadline">10.13(월)~10.17(금)</div>
        </div>

        <div className="flex items-center gap-[14px]">
          <div className="bg-gray-100 rounded-[8px] px-3 py-[7px] text-subheadline text-gray-800">
            면접 시간
          </div>
          <input
            value={startTime}
            onChange={handleStartTimeChange}
            type="time"
            className="w-[160px] input-style input-background"
          />
          <p className=" text-subheadline text-gray-600">~</p>
          <input
            value={endTime}
            onChange={handleEndTimeChange}
            type="time"
            className="w-[160px] input-style input-background"
          />
        </div>
      </div>
    </div>
  );
}
