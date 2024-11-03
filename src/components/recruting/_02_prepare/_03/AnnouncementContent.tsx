import React, { useRef, FormEvent, useState } from "react";
import { useForm } from "react-hook-form";
const MAX_CHARS = 2000;

const AnnouncementContent: React.FC = () => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [charCount, setCharCount] = useState(0);

  const handleInput = (event: FormEvent<HTMLTextAreaElement>): void => {
    const textarea = textareaRef.current;
    if (textarea) {
      setCharCount(textarea.value.length);
      textarea.style.height = "290px"; // 기본 높이 설정
      textarea.style.height = `${textarea.scrollHeight}px`; // 내용에 따라 높이 조정
    }
  };
  //FIX: onInput 리렌더링 문제 고민해보기, 디바운싱 고민해서 적용

  //TODO: Form 연결 후 공고 글자수 에러 처리 추가
  return (
    <div className="relative ">
      <textarea
        ref={textareaRef}
        aria-label="공고 상세 내용"
        placeholder="상세 본문 내용을 작성해 주세요"
        maxLength={2000}
        onInput={handleInput}
        className="bg-white-100 custom-shadow cursor-pointer border border-gray-200 focus:outline-none disabled:border-red-100
         w-full min-h-[290px] mx-8 px-[26px] py-[22px] rounded-[12px] mb-[50px] overflow-hidden "
        style={{ resize: "none" }} // 수동 크기 조절 비활성화
      />

      <div className="text-right text-gray-500 absolute right-0 bottom-[80px]">
        {charCount}/{MAX_CHARS}
      </div>
    </div>
  );
};

export default AnnouncementContent;
