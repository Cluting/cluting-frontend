import { useState } from "react";
import DayOfInterviewContainer from "./_01_dayOfInterview/DayOfInterviewContainer";
import AfterInterviewContainer from "./_02_afterInterview/AfterInterviewContainer";
import ScheduleTopSection from "./ScheduleTopSection";

// 5-2 면접 평가하기(컨테이너)
export default function InterviewEvaluationContainer() {
  const [schedule, setSchedule] = useState("당일");

  return (
    <div>
      <ScheduleTopSection schedule={schedule} setSchedule={setSchedule} />
      {schedule === "당일" && <DayOfInterviewContainer />}
      {schedule === "이후" && <AfterInterviewContainer />}
    </div>
  );
}
