import QuestionBox from "../common_question/QuestionBox";
import ToolTip from "../common_question/Tooltip";

export default function PartQuestionsPage() {
  const questions = [
    "디자이너, 개발자와 협업해 본 경험에 대해서 자세히 기술해 주세요.",
    "기획자로서 필요하다고 생각되는 자질에 대해서 본인의 생각을 적어주세요."
  ];
  return (
    <div className="flex flex-col w-full gap-4">
      {/* Header */}
      <h2 className="text-xl font-bold leading-7 tracking-wide text-left font-Pretendard text-gray-1100">
        "기획" 질문
      </h2>
      <ToolTip text="'기획' 질문의 경우, 글자 수 제약에 유의해 주시기 바랍니다." />
      <div className="w-full py-10 rounded-xl bg-white-100 px-7">
        <div className="flex flex-col gap-10">
          {questions.map((question, index) => (
            <QuestionBox
              key={index}
              question={question}
              type="기획"
              index={index + 1}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
