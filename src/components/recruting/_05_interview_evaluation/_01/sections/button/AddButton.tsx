import React from "react";

interface AddButtonProps {
  onClick: () => void; // 클릭 핸들러
  label: string; // 버튼 텍스트
}

const AddButton: React.FC<AddButtonProps> = ({ onClick, label }) => {
  return (
    <button
      onClick={onClick}
      className="flex gap-2 px-4 py-4 rounded-lg bg-main-300 flex-center"
    >
      <img src="/assets/ic-addMain.svg" alt="add icon" className="w-3 h-3" />
      <span className="font-Pretendard font-semibold text-base text-[#5E2BE8] leading-5 tracking-tight">
        {label}
      </span>
    </button>
  );
};

export default AddButton;
