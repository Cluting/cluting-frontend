import { Link } from "react-router-dom";

interface ScheduleTopSectionProps {
  schedule: string;
  setSchedule: (value: string) => void;
}

export default function ScheduleTopSection({
  schedule,
  setSchedule
}: ScheduleTopSectionProps) {
  return (
    <div className="flex gap-[17px] w-full text-subheadline bg-white-100 rounded-[7px] px-[18.5px] py-[10px]">
      <Link
        to="/recruting/05_interview_evaluation/interview/day"
        onClick={() => setSchedule("당일")}
        className={`w-full flex-center rounded-[10.63px] py-[14.5px] ${
          schedule === "당일"
            ? "bg-main-400 text-main-100"
            : "bg-main-300 text-gray-800"
        } cursor-pointer`}
      >
        면접 당일
      </Link>
      <Link
        to="/recruting/05_interview_evaluation/interview/after/before"
        onClick={() => setSchedule("이후")}
        className={`w-full flex-center rounded-[10.63px] py-[14.5px] ${
          schedule === "이후"
            ? "bg-main-400 text-main-100"
            : "bg-main-300 text-gray-800"
        } cursor-pointer`}
      >
        면접 이후
      </Link>
    </div>
  );
}
