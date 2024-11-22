import React from "react";
import { ButtonState } from "../types/buttonTypes";

interface ButtonProps {
  state: ButtonState;
  className?: string;
  onClick?: () => void; // onClick 핸들러 추가
}

const Button: React.FC<ButtonProps> = ({ state, className = "", onClick }) => {
  // 상태별 스타일 매핑
  const stateStyles = {
    "평가 전": "bg-[#F1F3FF] text-[#8B8FA4]",
    "평가 중": "bg-[#F1F3FF] text-[#646775]",
    "수정 가능": "bg-main-300 text-[#43454F]",
    "열람 가능": "bg-[#BAF3E4] text-[#43454F]",
    "이의 제기중": "bg-[#f1f3ff] text-main-700",
    "이의 제기": "bg-main-300 text-[#5E2BE8] border border-main-400",
    "합불 결정하기": "bg-[#5E2BE8] text-white"
  };

  // 둥글기 설정 (상태에 따라)
  const roundedStyle =
    state === "이의 제기" || state === "합불 결정하기"
      ? "rounded-lg" // 조금 둥근 버튼
      : "rounded-full"; // 많이 둥근 버튼

  return (
    <button
      onClick={onClick} // onClick 핸들러 추가
      className={`px-3 py-2 text-caption3 text-Pretendard ${roundedStyle} ${stateStyles[state]} ${className}`}
    >
      {state}
    </button>
  );
};

export default Button;
