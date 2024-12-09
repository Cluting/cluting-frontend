import { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import {
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch
} from "react-hook-form";
import { ReactComponent as IdealIcon } from "../../../../src/assets/ic-plus.svg";

export default function EvaluationCriteria({
  groups,
  selectedGroupId,
  selectedGroupIndex,
  setSelectedGroupId,
  type,
  register,
  setValue,
  errors
}: {
  groups: DocumentReviewForm["groups"];
  selectedGroupId: number;
  selectedGroupIndex: number;
  setSelectedGroupId: (id: number) => void;
  type?: string;
  register: UseFormRegister<DocumentReviewForm>;
  setValue: UseFormSetValue<DocumentReviewForm>;
  watch: UseFormWatch<DocumentReviewForm>;
  errors: any;
}) {
  const [newDetailCriteria, setNewDetailCriteria] = useState<string>("");

  const addCriteria = useCallback(
    (groupId: number) => {
      const groupIndex = groups.findIndex((g) => g.id === groupId);
      const currentCriteria = groups[groupIndex].criteria;

      setValue(`groups.${groupIndex}.criteria`, [
        ...currentCriteria,
        {
          id: currentCriteria.length + 1,
          criteria: "",
          detailCriteria: [],
          score: undefined
        }
      ]);
    },
    [groups, setValue]
  );

  const handleDetailCriteria = useCallback(
    (
      e: React.KeyboardEvent<HTMLInputElement>,
      groupId: number,
      criteriaId: number
    ) => {
      if (e.key === "Enter") {
        e.preventDefault();

        if (newDetailCriteria.trim()) {
          const groupIndex = groups.findIndex((g) => g.id === groupId);
          const criteriaIndex = groups[groupIndex].criteria.findIndex(
            (c) => c.id === criteriaId
          );
          const currentCriteria = groups[groupIndex].criteria[criteriaIndex];

          setValue(
            `groups.${groupIndex}.criteria.${criteriaIndex}.detailCriteria`,
            [...currentCriteria.detailCriteria, newDetailCriteria.trim()]
          );

          setNewDetailCriteria("");
        }
      }
    },
    [groups, setValue, newDetailCriteria]
  );

  const deleteCriteria = useCallback(
    (groupId: number, criteriaId: number) => {
      const groupIndex = groups.findIndex((g) => g.id === groupId);
      const currentGroup = groups[groupIndex];

      if (currentGroup.criteria.length > 1) {
        setValue(
          `groups.${groupIndex}.criteria`,
          currentGroup.criteria.filter((c) => c.id !== criteriaId)
        );
      }
    },
    [groups, setValue]
  );

  const deleteDetailCriteria = useCallback(
    (groupId: number, criteriaId: number, detailIndex: number) => {
      const groupIndex = groups.findIndex((g) => g.id === groupId);
      const criteriaIndex = groups[groupIndex].criteria.findIndex(
        (c) => c.id === criteriaId
      );
      const currentCriteria = groups[groupIndex].criteria?.[criteriaIndex];

      setValue(
        `groups.${groupIndex}.criteria.${criteriaIndex}.detailCriteria`,
        currentCriteria.detailCriteria.filter((_, i) => i !== detailIndex)
      );
    },
    [groups, setValue]
  );

  return (
    <div>
      <div className="flex mt-[34px]">
        <p className="section-title">
          <span className="mr-[0.25em] text-main-100">*</span>평가 기준 설정하기
        </p>
        <div className="tooltip">
          평가 기준을 설정해 주세요. 설정된 내용은 개별 평가 진행 시,
          반영됩니다.
        </div>
      </div>

      <div className="flex mt-[18px]">
        {groups.map((groupItem) => (
          <button
            key={groupItem.id}
            type="button"
            className={`flex-center w-[162px] min-h-[43px] rounded-t-[11px] bg-gray-100 border border-b-0 text-callout 
                ${
                  selectedGroupId === groupItem.id
                    ? "border-main-100 bg-main-100 text-white-100"
                    : "border-gray-200 text-main-100"
                }`}
            onClick={() => setSelectedGroupId(groupItem.id)}
          >
            {groupItem.groupName}
          </button>
        ))}
      </div>

      {groups.map(
        (group) =>
          group.id === selectedGroupId && (
            <div
              key={group.id}
              className="flex flex-col w-full h-auto py-[30px] px-[36px] bg-white-100 border border-[#D6D7DA] rounded-tr-[21px] rounded-bl-[21px] rounded-br-[21px]"
            >
              <div className="flex items-center justify-between w-full">
                <p className="text-gray-800 text-[16px] font-bold underline underline-offset-2">
                  <Link to="">{type} 질문 다시 보기</Link>
                </p>
                <label className="flex-center text-gray-800 text-[16px] font-bold">
                  {type} 만점 점수
                  <input
                    type="number"
                    min="0"
                    {...register(`groups.${selectedGroupIndex}.maxScore`, {
                      required: "필수 입력 사항입니다.",
                      validate: (value) => {
                        const maxScore = Number(value) || 0;
                        const totalScore = groups[
                          selectedGroupIndex
                        ].criteria.reduce(
                          (sum, c) => sum + (Number(c.score) || 0),
                          0
                        );
                        return totalScore <= maxScore;
                      }
                    })}
                    className={`
                      flex-center w-[89px] h-[41px] ml-2 px-[24px] py-[10px] rounded-[7px] 
                      bg-gray-100 text-callout text-gray-700 button-none 
                      ${
                        errors.groups?.[selectedGroupIndex]?.maxScore
                          ? "border border-red-100"
                          : "focus:border-main-100"
                      }
                    `}
                    placeholder="100점"
                  />
                </label>
              </div>
              {errors.groups?.[selectedGroupIndex]?.maxScore && (
                <span className="text-state-error text-right">
                  {errors.groups?.[selectedGroupIndex]?.maxScore?.message}
                </span>
              )}

              {group.criteria.map((criterion, criteriaIndex) => (
                <div
                  key={criterion.id}
                  className="w-full h-auto mt-[18px] bg-gray-100 border border-gray-200 px-[21px] py-[23px] rounded-[12px]"
                >
                  <div className="flex justify-between relative">
                    <div className="flex items-center">
                      <div className="flex-center w-[28px] h-[28px] rounded-full bg-main-400 text-main-100 text-[15.71px] font-bold">
                        {criterion.id}
                      </div>
                      <input
                        type="text"
                        {...register(
                          `groups.${selectedGroupIndex}.criteria.${criteriaIndex}.criteria`,
                          {
                            required: "평가 기준을 입력해주세요"
                          }
                        )}
                        placeholder="평가 기준"
                        className={`min-w-[110px] w-auto h-[40px] ml-3 px-[24px] py-[10px] bg-white-100 border text-subheadline rounded-[7px] outline-none 
                          ${
                            errors.groups?.[selectedGroupIndex]?.criteria?.[
                              criteriaIndex
                            ]?.criteria
                              ? "border-red-100"
                              : "border-gray-200 focus:border-main-100"
                          }`}
                        style={{ width: "var(--input-width, 110px)" }}
                        onInput={(e) => {
                          const target = e.target as HTMLInputElement;
                          const textWidth = target.value.length * 8 + 110;
                          target.style.setProperty(
                            "--input-width",
                            `${Math.max(110, textWidth)}px`
                          );
                        }}
                      />
                    </div>

                    <div className="flex-center">
                      <div
                        className={`flex-center w-auto h-[40px] mr-[10px] px-[24px] py-[10px] bg-white-100 border rounded-[7px] text-subheadline text-gray-500
                        ${
                          errors.groups?.[selectedGroupIndex]?.criteria?.[
                            criteriaIndex
                          ]?.score
                            ? "border-red-100"
                            : "border-gray-200"
                        }`}
                      >
                        <input
                          type="number"
                          {...register(
                            `groups.${selectedGroupIndex}.criteria.${criteriaIndex}.score`,
                            {
                              required: "필수 입력 사항입니다.",
                              validate: (value) => {
                                const otherScoresSum = groups[
                                  selectedGroupIndex
                                ].criteria.reduce((sum, c, idx) => {
                                  if (idx === criteriaIndex) return sum;
                                  return sum + (Number(c.score) || 0);
                                }, 0);

                                const totalScore =
                                  otherScoresSum + (Number(value) || 0);

                                return (
                                  totalScore <= (group.maxScore || 0) ||
                                  `${type} 만점 점수를 초과했어요. 다시 배점을 조율해 주세요.`
                                );
                              }
                            }
                          )}
                          min="0"
                          max={group.maxScore}
                          className="flex-center w-[20px] outline-none button-none"
                          placeholder="0"
                        />
                        <p>/ {group.maxScore}점</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => deleteCriteria(group.id, criterion.id)}
                      >
                        <img
                          src="/assets/ic-minusCircleGray600.svg"
                          alt="삭제"
                        />
                      </button>
                    </div>
                  </div>

                  {/*에러들 */}
                  <div className="flex justify-between">
                    <div className="ml-10">
                      {errors.groups?.[selectedGroupIndex]?.criteria?.[
                        criteriaIndex
                      ]?.criteria && (
                        <span className="text-state-error">
                          {
                            errors.groups?.[selectedGroupIndex]?.criteria?.[
                              criteriaIndex
                            ]?.criteria?.message
                          }
                        </span>
                      )}
                    </div>
                    <div className="items-right mr-9">
                      {errors.groups?.[selectedGroupIndex]?.criteria?.[
                        criteriaIndex
                      ]?.score && (
                        <span className="text-state-error">
                          {
                            errors.groups?.[selectedGroupIndex]?.criteria?.[
                              criteriaIndex
                            ]?.score?.message
                          }
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="mt-[23px]">
                    <p className="text-subheadline text-gray-700 text-left">
                      세부 평가 기준
                    </p>
                    {Array.isArray(criterion.detailCriteria) &&
                      criterion.detailCriteria?.map((detail, index) => (
                        <div
                          key={`${criterion.id}-${index}`}
                          className="flex justify-between w-full h-[36px] mt-[9px] px-[13px] py-[9px] bg-white-100 border border-gray-200 text-gray-1100 text-caption1 rounded-[6px] text-left"
                        >
                          {detail}
                          <button
                            type="button"
                            onClick={() =>
                              deleteDetailCriteria(
                                group.id,
                                criterion.id,
                                index
                              )
                            }
                          >
                            <img
                              src="/assets/ic-minusCircleGray600.svg"
                              alt="삭제"
                              className="w-4 h-4"
                            />
                          </button>
                        </div>
                      ))}
                    <input
                      type="text"
                      value={newDetailCriteria}
                      onChange={(e) => setNewDetailCriteria(e.target.value)}
                      onKeyDown={(e) =>
                        handleDetailCriteria(e, group.id, criterion.id)
                      }
                      placeholder="세부 평가 기준을 입력해 주세요."
                      className={`w-full h-[36px] mt-[9px] px-[13px] py-[9px] bg-white-100 border text-caption1 rounded-[6px] focus:border-main-100 outline-none ${
                        errors.groups?.[selectedGroupIndex]?.criteria?.[
                          criteriaIndex
                        ]?.detailCriteria
                          ? "border border-red-100"
                          : "border-gray-200 focus:border-main-100"
                      }`}
                    />
                  </div>
                  <div className="flex">
                    {errors.groups?.[selectedGroupIndex]?.criteria?.[
                      criteriaIndex
                    ]?.detailCriteria && (
                      <span className="text-state-error">
                        {
                          errors.groups?.[selectedGroupIndex]?.criteria?.[
                            criteriaIndex
                          ]?.detailCriteria?.message
                        }
                      </span>
                    )}
                  </div>
                </div>
              ))}

              <button
                type="button"
                onClick={() => addCriteria(group.id)}
                className="flex-center w-full h-[54px] mt-[34px] bg-main-300 border border-main-400 rounded-[8px] text-main-100 text-callout hover:bg-main-100 hover:text-white-100 group"
              >
                <IdealIcon className="mr-2" />
                평가 기준 추가하기
              </button>
            </div>
          )
      )}
    </div>
  );
}
