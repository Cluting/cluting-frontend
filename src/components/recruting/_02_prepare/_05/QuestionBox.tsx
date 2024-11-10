import { useState, ChangeEvent } from "react";
import DescriptiveQuestion from "./DescriptiveQuestion";
import MultipleChoiceQuestion from "./MultipleChoiceQuestion";
import { QuestionType } from "../../../../type/type";

interface QuestionBoxProps {
  questionType: QuestionType;
  onSelectChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}

export default function QuestionBox({
  questionType,
  onSelectChange
}: QuestionBoxProps) {
  return (
    <div className="w-full h-auto mb-[34px] px-[21px] pt-[20px] pb-[13px] bg-gray-100 rounded-[12px] border border-gray-300">
      <div className="flex justify-between">
        <input
          type="text"
          placeholder="질문을 작성해 주세요."
          className="w-[541px] h-[42px] py-[11px] pl-[19px] rounded-[8px] border border-gray-400 outline-none hover:border-main-100"
        />
        <select
          className="flex-center w-[247px] h-[42px] pl-[19px] py-[11px] bg-white-100 rounded-[8px] border border-gray-400 outline-none"
          onChange={onSelectChange}
          value={questionType}
        >
          <option value="서술형 질문">서술형 질문</option>
          <option value="객관형 질문">객관형 질문</option>
        </select>
      </div>
      {questionType === "서술형 질문" ? (
        <DescriptiveQuestion />
      ) : (
        <MultipleChoiceQuestion />
      )}
    </div>
  );
}
