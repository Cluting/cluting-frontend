//날짜 네비게이션 컴포넌트
import { formatDate } from "./utils/date";

interface DateNavigatorProps {
  currentDate: Date;
  interviewStartDate: Date;
  interviewEndDate: Date;
  onChangeDate: (direction: "prev" | "next") => void;
  error?: ValidationError;
}

export const DateNavigator = ({
  currentDate,
  interviewStartDate,
  interviewEndDate,
  onChangeDate,
  error
}: DateNavigatorProps) => (
  <div>
    <div
      className={`flex-center gap-2 px-[15px] w-[334px] h-[35px] bg-gray-50 border rounded-[6px] ${
        error?.type === "INCOMPLETE_DATE"
          ? "border-red-100"
          : "border-[#E9E9E9]"
      }`}
    >
      <button
        onClick={() => onChangeDate("prev")}
        disabled={new Date(currentDate) <= new Date(interviewStartDate)}
        className="px-2"
      >
        ←
      </button>
      {formatDate(currentDate)}
      <button
        onClick={() => onChangeDate("next")}
        disabled={new Date(currentDate) >= new Date(interviewEndDate)}
        className="px-2"
      >
        →
      </button>
    </div>
    {error?.type === "INCOMPLETE_DATE" && (
      <div className="mt-[5px] text-red-100 text-sm text-left">
        {error.message}
      </div>
    )}
  </div>
);
