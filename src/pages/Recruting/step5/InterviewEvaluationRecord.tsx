//5 - 면접 평가하기

import InterviewEvaluationRecordContainer from "../../../components/recruting/_05_interview_evaluation/interview_evaluation_record/InterviewEvaluationRecordContainer";
import Sidemenu from "../../../components/recruting/common/Sidemenu";

export default function InterviewEvaluationRecord() {
  return (
    <div className="flex justify-center pt-6 bg-gray-100 h-full">
      <Sidemenu />
      <div className="w-[1153px] h-screen pl-8 mb-[143px]">
        <InterviewEvaluationRecordContainer />
      </div>
    </div>
  );
}
