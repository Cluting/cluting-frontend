import { useState } from "react";
import Question from "./Question";

export default function IndividualQuestionWindow() {
  const [questions, setQuestions] = useState<
    { id: number; checked: boolean }[]
  >([]);
  const [nextId, setNextId] = useState(1); // 다음 ID 값
  const [questionNumber, setQuestionNumber] = useState(2);

  // 질문 추가
  const handleAddQuestion = () => {
    setQuestions((prev) => [...prev, { id: nextId, checked: false }]);
    setNextId((prev) => prev + 1);
  };

  // 질문 삭제
  const handleRemoveQuestion = (id: number) => {
    setQuestions((prev) => prev.filter((question) => question.id !== id));
  };

  // 질문 체크 상태
  const handleToggleCheckbox = (id: number) => {
    const selectedCount = questions.filter((q) => q.checked).length;

    setQuestions((prev) =>
      prev.map((question) =>
        question.id === id
          ? {
              ...question,
              checked: !question.checked && selectedCount < questionNumber
            }
          : question
      )
    );
  };

  return (
    <div className="absolute top-[90px] right-[-420px] z-50 w-[386px] p-[17px] bg-gray-50 rounded-lg border border-gray-200 custom-shadow">
      <div className="flex items-center bg-gray-100 rounded-[7px]  py-[15px] px-[55px] flex-center">
        <p className="text-gray-800 font-semibold text-[15.71px]">총점 평균</p>
        <p className="font-bold text-[18px] ml-1">{"89.5점"}</p>
        <p className="text-gray-800 font-semibold text-[15.71px] ml-1">
          /100점
        </p>

        <p className="ml-4 text-[15px] text-[#5B5151] font-semibold">
          서류 1위
        </p>
      </div>

      <div className="flex items-center my-4">
        <div className="py-[5px] px-[18px] mr-[10px] rounded-[5.29px] border border-gray-200 ">
          총 {questionNumber}개
        </div>
        <div className="tooltip">
          개인 질문 '{questionNumber}개'를 선택해 주세요
        </div>
      </div>

      <section>
        {questions.map((question) => (
          <Question
            key={question.id}
            id={question.id}
            checked={question.checked}
            onToggle={handleToggleCheckbox}
            onRemove={() => handleRemoveQuestion(question.id)}
          />
        ))}
      </section>

      <button
        onClick={handleAddQuestion}
        className="my-4 button-main-light flex-center px-[100px] py-4 rounded-lg text-callout "
      >
        <img src="/assets/ic-plus.svg" className="mr-1" /> 개인 질문 추가하기
      </button>
      <div className="bg-gray-100 rounded-xl py-[25px] px-[29px] text-gray-1300 text-subheadline mb-[34px]">
        개인 질문의 최종 선택은 함께 평가를 진행하는 <br />
        운영진과 논의 후 결정해 주세요
      </div>
      <button className="button-main-bg hover:bg-main-500 py-4 px-[56px] text-body rounded-[11px]">
        선택 완료
      </button>
    </div>
  );
}
