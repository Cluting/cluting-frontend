import { useState } from "react";

interface InputProps {
  type: React.HTMLInputTypeAttribute;
  placeholder?: string;
  required?: boolean;
  isDropdown?: boolean;
  isDropdownSelected?: boolean;
  maxLength?: number;
  onClick?: (event: React.MouseEvent<HTMLInputElement>) => void;
}

export default function Input({
  type,
  placeholder,
  required,
  isDropdown,
  isDropdownSelected,
  maxLength,
  onClick
}: InputProps) {
  const [inputValue, setInputValue] = useState("");

  return (
    <div className="relative">
      <input
        type={type}
        placeholder={placeholder}
        maxLength={maxLength}
        required={required}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onClick={(event: React.MouseEvent<HTMLInputElement>) => {
          if (onClick) onClick(event);
        }}
        className={`${required ? "pl-7" : ""} ${
          isDropdownSelected ? "placeholder:text-black-200" : ""
        }
        ${inputValue ? "text-black-200" : "text-gray-500"}
           w-[404px] h-[56px] my-4 rounded-[8px] bg-white-100 border border-gray-200 text-body pl-[14px] focus:outline-none focus:border-gray-900 focus:bg-gray-100 disabled:border-red-100 disabled:bg-gray-100`}
      />
      {required && (
        <span className="absolute left-3 top-[35px]">
          <span className="text-main-100">* </span>
        </span>
      )}
      {isDropdown && (
        <>
          <img
            src="assets/ic-dropdown.svg"
            alt="드롭다운"
            className="absolute right-5 top-[40px] w-[10px] h-[10px] cursor-pointer"
          />
        </>
      )}
    </div>
  );
}
