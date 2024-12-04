import Headline from "./headline/Headline";

export default function InterviewQuestionCountSection() {
  return (
    <div className="flex flex-col gap-3">
      <Headline
        essential={true}
        title="면접 질문 개수 설정하기"
        hint="면접 때 지원자에게 몇 개의 질문을 할 지 정해주세요."
      />
    </div>
  );
}
