//input+button 컴포넌트
import { useState } from "react";

export default function NumberSpinner() {
  const [count, setCount] = useState(0);

  const increment = () => setCount((prev) => prev + 1);
  const decrement = () =>
    setCount((prev) => {
      if (prev <= 0) return 0;
      return prev - 1;
    });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value === "" ? 0 : parseInt(e.target.value);
    if (isNaN(value) || value < 0) {
      setCount(0);
    } else {
      setCount(value);
    }
  };

  return (
    <div className="flex-center">
      <input
        type="text"
        value={count}
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
}
