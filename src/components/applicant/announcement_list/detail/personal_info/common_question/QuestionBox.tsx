import React, { useState } from "react";

interface QuestionBoxProps {
  question: string;
  type: string;
  index: number;
}

const QuestionBox: React.FC<QuestionBoxProps> = ({ question, type, index }) => {
  const [text, setText] = useState("");
  const [showWarning, setShowWarning] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;

    if (value.length <= 500) {
      setText(value);
      setShowWarning(false);
    } else {
      setShowWarning(true);
    }
  };

  return (
    <div>
      <div className="flex flex-col gap-3 w-full px-7 py-4 border border-[#D0D4E7] bg-[#F1F3FF] rounded-lg">
        <div className="flex items-center gap-4">
          <div className="px-3 py-2 rounded-lg bg-main-300">
            <span
              className={`text-xl font-bold font-Pretendard ${type == "공통" ? "text-main-500" : "text-main-700"} `}
            >
              {type} 질문 {index}
            </span>
          </div>
          <p className="font-semibold font-Pretendard text-gray-1100">
            {question}
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <textarea
            className="w-full min-h-52 h-full border p-5 border-[#D0D4E7] bg-white-100 rounded-lg resize-none font-Pretendard text-base font-normal leading-6 tracking-tight text-gray-1100"
            placeholder="답변을 작성해 주세요."
            value={text}
            onChange={handleChange}
          ></textarea>
          {/* 질문 별 글자수 추후 추가 필요 */}
          <span className="text-base font-normal leading-6 tracking-tight text-right font-Pretendard text-gray-1100">
            {text.length} / 500
          </span>
        </div>
      </div>
      {showWarning && (
        <span className="text-left text-[#FF3B3B] font-Pretendard font-medium text-sm leading-4 tracking-wide">
          적정 글자 수를 초과했습니다.
        </span>
      )}
    </div>
  );
};

export default QuestionBox;
