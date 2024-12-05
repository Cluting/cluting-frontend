import Headline from "./headline/Headline";
import { useQuestionStore } from "../../../../../store/recruiting/_05_interview_evaluation/questionStore";
import React, { useState } from "react";
import QuestionInput from "./input/QuestionInput";
import AddButton from "./button/AddButton";

const CommonInterviewQuestionsSection: React.FC = () => {
  const { questionCounts, setCheckedCount } = useQuestionStore();
  const [questions, setQuestions] = useState<
    { value: string; checked: boolean }[]
  >([{ value: "", checked: false }]);

  const handleAddQuestion = () => {
    setQuestions((prev) => [...prev, { value: "", checked: false }]);
  };

  const handleQuestionChange = (index: number, value: string) => {
    setQuestions((prev) =>
      prev.map((q, i) => (i === index ? { ...q, value } : q))
    );
  };

  const handleCheckChange = (index: number, checked: boolean) => {
    setQuestions((prev) =>
      prev.map((q, i) => (i === index ? { ...q, checked } : q))
    );

    const checkedCount = questions.filter((q, i) =>
      i === index ? checked : q.checked
    ).length;
    setCheckedCount(checkedCount);
  };

  const handleRemoveQuestion = (index: number) => {
    setQuestions((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <section className="flex flex-col gap-3">
      <Headline
        essential={true}
        title="공통 면접 질문 만들기"
        hint="각 그룹별 질문을 작성한 뒤, 2개를 선택해 주세요."
      />

      <div className="flex flex-col border gap-5 border-[#E5E8FB] bg-white-100 rounded-xl p-8">
        <div className="flex flex-col gap-6">
          {questions.map((q, index) => (
            <QuestionInput
              key={index}
              number={index + 1}
              value={q.value}
              checked={q.checked}
              isError={
                questions.filter((q) => q.checked).length !==
                questionCounts.common
              }
              onChange={(value: string) => handleQuestionChange(index, value)}
              onCheck={(checked: boolean) => handleCheckChange(index, checked)}
              onRemove={() => handleRemoveQuestion(index)} // 빼기 버튼 핸들러
            />
          ))}
          <AddButton onClick={handleAddQuestion} label="면접 질문 추가하기" />
        </div>

        {/* 에러케이스 처리 */}
        {questions.filter((q) => q.checked).length !==
          questionCounts.common && (
          <span className="font-Pretendard font-medium text-xs text-left text-[#FF3B3B]">
            앞에서 정한 공통 질문 개수만큼 선택해 주세요.
          </span>
        )}
      </div>
    </section>
  );
};

export default CommonInterviewQuestionsSection;
