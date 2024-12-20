/* eslint-disable indent */
import React, { useRef, FormEvent, useState } from "react";
import { useFormContext } from "react-hook-form";
const MAX_CHARS = 2000;

const AnnouncementContent: React.FC = () => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [charCount, setCharCount] = useState(0);
  const [isMaxLengthExceeded, setIsMaxLengthExceeded] = useState(false);

  const { register, watch } = useFormContext();
  const content = watch("content", "");

  const handleInput = (event: FormEvent<HTMLTextAreaElement>): void => {
    const count = event.currentTarget.value.length;
    setIsMaxLengthExceeded(count >= MAX_CHARS);
    event.currentTarget.style.height = "290px"; // 기본 높이 설정
    event.currentTarget.style.height = `${event.currentTarget.scrollHeight}px`; // 내용에 따라 높이 조정
  };
  return (
    <div className="relative">
      <textarea
        {...register("content")}
        aria-label="공고 상세 내용"
        placeholder="상세 본문 내용을 작성해 주세요"
        maxLength={2000}
        onInput={handleInput}
        className={`bg-white-100 cursor-pointer border focus:outline-none 
        w-full min-h-[290px] mx-8 px-[26px] py-[22px] rounded-[12px] mb-[50px] overflow-hidden ${
          isMaxLengthExceeded
            ? "border-red-100"
            : "border-gray-200 focus:border-main-100"
        }`}
        style={{ resize: "none" }}
      />
      <div className="text-right text-gray-500 absolute right-0 bottom-[80px]">
        {content.length}/{MAX_CHARS}
      </div>
      {isMaxLengthExceeded && (
        <p className="text-state-error absolute left-10 bottom-[30px]">
          글자 수 제한을 초과했습니다.
        </p>
      )}
    </div>
  );
};

export default AnnouncementContent;
