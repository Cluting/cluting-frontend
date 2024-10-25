interface InputProps {
  type: React.HTMLInputTypeAttribute;
  placeholder?: string;
  required?: boolean;
  maxLength?: number;
  onClick?: (event: React.MouseEvent<HTMLInputElement>) => void;
}

export default function Input({
  type,
  placeholder,
  required,
  maxLength,
  onClick
}: InputProps) {
  return (
    <>
      <input
        type={type}
        placeholder={placeholder}
        maxLength={maxLength}
        required={required}
        onClick={(event: React.MouseEvent<HTMLInputElement>) => {
          if (onClick) onClick(event);
        }}
        className="w-[404px] h-[56px] my-4 rounded-[8px] bg-white-100 border border-gray-200 text-gray-500 text-body pl-[14px] focus:outline-none focus:border-gray-900 focus:bg-gray-100 disabled:border-red-100 disabled:bg-gray-100"
      />
    </>
  );
}
