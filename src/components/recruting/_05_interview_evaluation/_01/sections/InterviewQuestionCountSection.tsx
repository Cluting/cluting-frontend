import Headline from "./headline/Headline";
import QuestionInput from "./input/QuestionInput";

export default function InterviewQuestionCountSection() {
  const time = 30; // 추후 api로 받을 값

  return (
    <section className="flex flex-col gap-3">
      <Headline
        essential={true}
        title="면접 질문 개수 설정하기"
        hint="면접 때 지원자에게 몇 개의 질문을 할 지 정해주세요."
      />
      <div className="flex gap-2 py-6 px-7 rounded-xl bg-[#E5E8FB]">
        <span className="font-semibold leading-5 tracking-tight text-gray-1300 font-Pretendard text-subheadline">
          면접 시간은 한 타임 당 '{time}분'으로 설정하셨습니다. '{time}분'내에
          각 지원자에게 할 질문의 개수를 정해 주세요.
        </span>
      </div>
      <div className="px-10 py-8 rounded-2xl bg-white-100 border border-[#D0D4E7]">
        <div className="flex flex-col w-48 gap-5">
          <QuestionInput label="전체 질문 개수" type="total" bold={true} />
          <QuestionInput label="공통 질문" type="common" />
          <QuestionInput label="그룹별 질문" type="group" />
          <QuestionInput label="지원자 개인 질문" type="individual" />
        </div>
      </div>
    </section>
  );
}
