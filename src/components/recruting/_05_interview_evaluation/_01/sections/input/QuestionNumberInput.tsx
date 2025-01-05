import React, { useState } from "react";
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
  const [isActive, setIsActive] = useState(false); // 활성화 상태

  const handleBlur = () => {
    setIsActive(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 입력 값이 유효한 숫자인지 확인
    const value = e.target.value === "" ? 0 : parseInt(e.target.value, 10);
    setQuestionCounts(type, isNaN(value) ? 0 : value);
  };

  const totalQuestions = questionCounts.total || 0; // 전체 질문 개수

  return (
    <div className="flex items-center self-stretch justify-between">
      <label
        className={`text-base leading-5 tracking-tight ${
          bold ? "font-bold" : "font-medium"
        } text-gray-1100 font-Pretendard`}
      >
        {label}
      </label>
      <div className="flex flex-col w-48 gap-1">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={questionCounts[type] || 0}
            onBlur={handleBlur}
            onChange={handleChange}
            className="w-14 flex flex-center px-2 py-2 bg-white-100 border border-[#D0D4E7] rounded-md text-center text-[#8B8FA4] font-Pretendard font-semibold leading-5 tracking-tighter outline-[#5E2BE8]"
          />
          <span className="text-base font-semibold leading-5 tracking-tighter font-Pretendard text-gray-1100 ">
            개
          </span>
        </div>

        {/* 에러 메시지 1 : 개수를 입력하지 않았을 경우 */}
        {type === "total" && isActive && totalQuestions === 0 && (
          <span className="text-xs font-Pretendard font-medium text-[#FF3B3B] text-left">
            필수 입력 사항입니다.
          </span>
        )}

        {/* 에러 메시지 2 : 질문 개수가 일치하지 않을 경우 */}
        {totalQuestions !==
          (questionCounts.common || 0) +
            (questionCounts.group || 0) +
            (questionCounts.individual || 0) && (
          <span className="text-xs font-Pretendard font-medium text-[#FF3B3B] text-left">
            총 질문 개수와 총합을 통일해 주세요.
          </span>
        )}
      </div>
    </div>
  );
};

export default QuestionNumberInput;
