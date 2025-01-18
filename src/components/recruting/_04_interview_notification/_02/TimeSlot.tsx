//시간대 표시 컴포넌트
import { memo } from "react";

interface TimeSlotProps {
  time: string;
  interviewer: string[];
  isComplete: boolean;
}

export const TimeSlot = memo(
  ({ time, interviewer, isComplete }: TimeSlotProps) => (
    <div className="grid grid-cols-[200px_120px] items-start">
      <div className="text-gray-800 text-caption1">
        {interviewer.map((name, index) => (
          <span key={name}>
            {name}
            {index !== interviewer.length - 1 && " / "}
          </span>
        ))}
      </div>
      <div>
        <div
          className={`flex-center w-[100px] h-[35px] border rounded-[6px] text-caption3 ${
            isComplete
              ? "bg-main-300 border-main-400 text-main-100"
              : "bg-gray-100 border-gray-200 text-gray-500"
          }`}
        >
          {time}
        </div>
      </div>
    </div>
  )
);

TimeSlot.displayName = "TimeSlot";
