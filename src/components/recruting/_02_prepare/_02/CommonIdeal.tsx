import React, { useRef } from "react";
import { useForm, useFieldArray } from "react-hook-form";

type CommonIdeal = {
  id: number;
  text: string;
};

type CommonIdealForm = {
  commonIdeals: { text: string }[];
};

export default function CommonIdeal() {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<CommonIdealForm>({
    defaultValues: { commonIdeals: [{ text: "" }] },
    mode: "onBlur"
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "commonIdeals"
  });

  const nextId = useRef<number>(1);

  const onSubmit = handleSubmit((data) => {
    console.log("Form Data:", data);
  });

  const addInputField = () => {
    append({ text: "" });
    nextId.current += 1;
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="flex">
        <p className="section-title">
          <span className="mr-[0.25em] text-main-100">*</span> 공통 인재상
        </p>
        <div className="tooltip">각 그룹별 인재상을 작성해 주세요.</div>
      </div>

      <div className="mt-4 pt-[14px] pb-7 relative h-auto bg-white-100 rounded-[12px]">
        {/* 인재상 입력 */}
        <div className="px-[30px]">
          {fields.map((field, index) => (
            <>
              <div key={field.id} className="flex items-center mt-4">
                <input
                  {...register(`commonIdeals.${index}.text`, {
                    required: "필수 입력 사항입니다."
                  })}
                  className={`w-full py-[11px] px-[21px] bg-white-100 rounded-[8px] outline-none text-[15px] font-medium border ${
                    errors.commonIdeals?.[index]?.text
                      ? "border-red-100"
                      : "border-gray-500"
                  }`}
                  placeholder="인재상을 작성해 주세요."
                />
                <button
                  type="button"
                  onClick={() => remove(index)}
                  aria-label="인재상 삭제하기"
                  className="absolute right-16 ml-2 flex-center bg-gray-100 rounded-full w-[16px] h-[16px] text-gray-500 hover:text-red-500"
                >
                  -
                </button>
              </div>
              {errors.commonIdeals?.[index]?.text && (
                <div className="w-full text-state-error mt-[4px] ">
                  {errors.commonIdeals?.[index]?.text?.message}
                </div>
              )}
            </>
          ))}

          <button
            type="button"
            onClick={addInputField}
            className="w-full mt-[14px] py-[11px] px-[14.55px] bg-gray-100 rounded-[8px] border border-gray-500 outline-none text-[15px] font-semibold text-left text-gray-700"
          >
            + 인재상 추가하기
          </button>
        </div>
      </div>
    </form>
  );
}
