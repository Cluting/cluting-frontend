import React from "react";
import { useFormContext } from "react-hook-form";

export default function CommonIdeal() {
  const {
    watch,
    setValue,
    formState: { touchedFields }
  } = useFormContext<IdealForm>();

  const commonIdeal = watch("partIdeals.0");
  const [inputValue, setInputValue] = React.useState("");
  const [showInput, setShowInput] = React.useState(true);
  const [touched, setTouched] = React.useState(false);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && inputValue.trim()) {
      e.preventDefault();
      setValue("partIdeals.0.content", [
        ...commonIdeal.content,
        inputValue.trim()
      ]);
      setInputValue("");
      setShowInput(false);
      setTouched(true);
    }
  };

  const handleRemove = (index: number) => {
    setValue(
      "partIdeals.0.content",
      commonIdeal.content.filter((_, i) => i !== index)
    );
    setTouched(true);
  };

  const handleAddIdealClick = () => {
    setShowInput(true);
    setTouched(true);
  };

  const showError = touched && commonIdeal.content.length === 0;

  return (
    <div>
      <div className="flex">
        <p className="section-title">
          <span className="mr-[0.25em] text-main-100">*</span> 공통 인재상
        </p>
        <div className="tooltip">각 그룹별 인재상을 작성해 주세요.</div>
      </div>

      <div className="mt-4 pt-[14px] pb-7 relative h-auto bg-white-100 rounded-[12px]">
        <div className="px-[30px]">
          {commonIdeal.content.map((ideal, index) => (
            <div key={index} className="flex items-center mt-4">
              <div className="w-full py-[11px] px-[21px] bg-white-100 rounded-[8px] border border-gray-500 text-[15px] font-medium flex justify-between items-center">
                <span>{ideal}</span>
                <button
                  type="button"
                  onClick={() => handleRemove(index)}
                  className="flex-center bg-gray-100 rounded-full w-4 h-4 text-gray-500"
                >
                  -
                </button>
              </div>
            </div>
          ))}

          {showInput ? (
            <div className="mt-4">
              <input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                onBlur={() => setTouched(true)}
                className={`w-full py-[11px] px-[21px] bg-white-100 rounded-[8px] outline-none text-[15px] font-medium border ${
                  showError ? "border-red-100" : "border-gray-500"
                } focus:border-main-100`}
                placeholder="인재상을 작성해 주세요."
              />
            </div>
          ) : (
            <button
              type="button"
              onClick={handleAddIdealClick}
              className="w-full mt-[14px] py-[11px] px-[14.55px] bg-gray-100 rounded-[8px] border border-gray-500 outline-none text-[15px] font-semibold text-left text-gray-700"
            >
              + 인재상 추가하기
            </button>
          )}

          {showError && (
            <div className="w-full text-state-error mt-[4px]">
              필수 입력 사항입니다.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
