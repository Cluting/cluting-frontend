import React, { useState, KeyboardEvent, ChangeEvent } from "react";

export default function CommonIdealInsert({
  onInsert
}: CommonIdealInsertProps) {
  const [showInput, setShowInput] = useState<boolean>(true);
  const [isFirstRender, setIsFirstRender] = useState<boolean>(true); // 첫 렌더링 여부 체크
  const [value, setValue] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim()) {
      onInsert(value);
      setValue("");
      setShowInput(false);
      setIsFirstRender(false);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <div className="px-[30px]">
      {showInput && (
        <input
          className="w-full mb-[24px] py-[11px] px-[21px] bg-white-100 rounded-[8px] border border-gray-500 outline-none text-[15px] font-medium"
          type="text"
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="인재상을 작성해 주세요."
          autoFocus
        />
      )}
      {(isFirstRender || !showInput) && ( // 첫 렌더링이거나 input이 숨겨져 있을 때만 버튼 표시
        <button
          onClick={() => setShowInput(true)}
          className="w-full mb-[24px] py-[11px] px-[14.55px] bg-gray-100 rounded-[8px] border border-gray-500 outline-none text-[15px] font-semibold text-left text-gray-700"
        >
          + 인재상 추가하기
        </button>
      )}
    </div>
  );
}
