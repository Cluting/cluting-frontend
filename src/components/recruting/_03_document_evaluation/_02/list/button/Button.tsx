import React from "react";

interface ButtonProps {
  state: string;
  isDecisionMode?: boolean; //합불 결정하기 버튼 여부
  isDisputed?: boolean; //이의제기 여부
  className?: string;
  onClick?: () => void; // onClick 핸들러 추가
}

const Button: React.FC<ButtonProps> = ({
  state,
  isDecisionMode,
  isDisputed,
  className = "",
  onClick
}) => {
  // 둥글기 설정 (상태에 따라)
  const roundedStyle =
    isDisputed === true || isDecisionMode === true
      ? "rounded-lg" // 조금 둥근 버튼
      : "rounded-full"; // 많이 둥근 버튼

  return (
    <button
      onClick={onClick} // onClick 핸들러 추가
      className={`px-3 py-2 text-caption3 text-Pretendard bg-[#F1F3FF] text-[#8B8FA4] ${roundedStyle} ${className} `}
    >
      {state}
    </button>
  );
};

export default Button;
