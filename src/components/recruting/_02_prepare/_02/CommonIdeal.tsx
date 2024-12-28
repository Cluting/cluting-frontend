import React, { useRef, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";

interface IdealInput {
  id: number;
  text: string;
}

export default function CommonIdeal() {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue
  } = useForm<CommonIdealForm>({
    defaultValues: { commonIdeals: [{ text: "" }] },
    mode: "onBlur"
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "commonIdeals"
  });

  const nextId = useRef<number>(1);
  const [showDeleteButtons, setShowDeleteButtons] = useState<boolean[]>([
    false
  ]);
  const [confirmedIdeals, setConfirmedIdeals] = useState<IdealInput[]>([]);
  const [showInput, setShowInput] = useState(true);

  const onSubmit = (data: CommonIdealForm) => {
    console.log("Form Data:", data);
  };

  const handleKeyPress = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const currentValue = getValues(`commonIdeals.${index}.text`);

      if (currentValue && currentValue.trim()) {
        const newIdeal = {
          id: nextId.current,
          text: currentValue.trim()
        };

        setConfirmedIdeals([...confirmedIdeals, newIdeal]);
        setShowInput(false);
        nextId.current += 1;
        setValue(`commonIdeals.${index}.text`, "");

        const newShowDeleteButtons = [...showDeleteButtons];
        newShowDeleteButtons[index] = true;
        setShowDeleteButtons(newShowDeleteButtons);
      }
    }
  };

  const handleRemove = (id: number) => {
    setConfirmedIdeals(confirmedIdeals.filter((ideal) => ideal.id !== id));
  };

  const onInsert = () => {
    if (confirmedIdeals.length > 0) {
      setShowInput(true);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex">
        <p className="section-title">
          <span className="mr-[0.25em] text-main-100">*</span> 공통 인재상
        </p>
        <div className="tooltip">각 그룹별 인재상을 작성해 주세요.</div>
      </div>

      <div className="mt-4 pt-[14px] pb-7 relative h-auto bg-white-100 rounded-[12px]">
        <div className="px-[30px]">
          {confirmedIdeals.map((ideal) => (
            <div key={ideal.id} className="flex items-center mt-4">
              <div className="w-full py-[11px] px-[21px] bg-white-100 rounded-[8px] border border-gray-500 text-[15px] font-medium flex justify-between items-center">
                <span>{ideal.text}</span>
                <button
                  type="button"
                  onClick={() => handleRemove(ideal.id)}
                  className="flex-center bg-gray-100 rounded-full w-4 h-4 text-gray-500"
                >
                  -
                </button>
              </div>
            </div>
          ))}

          {showInput && (
            <div className="mt-4">
              <input
                {...register(`commonIdeals.0.text`, {
                  required:
                    confirmedIdeals.length === 0
                      ? "필수 입력 사항입니다."
                      : false
                })}
                onKeyPress={(e) => handleKeyPress(e, 0)}
                className={`w-full py-[11px] px-[21px] bg-white-100 rounded-[8px] outline-none text-[15px] font-medium border ${
                  errors.commonIdeals?.[0]?.text && confirmedIdeals.length === 0
                    ? "border-red-100"
                    : "border-gray-500"
                }`}
                placeholder="인재상을 작성해 주세요."
              />
              {errors.commonIdeals?.[0]?.text &&
                confirmedIdeals.length === 0 && (
                  <div className="w-full text-state-error mt-[4px]">
                    {errors.commonIdeals?.[0]?.text?.message}
                  </div>
                )}
            </div>
          )}

          <button
            type="button"
            onClick={onInsert}
            className="w-full mt-[14px] py-[11px] px-[14.55px] bg-gray-100 rounded-[8px] border border-gray-500 outline-none text-[15px] font-semibold text-left text-gray-700"
          >
            + 인재상 추가하기
          </button>
        </div>
      </div>
    </form>
  );
}
