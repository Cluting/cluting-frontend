import React, { useRef, FormEvent } from "react";

const AnnouncementContent: React.FC = () => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const handleInput = (event: FormEvent<HTMLTextAreaElement>): void => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "290px"; // 기본 높이 설정
      textarea.style.height = `${textarea.scrollHeight}px`; // 내용에 따라 높이 조정
    }
  };
  //FIX: onInput 리렌더링 문제 고민해보기
  return (
    <textarea
      ref={textareaRef}
      placeholder="상세 본문 내용을 작성해 주세요"
      maxLength={2000}
      onInput={handleInput}
      className="input-background w-full min-h-[290px] mx-8 px-[26px] py-[22px] rounded-[12px] mb-[50px] overflow-hidden"
      style={{ resize: "none" }} // 수동 크기 조절 비활성화
    />
  );
};

export default AnnouncementContent;
