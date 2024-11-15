import { ReactElement, useEffect, useState } from "react";
import {
  UseFormRegister,
  FieldErrors,
  Path,
  UseFormSetError
} from "react-hook-form";

interface QuestionItemProps {
  section: "common" | string;
  question: Question;
  onTypeChange: (
    section: string,
    questionId: string,
    newType: "서술형 질문" | "객관형 질문"
  ) => void;
  onDelete: (section: string, questionId: string) => void;
  onAddOption: (section: string, questionId: string, value: string) => void;
  onRemoveOption: (
    section: string,
    questionId: string,
    optionId: string
  ) => void;
  register: UseFormRegister<CreateApplicationForm>;
  registerPath: string;
  errors?: FieldErrors<CreateApplicationForm>;
  isSubmitted: boolean;
  setError: UseFormSetError<CreateApplicationForm>;
  totalQuestions: number;
}

export default function QuestionItem({
  section,
  question,
  onTypeChange,
  onDelete,
  onAddOption,
  onRemoveOption,
  register,
  registerPath,
  errors,
  isSubmitted,
  setError,
  totalQuestions
}: QuestionItemProps): ReactElement {
  const [newOption, setNewOption] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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

  return (
    <div>
      <div
        className={`w-full h-auto px-[21px] pt-[20px] pb-[13px] bg-gray-100 rounded-[12px] border ${
          totalQuestions === 1 &&
          errors &&
          ((section === "common" &&
            errors.commonSection?.questions?.[question.id]?.question
              ?.message) ||
            (section !== "common" &&
              errors.groupSections?.[section]?.questions?.[question.id]
                ?.question?.message))
            ? "border-red-100"
            : "border-gray-300"
        }`}
      >
        <div className="flex justify-between">
          <div className="flex">
            <textarea
              placeholder="질문을 작성해 주세요."
              className="flex leading-[18px] w-[541px] h-[42px] mr-[12px] py-[11px] px-[19px] rounded-[8px] border border-gray-200 outline-none focus:border-main-100 resize-none"
              onInput={(e) => {
                e.currentTarget.style.height = "auto";
                e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`;
              }}
              {...register(
                (registerPath + ".question") as Path<CreateApplicationForm>,
                {
                  required: "질문을 한 가지 이상 추가해 주세요.",
                  onBlur: (e) => {
                    if (!e.target.value.trim()) {
                      setError(
                        (registerPath +
                          ".question") as Path<CreateApplicationForm>,
                        {
                          type: "manual",
                          message: "질문을 한 가지 이상 추가해 주세요."
                        }
                      );
                    }
                  }
                }
              )}
            />

            <div className="relative">
              <button
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-[247px] h-[42px] pl-[21px] rounded-[8px] bg-white-100 border border-gray-200"
              >
                {question.type === "서술형 질문" ? (
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
                    <span>객관형 질문</span>
                    <img
                      src="/assets/ic-toggleButton.svg"
                      className="ml-[99px]"
                    />
                  </div>
                )}
              </button>

              {isDropdownOpen && (
                <div className="absolute z-50 w-full mt-1 px-2 py-2 bg-white-100 border border-gray-200 rounded-[8px]">
                  <button
                    className="w-full px-4 py-2 text-left rounded-[8px] hover:bg-gray-200"
                    onClick={() => {
                      onTypeChange(section, question.id, "서술형 질문");
                      setIsDropdownOpen(false);
                    }}
                  >
                    서술형 질문
                  </button>
                  <button
                    className="w-full px-4 py-2 text-left rounded-[8px] hover:bg-gray-200"
                    onClick={() => {
                      onTypeChange(section, question.id, "객관형 질문");
                      setIsDropdownOpen(false);
                    }}
                  >
                    객관형 질문
                  </button>
                </div>
              )}
            </div>
          </div>

          <button
            type="button"
            onClick={() => onDelete(section, question.id)}
            className="flex-center"
          >
            <img src="/assets/ic-questionMinus.svg" alt="질문 삭제" />
          </button>
        </div>

        {question.type === "서술형 질문" ? (
          <div>
            <textarea
              placeholder="지원자의 답변 작성란 입니다."
              className="w-full min-h-[91px] mt-[18px] py-[15px] pl-[20px] rounded-[8px] border border-gray-400 outline-none focus:border-main-100"
              disabled
            />
            <div className="flex-center justify-end mt-[10px]">
              <input
                type="checkbox"
                className="w-[18px] h-[18px] mr-2 cursor-pointer appearance-none checked:bg-main-100 border border-gray-300 rounded"
                {...register(
                  (registerPath +
                    ".hasWordLimit") as Path<CreateApplicationForm>
                )}
              />
              <label className="flex">
                글자 수 제한
                <input
                  type="number"
                  placeholder="500"
                  min="0"
                  className="flex-center w-[66px] h-[26px] ml-[7px] px-[9px] py-[5px] rounded-[6px] border border-gray-400 outline-none text-caption2 focus:border-main-100"
                  {...register(
                    (registerPath +
                      ".wordLimit") as Path<CreateApplicationForm>,
                    {
                      valueAsNumber: true,
                      min: 1
                    }
                  )}
                />
              </label>
            </div>
          </div>
        ) : (
          <div>
            <ul className="mt-[13px]">
              {(question as MultipleChoiceQuestion).options.map((option) => (
                <li key={option.id} className="flex items-center mb-[13px]">
                  <img
                    src="/assets/ic-emptyCheck.svg"
                    alt="빈 체크박스"
                    className="mr-[13px]"
                  />
                  <div className="flex items-center pl-[13px] w-[584px] h-auto pr-[40px] py-2 bg-white-100 border border-gray-200 rounded-[6px] text-caption1">
                    {option.value}
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      onRemoveOption(section, question.id, option.id)
                    }
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
                className="flex w-[584px] h-auto px-[13px] py-2 border border-gray-200 rounded-[6px] text-caption1 outline-none focus:border-main-100"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && newOption.trim()) {
                    e.preventDefault();
                    onAddOption(section, question.id, newOption.trim());
                    setNewOption("");
                  }
                }}
              />
            </div>
          </div>
        )}
      </div>

      {/*질문 하나일 때 에러 메시지 */}
      {/*//fix: 근데 질문 하나 일 때만 보고 질문 안에 값이 있는지 여부를 못 봄.. 수정해야해*/}
      {totalQuestions === 1 &&
        errors &&
        ((section === "common" &&
          errors.commonSection?.questions?.[question.id]?.question?.message) ||
          (section !== "common" &&
            errors.groupSections?.[section]?.questions?.[question.id]?.question
              ?.message)) && (
          <p className="text-state-error mt-2">
            {section === "common"
              ? errors.commonSection?.questions?.[question.id]?.question
                  ?.message
              : errors.groupSections?.[section]?.questions?.[question.id]
                  ?.question?.message}
          </p>
        )}
    </div>
  );
}
