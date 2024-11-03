//input+button 컴포넌트
import { Control, Controller, RegisterOptions } from "react-hook-form";

interface NumberSpinnerProps {
  control: Control<any>;
  name: string;
  rules?: RegisterOptions;
}

export default function NumberSpinner({
  control,
  name,
  rules
}: NumberSpinnerProps) {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      defaultValue={0}
      render={({ field: { value, onChange } }) => {
        const increment = () => onChange(value + 1);
        const decrement = () => {
          if (value <= 0) return;
          onChange(value - 1);
        };

        const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          const newValue = e.target.value === "" ? 0 : parseInt(e.target.value);
          if (isNaN(newValue) || newValue < 0) {
            onChange(0);
          } else {
            onChange(newValue);
          }
        };

        return (
          <div className="flex-center">
            <input
              type="text"
              value={value}
              onChange={handleInputChange}
              className="w-[120px] text-right pr-[23px] text-[17px] font-bold border-none focus:outline-none"
            />
            <div className="flex flex-col">
              <button
                onClick={increment}
                type="button"
                className="flex-center w-[17.56px] h-[14px] bg-gray-100 border border-gray-500 rounded-[5px] text-gray-500 text-[8px] hover:bg-gray-600 hover:border-gray-800 hover:text-gray-800"
              >
                ▲
              </button>
              <div className="pt-[2px]">
                <button
                  onClick={decrement}
                  type="button"
                  className="flex justify-center w-[17.56px] h-[14px] bg-gray-100 border border-gray-500 rounded-[5px] text-gray-500 text-[8px] hover:bg-gray-600 hover:border-gray-800 hover:text-gray-800"
                >
                  ▼
                </button>
              </div>
            </div>
          </div>
        );
      }}
    />
  );
}
