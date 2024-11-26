interface ScheduleTopSectionProps {
  schedule: string;
  setSchedule: (value: string) => void;
}

export default function ScheduleTopSection({
  schedule,
  setSchedule
}: ScheduleTopSectionProps) {
  return (
    <div className="flex h-[38px] gap-[17px] w-full text-subheadline">
      <div
        onClick={() => setSchedule("당일")}
        className={`w-full flex-center rounded-[6px] ${
          schedule === "당일"
            ? "bg-gray-500 text-white-100"
            : "bg-[#F1F1F1]  text-[#5C6067]"
        } border border-[#D9D9D9] cursor-pointer`}
      >
        면접 당일
      </div>
      <div
        onClick={() => setSchedule("이후")}
        className={`w-full flex-center rounded-[6px] ${
          schedule === "이후"
            ? "bg-gray-500 text-white-100"
            : "bg-[#F1F1F1] text-[#5C6067]"
        } border border-[#D9D9D9] cursor-pointer`}
      >
        면접 이후
      </div>
    </div>
  );
}
