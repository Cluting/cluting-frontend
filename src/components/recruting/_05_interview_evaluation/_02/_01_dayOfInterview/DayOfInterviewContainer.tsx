import { useState } from "react";
import { useInterviewStore } from "../../../../../store/useStore";

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

  return (
    <div className="w-full ">
      <section className="flex text-title1 mt-8 mb-5">
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
    </div>
  );
}
