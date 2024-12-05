import React from "react";
import { useQuestionStore } from "../../../../../../store/recruiting/_05_interview_evaluation/questionStore";
import { QuestionCounts } from "../../../../../../store/recruiting/_05_interview_evaluation/questionStore";

interface QuestionNumberInputProps {
  label: string;
  type: keyof QuestionCounts; // 질문 종류 키
  bold?: boolean;
}

const QuestionNumberInput: React.FC<QuestionNumberInputProps> = ({
  label,
  type,
  bold
}) => {
  const { questionCounts, setQuestionCounts } = useQuestionStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 입력 값이 유효한 숫자인지 확인
    const value = e.target.value === "" ? 0 : parseInt(e.target.value, 10);
    setQuestionCounts(type, isNaN(value) ? 0 : value);
  };

  return (
    <div className="flex items-center self-stretch justify-between">
      <label
        className={`text-base leading-5 tracking-tight ${bold ? "font-bold" : "font-medium"} text-gray-1100 font-Pretendard`}
      >
        {label}
      </label>
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={questionCounts[type] || 0}
          onChange={handleChange}
          className="w-14 flex flex-center px-2 py-2 bg-white-100 border border-[#D0D4E7] rounded-md text-center text-[#8B8FA4] font-Pretendard font-semibold leading-5 tracking-tighter"
        />
        <span className="text-base font-semibold leading-5 tracking-tighter font-Pretendard text-gray-1100">
          개
        </span>
      </div>
    </div>
  );
};

export default QuestionNumberInput;
