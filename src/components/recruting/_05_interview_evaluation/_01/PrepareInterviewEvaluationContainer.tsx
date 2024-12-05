import CommonInterviewQuestionsSection from "./sections/CommonInterviewQuestionsSection";
import GroupInterviewQuestionsSection from "./sections/GroupInterviewQuestionsSection";
import InterviewQuestionCountSection from "./sections/InterviewQuestionCountSection";

// 5-2 면접 평가 준비하기(컨테이너)
export default function PrepareInterviewEvaluationContainer() {
  return (
    // Conflict :: 다인님 부분과 컨플릭트 날 예정
    <div className="flex flex-col gap-12">
      <InterviewQuestionCountSection />
      <CommonInterviewQuestionsSection />
      <GroupInterviewQuestionsSection />
    </div>
  );
}
