import QuestionBox from "../common_question/QuestionBox";
import ToolTip from "../common_question/Tooltip";

export default function CommonQuestionsPage() {
  const questions = [
    "팀 내 갈등이 업무 진행에 영향을 미칠 때, 어떤 방식으로 갈등을 조율하고 팀워크를 유지할 계획인가요?",
    "공통질문입니다. 팀 플레이 상황에서 만약 ~~~한 갈등상황이 생긴다면 어떻게 대처하시겠습니까?"
  ];
  return (
    <div className="flex flex-col w-full gap-4">
      {/* Header */}
      <h2 className="text-xl font-bold leading-7 tracking-wide text-left font-Pretendard text-gray-1100">
        공통 질문
      </h2>
      <ToolTip text="공통 질문의 경우, 글자 수 제약에 유의해 주시기 바랍니다." />
      <div className="w-full py-10 rounded-xl bg-white-100 px-7">
        <div className="flex flex-col gap-10">
          {questions.map((question, index) => (
            <QuestionBox
              key={index}
              question={question}
              type="공통"
              index={index + 1}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
