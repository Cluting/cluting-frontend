import { useState } from "react";

const SelectGroup = () => {
  const [selectedButtons, setSelectedButtons] = useState<string[]>([]);

  const buttons = ["기획", "디자인", "개발"];

  const handleButtonClick = (button: string) => {
    setSelectedButtons((prev) =>
      prev.includes(button)
        ? prev.filter((item) => item !== button)
        : [...prev, button]
    );
  };

  return (
    <div className="flex gap-2 px-8 border py-7 bg-white-100 rounded-xl">
      {buttons.map((button) => (
        <button
          key={button}
          className={`flex w-40 h-11 px-14 py-5 flex-center font-Pretendard font-semibold text-base leading-5 tracking-tight h-11 rounded-md ${selectedButtons.includes(button) ? "bg-[#5E2BE8] text-white-100" : "bg-[#F1F3FF] text-[#5E2BE8] border border-main-400"}`}
          onClick={() => handleButtonClick(button)}
        >
          {button}
        </button>
      ))}
    </div>
  );
};

export default SelectGroup;
