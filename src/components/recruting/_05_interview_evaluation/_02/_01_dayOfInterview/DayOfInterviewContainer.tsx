import { useState } from "react";
import { useInterviewStore } from "../../../../../store/useStore";
import InterviewTable from "./InterviewTable";
import ScheduleTopSection from "../ScheduleTopSection";
import TopSection from "../../common/TopSection";
import Sidemenu from "../../../common/Sidemenu";

export default function DayOfInterviewContainer() {
  const { interviewStartDate, interviewEndDate } = useInterviewStore(); //면접 기간
  const [currentDate, setCurrentDate] = useState<Date>(
    new Date(interviewStartDate)
  );

  // 날짜 이전 버튼 핸들러
  const goToPreviousDate = () => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      newDate.setDate(newDate.getDate() - 1);
      return newDate;
    });
  };

  // 날짜 다음 버튼 핸들러
  const goToNextDate = () => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      newDate.setDate(newDate.getDate() + 1);
      return newDate;
    });
  };

  const [schedule, setSchedule] = useState("당일");

  return (
    <div className="flex justify-center pt-6 bg-gray-100">
      <Sidemenu />
      <div className="flex flex-col gap-7 w-[1016px] pl-8 mb-[143px]">
        <TopSection />
        <ScheduleTopSection schedule={schedule} setSchedule={setSchedule} />
        <section className="w-fit flex text-title3 mt-8 mb-5 bg-white-100 text-gray-1100 rounded-xl py-[14px] px-[26px]">
          {/* 이전 날짜 버튼 */}
          {currentDate > new Date(interviewStartDate) && (
            <button type="button" onClick={goToPreviousDate}>
              <img
                src="/assets/ic-prevDate.svg"
                alt="이전 날짜"
                className="w-[9px] mr-5"
              />
            </button>
          )}
          {/* 현재 날짜 표시 */}
          <p>
            {currentDate.toLocaleDateString("ko-KR", {
              month: "long", // '11' -> '11월'
              day: "numeric", // '6'
              weekday: "long" // '월' -> '월요일'
            })}
          </p>
          {/* 다음 날짜 버튼 */}
          {currentDate < new Date(interviewEndDate) && (
            <button type="button" onClick={goToNextDate}>
              <img
                src="/assets/ic-nextDate.svg"
                alt="다음 날짜"
                className="w-[9px] ml-5"
              />
            </button>
          )}
        </section>
        <InterviewTable />
      </div>
    </div>
  );
}
