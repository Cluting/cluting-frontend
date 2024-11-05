import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import CompleteButton from "../../CompleteButton";

export default function CommonIdeal() {
  const [ideals, setIdeals] = useState<Ideal[]>([]);
  const [value, setValue] = useState<string>("");
  const [showInput, setShowInput] = useState<boolean>(true);
  const nextId = useRef<number>(1);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<DefineIdealForm>({
    mode: "onBlur"
  });

  const onInsert = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim()) {
      const ideal = {
        id: nextId.current,
        text: value
      };
      setIdeals([...ideals, ideal]);
      setValue("");
      setShowInput(false);
      nextId.current += 1;
    }
  };

  const onRemove = (id: number) => {
    setIdeals(ideals.filter((ideal) => ideal.id !== id));
  };

  const onSubmit = handleSubmit((data) => {
    const formData = {
      ...data,
      ideals
    };
    console.log(formData);
  });

  return (
    <form onSubmit={onSubmit}>
      <div className="flex">
        <p className="section-title">
          <span className="mr-[0.25em] text-main-100">*</span> 공통 인재상
        </p>
        <div className="tooltip">각 그룹별 인재상을 작성해 주세요.</div>
      </div>

      <div className="mt-[16px] pt-[14px] pb-[28px] relative h-auto bg-white-100 rounded-[12px] custom-shadow">
        {/* 인재상 목록 */}
        <div className="px-[30px]">
          {ideals.map((ideal) => (
            <div
              key={ideal.id}
              className="mt-[14px] py-[11px] pl-[21px] pr-[53px] bg-white-100 rounded-[8px] border border-gray-500 text-[15px] font-medium flex justify-between items-center"
            >
              <span className="text-[#3B3D46]">{ideal.text}</span>
              <button
                type="button"
                onClick={() => onRemove(ideal.id)}
                className="flex-center bg-gray-100 rounded-full w-4 h-4 text-gray-500 hover:text-red-500"
              >
                -
              </button>
            </div>
          ))}
        </div>

        {/* 인재상 입력 */}
        <div className="px-[30px]">
          {showInput && (
            <input
              {...register("ideals", { required: "필수 입력 사항입니다." })}
              className={`w-full mt-[14px] py-[11px] px-[21px] bg-white-100 rounded-[8px] outline-none text-[15px] font-medium border ${
                errors.ideals ? "border-red-100" : "border-gray-500"
              }`}
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  onInsert(e);
                }
              }}
              placeholder="인재상을 작성해 주세요."
              autoFocus
            />
          )}

          {errors.ideals && ideals.length === 0 && (
            <p className="text-state-error">{errors.ideals.message}</p>
          )}

          <button
            type="button"
            onClick={() => setShowInput(true)}
            className="w-full mt-[14px] py-[11px] px-[14.55px] bg-gray-100 rounded-[8px] border border-gray-500 outline-none text-[15px] font-semibold text-left text-gray-700"
          >
            + 인재상 추가하기
          </button>
        </div>
      </div>

      <div className="flex-center mt-[50px]">
        <CompleteButton isSubmitting={isSubmitting} />
      </div>
    </form>
  );
}
