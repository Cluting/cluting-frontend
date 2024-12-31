//QuestionItem.tsx
import { ReactElement, useState, useEffect } from "react";

export default function QuestionItem({
  question,
  partName,
  questionIndex,
  onTypeChange,
  onDelete,
  onAddOption,
  onRemoveOption,
  register,
  setValue,
  watch,
  errors,
  isSubmitted,
  partIndex
}: QuestionItemProps): ReactElement {
  const [newOption, setNewOption] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    setValue(
      `partQuestions.${partIndex}.questions.${questionIndex}.questionType`,
      question.questionType
    );
    if (question.objects) {
      setValue(
        `partQuestions.${partIndex}.questions.${questionIndex}.objects`,
        question.objects
      );
    }
  }, [question.questionType, setValue, partIndex, questionIndex]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest(".relative")) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const registerContent =
    `partQuestions.${partIndex}.questions.${questionIndex}.content` as const;
  const registerHasWordLimit =
    `partQuestions.${partIndex}.questions.${questionIndex}.hasWordLimit` as const;
  const registerWordLimit =
    `partQuestions.${partIndex}.questions.${questionIndex}.wordLimit` as const;
  const registerQuestionType =
    `partQuestions.${partIndex}.questions.${questionIndex}.questionType` as const;
  const registerObjects =
    `partQuestions.${partIndex}.questions.${questionIndex}.objects` as const;
  const registerMultiSelect =
    `partQuestions.${partIndex}.questions.${questionIndex}.multiSelect` as const;

  // 질문 타입 변경 핸들러
  //fix: 폼 데이터의 타입 변경 시 이전 필드들이 완전히 제거되지 않음
  const handleTypeChange = (newType: "OBJECT" | "SUBJECTIVE") => {
    onTypeChange(partName, question.id!, newType);

    setValue(registerQuestionType, newType);
    setValue(registerContent, ""); //질문 input 초기화
    setNewOption(""); //객관식 input 초기화

    if (newType === "OBJECT") {
      setValue(registerObjects, []);
    }
  };

  // 옵션 추가 핸들러
  const handleAddOption = (value: string) => {
    onAddOption(partName, question.id!, value);
    setValue(registerObjects, [...(question.objects || []), value]);
  };

  // 옵션 삭제 핸들러
  const handleRemoveOption = (index: number) => {
    onRemoveOption(partName, question.id!, index);
    setValue(
      registerObjects,
      question.objects?.filter((_, i) => i !== index) || []
    );
  };

  return (
    <div>
      <div
        className={`w-full h-auto px-[21px] pt-[20px] pb-[13px] bg-gray-100 rounded-[12px] border ${
          errors?.partQuestions?.[partIndex]?.questions?.[questionIndex]
            ?.content
            ? "border-red-100"
            : "border-gray-300"
        }`}
      >
        <div className="flex justify-between">
          <div className="flex">
            <textarea
              placeholder="질문을 작성해 주세요."
              className="flex leading-[18px] w-[541px] h-[42px] mr-[12px] py-[11px] px-[19px] rounded-[8px] border border-gray-200 outline-none overflow-hidden focus:border-main-100 resize-none"
              onInput={(e) => {
                e.currentTarget.style.height = "auto";
                e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`;
              }}
              {...register(registerContent, {
                required: "질문을 한 가지 이상 추가해 주세요."
              })}
            />

            <div className="relative">
              <button
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-[247px] h-[42px] pl-[21px] rounded-[8px] bg-white-100 border border-gray-200"
              >
                {question.questionType === "SUBJECTIVE" ? (
                  <div className="flex items-center">
                    <img
                      src="/assets/ic-descriptive.svg"
                      alt=""
                      className="w-5 h-5 mr-[11px]"
                    />
                    <span>서술형 질문</span>
                    <img
                      src="/assets/ic-toggleButton.svg"
                      className="ml-[99px]"
                    />
                  </div>
                ) : (
                  <div className="flex items-center">
                    <img
                      src="/assets/ic-multiple.svg"
                      alt=""
                      className="w-5 h-5 mr-[11px]"
                    />
                    <span>객관식 질문</span>
                    <img
                      src="/assets/ic-toggleButton.svg"
                      className="ml-[99px]"
                    />
                  </div>
                )}
              </button>

              {isDropdownOpen && (
                <div className="absolute z-50 w-full mt-1 px-2 py-2 bg-white-100 border border-gray-200 rounded-[8px] animate-dropdown">
                  <button
                    type="button"
                    className="w-full px-4 py-2 text-left rounded-[8px] hover:bg-gray-200"
                    onClick={() => {
                      handleTypeChange("SUBJECTIVE");
                      setIsDropdownOpen(false);
                    }}
                  >
                    서술형 질문
                  </button>
                  <button
                    type="button"
                    className="w-full px-4 py-2 text-left rounded-[8px] hover:bg-gray-200"
                    onClick={() => {
                      handleTypeChange("OBJECT");
                      setIsDropdownOpen(false);
                    }}
                  >
                    객관식 질문
                  </button>
                </div>
              )}
            </div>
          </div>

          <button
            type="button"
            onClick={() => onDelete(partName, question.id!)}
            className="flex-center"
          >
            <img src="/assets/ic-questionMinus.svg" alt="질문 삭제" />
          </button>
        </div>

        {question.questionType === "SUBJECTIVE" ? (
          <div>
            <textarea
              placeholder="지원자의 답변 작성란 입니다."
              className="w-full min-h-[91px] mt-[18px] py-[15px] pl-[20px] rounded-[8px] border border-gray-400 outline-none overflow-hidden focus:border-main-100"
              disabled
            />
            <div className="flex-center justify-end mt-[10px]">
              <label className="relative flex items-center">
                <input
                  type="checkbox"
                  className="peer w-[18px] h-[18px] mr-2 cursor-pointer appearance-none checked:bg-main-100 border border-gray-300 rounded"
                  {...register(registerHasWordLimit)}
                />
                <img
                  src="/assets/ic-check.svg"
                  alt=""
                  className="absolute left-[2.5px] top-[7px] w-[12px] h-[12px] pointer-events-none opacity-0 peer-checked:opacity-100"
                />
                <span>글자 수 제한</span>
                {watch(registerHasWordLimit) && (
                  <input
                    type="number"
                    placeholder="500"
                    min="0"
                    className="flex-center w-[66px] h-[26px] ml-[7px] px-[9px] py-[5px] rounded-[6px] border border-gray-400 outline-none text-caption2 focus:border-main-100"
                    {...register(registerWordLimit, {
                      valueAsNumber: true, //슛자 타입으로 변환
                      min: 1
                    })}
                  />
                )}
              </label>
            </div>
          </div>
        ) : (
          <div>
            <ul className="mt-[13px]">
              {question.objects?.map((option, index) => (
                <li key={index} className="flex items-center mb-[13px]">
                  <img
                    src="/assets/ic-emptyCheck.svg"
                    alt="빈 체크박스"
                    className="mr-[13px]"
                  />
                  <div className="flex items-center pl-[13px] w-[504px] h-auto pr-[40px] py-2 bg-white-100 border border-gray-200 rounded-[6px] text-caption1">
                    {option}
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveOption(index)}
                    className="flex-center ml-[-30px] w-[16px] h-[16px] mr-[13px]"
                  >
                    <img src="/assets/ic-questionMinus.svg" alt="선택지 삭제" />
                  </button>
                </li>
              ))}
            </ul>

            <div className="flex items-center mt-[13px]">
              <img
                src="/assets/ic-emptyCheck.svg"
                alt="빈 체크박스"
                className="mr-[13px]"
              />
              <input
                type="text"
                value={newOption}
                onChange={(e) => setNewOption(e.target.value)}
                placeholder="선택지 추가"
                className="flex w-[504px] h-auto px-[13px] py-2 border border-gray-200 rounded-[6px] text-caption1 outline-none focus:border-main-100"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && newOption.trim()) {
                    e.preventDefault();
                    handleAddOption(newOption.trim());
                    setNewOption("");
                  }
                }}
              />
            </div>
            <div className="flex-center justify-end mt-[10px]">
              <label className="relative flex items-center">
                <input
                  type="checkbox"
                  className="peer w-[18px] h-[18px] mr-2 cursor-pointer appearance-none checked:bg-main-100 border border-gray-300 rounded"
                  {...register(registerMultiSelect)}
                />
                <img
                  src="/assets/ic-check.svg"
                  alt=""
                  className="absolute left-[2.5px] top-[7px] w-[12px] h-[12px] pointer-events-none opacity-0 peer-checked:opacity-100"
                />
                <span>복수 선택</span>
              </label>
            </div>
          </div>
        )}
      </div>

      {errors?.partQuestions?.[partIndex]?.questions?.[questionIndex]
        ?.content && (
        <p className="text-state-error mt-2">
          {
            errors.partQuestions[partIndex]?.questions?.[questionIndex]?.content
              ?.message
          }
        </p>
      )}
    </div>
  );
}
