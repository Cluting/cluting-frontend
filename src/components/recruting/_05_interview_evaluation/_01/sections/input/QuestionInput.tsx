import React from "react";
import CheckboxIcon from "./CheckboxIcon";

interface QuestionInputProps {
  number: number; // 질문 번호
  value: string; // 질문 내용
  checked: boolean; // 체크 상태
  isError?: boolean;
  onChange: (value: string) => void; // 질문 내용 변경
  onCheck: (checked: boolean) => void; // 체크박스 변경
  onRemove: () => void; // 삭제 핸들러
}

const QuestionInput: React.FC<QuestionInputProps> = ({
  number,
  value,
  checked,
  isError,
  onChange,
  onCheck,
  onRemove
}) => {
  return (
    <div className="flex gap-6">
      <div className="flex items-center justify-between bg-[#F1F3FF] border border-[#B9BED3] rounded-[12px] p-5 w-full ">
        <div className="flex rounded-full w-7 h-7 flex-center bg-main-400">
          <span className="font-Pretendard font-bold text-base text-[#5E2BE8] leading-4">
            {number}
          </span>
        </div>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="질문을 작성해 주세요."
          className={`w-[46rem] px-4 py-2 border rounded-lg bg-white-100 outline-[#5E2BE8] ${isError && !checked ? "border-red-100" : "border-[#D0D4E7]"}`}
        />
        <button onClick={onRemove} className="px-2 py-1">
          <img src="/assets/ic-minusCircleGray600.svg" alt="빼기 버튼" />
        </button>
      </div>

      <div className="flex flex-center">
        <CheckboxIcon checked={checked} onChange={onCheck} />
      </div>
    </div>
  );
};

export default QuestionInput;
