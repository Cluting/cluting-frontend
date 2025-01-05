//5 - 리크루팅 : 면접 평가하기 단계 (페이지)

import PrepareInterviewEvaluationContainer from "../../../components/recruting/_05_interview_evaluation/_01/PrepareInterviewEvaluationContainer";
import TopSection from "../../../components/recruting/_05_interview_evaluation/common/TopSection";
import Sidemenu from "../../../components/recruting/common/Sidemenu";

export default function InterviewPrep() {
  return (
    <div className="flex justify-center pt-6 bg-gray-100">
      <Sidemenu />
      <div className="flex flex-col gap-7 w-[1016px] pl-8 mb-[143px]">
        <TopSection />
        <PrepareInterviewEvaluationContainer />
      </div>
    </div>
  );
}
