import { useState } from "react";

interface DropdownProps {
  options: string[];
  defaultValue?: string;
  label: string;
  onSelect: (selected: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({
  options,
  defaultValue = "",
  label,
  onSelect
}) => {
  const [selectedValue, setSelectedValue] = useState(defaultValue);
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (value: string) => {
    setSelectedValue(value);
    setIsOpen(false);
    onSelect(value);
  };

  const toggleDropdown: () => void = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative w-28">
      <div
        className="flex items-center justify-between px-2 py-1 border rounded-md appearance-none cursor-pointer "
        onClick={toggleDropdown}
      >
        <span className="text-sm font-pretendard tracking-[-0.078px] text-gray-1100 bg-white-100">
          {selectedValue ? `${label} ${selectedValue}` : label}
        </span>
        <div className="flex w-3 flex-center">
          <img
            className={`w-full transition-transform ${
              isOpen ? "rotate-180" : "rotate-0"
            }`}
            src="/assets/ic-toggleButton.svg"
            alt="Toggle dropdown"
          />
        </div>
      </div>

      {isOpen && (
        <ul className="w-28 absolute left-0 mt-[7px] z-10 inline-flex p-2 flex-col gap-1.25 bg-white-100 border border-[#D0D4E7] rounded-[10px]">
          {options.map((option, index) => (
            <li
              key={index}
              className={`px-2 animate-dropdown font-Pretendard text-caption3 tracking-[-0.078px] bg-white-100 px-[11px] py-[6px] cursor-pointer hover:bg-[#D0D4E7] rounded-[6px] ${
                selectedValue === option ? "bg-gray-200" : ""
              }`}
              onClick={() => handleSelect(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
