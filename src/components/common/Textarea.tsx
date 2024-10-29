import { useState } from "react";
import { Path, UseFormRegister, FieldValues } from "react-hook-form";

interface TextareaProps<T extends FieldValues> {
  name: Path<T>;
  register: UseFormRegister<T>;
  placeholder?: string;
  required?: boolean;
  maxLength?: number;
  onClick?: (event: React.MouseEvent<HTMLInputElement>) => void;
}

export default function Textarea<T extends FieldValues>({
  name,
  register,
  placeholder,
  required,
  maxLength
}: TextareaProps<T>) {
  const [inputValue, setInputValue] = useState("");

  return (
    <div className="relative">
      <textarea
        {...register(name, { required })}
        placeholder={placeholder}
        maxLength={maxLength}
        required={required}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className={`${inputValue ? "text-black-200" : "text-gray-500"}
           w-[404px] h-[200px] pt-[17px] my-4 rounded-[8px] bg-white-100 border border-gray-200 text-body pl-[14px] focus:outline-none focus:border-gray-900 focus:bg-gray-100 disabled:border-red-100 disabled:bg-gray-100`}
      />
    </div>
  );
}
