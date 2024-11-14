import { useState } from "react";

interface CustomSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: string[];
  placeholder: string;
  onFocus?: () => void; // onFocus props 추가
}

export default function CustomSelect({
  value,
  onChange,
  options,
  placeholder,
  onFocus // onFocus props 추가
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (time: string) => {
    onChange(time); // 부모 컴포넌트로 selected value 전달
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => {
          toggleDropdown();
          onFocus && onFocus(); // onFocus 이벤트 호출
        }}
        className="w-[160px] input-style input-background"
      >
        {value || placeholder}
      </button>
      {isOpen && (
        <ul className="animate-dropdown absolute left-0 mt-2 w-full py-3 px-2 bg-white-100 rounded-[8px] custom-shadow max-h-48 overflow-y-auto z-10">
          {options.map((time) => (
            <li
              key={time}
              onClick={() => handleSelect(time)}
              className="px-2 py-0 my-2 text-center h-[25px] hover:bg-gray-100 text-[#3A3A3C] rounded-[2px] cursor-pointer"
            >
              {time}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
