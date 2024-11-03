import { Control, Controller, RegisterOptions } from "react-hook-form";

interface NumberSpinnerProps {
  control: Control<any>;
  name: string;
  error?: string;
  rules?: RegisterOptions;
}

export default function NumberSpinner({
  control,
  name,
  error,
  rules
}: NumberSpinnerProps) {
  return (
    <div className="relative">
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field: { value, onChange } }) => {
          const increment = () => onChange((value || 0) + 1);
          const decrement = () => {
            const currentValue = value || 0;
            if (currentValue <= 0) return;
            onChange(currentValue - 1);
          };

          const handleInputChange = (
            e: React.ChangeEvent<HTMLInputElement>
          ) => {
            const newValue =
              e.target.value === "" ? undefined : parseInt(e.target.value);
            if (isNaN(newValue as number) || (newValue as number) < 0) {
              onChange(undefined);
            } else {
              onChange(newValue);
            }
          };

          // const hasError = fieldError || error;

          return (
            <div className="flex-center">
              <input
                type="text"
                value={value ?? 0}
                onChange={handleInputChange}
                className="w-[120px] text-right pr-[23px] text-[17px] font-bold border-none focus:outline-none"
              />
              <div className="flex flex-col">
                <button
                  onClick={increment}
                  type="button"
                  className="flex-center w-[17.56px] h-[14px] bg-gray-100 border rounded-[5px] text-[8px] hover:bg-gray-600 hover:border-gray-800 hover:text-gray-800 border-gray-500 text-gray-500"
                >
                  ▲
                </button>
                <div className="pt-[2px]">
                  <button
                    onClick={decrement}
                    type="button"
                    className="flex justify-center w-[17.56px] h-[14px] bg-gray-100 border rounded-[5px] text-[8px] hover:bg-gray-600 hover:border-gray-800 hover:text-gray-800 border-gray-500 text-gray-500"
                  >
                    ▼
                  </button>
                </div>
              </div>
              {/* {hasError && (
                <p className="absolute top-[38px] left-0 text-red-100 font-medium text-[11px]">
                  {fieldError?.message || error}
                </p>
              )} */}
            </div>
          );
        }}
      />
    </div>
  );
}
