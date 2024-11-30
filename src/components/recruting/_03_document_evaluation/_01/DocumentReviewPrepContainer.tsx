import { useCallback, useMemo, useState } from "react";
import { useGroupStore } from "../../../../store/useStore";
import AddAdminDropdown from "./AddAdminDropdown";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ReactComponent as IdealIcon } from "../../../../assets/ic-plus.svg";

export default function DocumentReviewPrepContainer() {
  const { group } = useGroupStore();
  const [dropdown, setDropdown] = useState(false);
  const [currentId, setCurrentId] = useState<number | null>(null);
  const [selectedGroupId, setSelectedGroupId] = useState<number>(1);
  const [newDetailCriteria, setNewDetailCriteria] = useState<string>("");

  const defaultGroups = useMemo(() => {
    const existingGroups =
      group.length > 0
        ? group.map((g, index) => ({
            id: index + 2,
            groupName: g.name,
            admins: [],
            criteria: [
              {
                id: 1,
                criteria: "",
                detailCriteria: [],
                score: undefined
              }
            ],
            maxScore: undefined
          }))
        : [];

    return [
      {
        id: 1,
        groupName: "공통",
        admins: [],
        criteria: [
          {
            id: 1,
            criteria: "",
            detailCriteria: [],
            score: undefined
          }
        ],
        maxScore: undefined
      },
      ...existingGroups
    ];
  }, [group]);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors }
  } = useForm<DocumentReviewForm>({
    defaultValues: {
      groups: defaultGroups
    },
    mode: "onChange"
  });

  const groups = watch("groups");

  const selectedGroupIndex = useMemo(
    () => groups.findIndex((g) => g.id === selectedGroupId),
    [groups, selectedGroupId]
  );

  const addGroupForm = useCallback(() => {
    setValue("groups", [
      ...groups,
      {
        id: groups.length + 1,
        groupName: "",
        admins: [],
        criteria: [
          {
            id: 1,
            criteria: "",
            detailCriteria: [],
            score: undefined
          }
        ],
        maxScore: undefined
      }
    ]);
    setSelectedGroupId(groups.length + 1);
  }, [groups, setValue]);

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

          // 입력 필드 초기화
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

  const handleAdminSelect = useCallback(
    (admin: string, groupId: number) => {
      const groupIndex = groups.findIndex((g) => g.id === groupId);
      const currentAdmins = groups[groupIndex].admins;

      if (!currentAdmins.includes(admin)) {
        setValue(`groups.${groupIndex}.admins`, [...currentAdmins, admin]);
      }
      setDropdown(false);
    },
    [groups, setValue]
  );

  const removeAdmin = useCallback(
    (groupId: number, adminToRemove: string) => {
      const groupIndex = groups.findIndex((g) => g.id === groupId);
      setValue(
        `groups.${groupIndex}.admins`,
        groups[groupIndex].admins.filter((admin) => admin !== adminToRemove)
      );
    },
    [groups, setValue]
  );

  const handleGroupNameChange = useCallback(
    (groupId: number, newName: string) => {
      const groupIndex = groups.findIndex((g) => g.id === groupId);
      setValue(`groups.${groupIndex}.groupName`, newName);
    },
    [groups, setValue]
  );

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  return (
    <form className="w-full" onSubmit={onSubmit}>
      <div className="ml-8 w-full mt-[34px]">
        {/* 전체 지원자 수 섹션 */}
        <div className="flex">
          <p className="section-title">전체 지원자 수</p>
          <div className="tooltip">
            우리 동아리에 지원한 전체 지원자 수를 보여드립니다.
          </div>
        </div>

        <div className="flex gap-[31px] mt-[10px] w-full h-auto py-[28px] pb-[29px] px-[31px] bg-white-100 border border-[#D6D7DA] rounded-[21px] overflow-auto [&::-webkit-scrollbar]:hidden whitespace-nowrap">
          {groups.map((groupItem) => (
            <div key={groupItem.id} className="flex items-center gap-[15px] ">
              <p>{groupItem.groupName}</p>
              <div className="flex-center w-auto h-[38px] px-[20px] py-[9.5px] rounded-[6px] bg-gray-100 text-[16px] font-medium">
                175명
              </div>
            </div>
          ))}
        </div>

        {/* 서류 평가 역할 설정 섹션 */}
        <div className="flex justify-between mt-[34px]">
          <div className="flex items-center">
            <p className="section-title">서류 평가 역할 설정</p>
            {/*공통 그룹만 있을 때 툴팁 */}
            {groups.length === 1 ? (
              <div className="tooltip">
                서류 평가 시, 그룹을 형성하여 지원자를 나누고, 각 그룹별
                평가자를 분담 해주세요.
              </div>
            ) : (
              <div className="tooltip">
                각 그룹별 평가할 운영진을 분담해 주세요.
              </div>
            )}
          </div>
          <button
            type="button"
            className="flex-center w-[150.93] h-[48.6px] pl-[24.54px] pr-[17.93px] py-[18.23px] bg-main-300 border border-main-400 rounded-[8.95px] text-main-100 text-semibold hover:bg-main-100 hover:text-white-100 group"
            onClick={addGroupForm}
          >
            <IdealIcon className="mr-[4.81px]" />
            그룹 추가하기
          </button>
        </div>

        <div className="w-full min-h-[318px] mt-[10px] pt-[18px] pb-[29px] px-[36px] bg-white-100 border border-[#D6D7DA] rounded-[21px]">
          {groups.length === 1 ? (
            // 공통 그룹만 있는 경우
            <p className="flex- mt-[100px] text-gray-400 text-body">
              그룹을 추가해 주세요.<br></br>
              그룹을 추가하지 않으면, 운영진 모두가 모든 지원자를 평가하게
              됩니다.
            </p>
          ) : (
            <div className="grid grid-cols-3 gap-6">
              {groups.map(
                (groupItem) =>
                  groupItem.id !== 1 && (
                    <div key={groupItem.id} className="max-w-[286px]">
                      <div className="flex text-[12.25px] font-semibold gap-[8.33px] text-[#5C6067]">
                        <p>지원자 수</p>
                        <div className="flex-center bg-gray-100 h-[22px] px-[6.74px] py-[3.52px] rounded-[7.35px]">
                          23명
                        </div>
                        <p>운영자 수</p>
                        <div className="flex-center bg-gray-100 h-[22px] px-[6.74px] py-[3.52px] rounded-[7.35px]">
                          {groupItem.admins?.length || 0}명
                        </div>
                      </div>
                      <input
                        type="text"
                        value={groupItem.groupName}
                        onChange={(e) =>
                          handleGroupNameChange(groupItem.id, e.target.value)
                        }
                        placeholder="그룹명"
                        className="flex-center w-full h-[46px] mt-[7px] py-[12.5px] text-center text-main-100 rounded-[7px] bg-gray-50 border border-gray-200 text-callout outline-none focus:border-main-100"
                      />
                      <div className="mt-4">
                        {groupItem.admins.map((admin) => (
                          <div
                            key={admin}
                            className="relative flex-center w-full h-[43px] mb-[10px] rounded-[10px] border border-gray-300 bg-white-100 text-subheadline"
                          >
                            <span className="text-gray-800">{admin}</span>
                            <img
                              src="/assets/ic-minusCircle.svg"
                              alt="운영진 삭제 버튼"
                              onClick={() => removeAdmin(groupItem.id, admin)}
                              className="absolute right-[19px] cursor-pointer"
                            />
                          </div>
                        ))}
                      </div>
                      <button
                        type="button"
                        className="relative flex-center w-full h-[46px] mt-[15px] bg-gray-100 border border-gray-300 rounded-[7px] text-subheadline text-gray-500"
                        onClick={() => {
                          setCurrentId(groupItem.id);
                          setDropdown(!dropdown);
                        }}
                      >
                        <img src="/assets/ic-plus.svg" className="mr-2" />
                        <p>운영진 추가</p>
                        {dropdown && currentId === groupItem.id && (
                          <AddAdminDropdown
                            onSelect={(admin) =>
                              handleAdminSelect(admin, groupItem.id)
                            }
                            currentAdmins={groupItem.admins}
                          />
                        )}
                      </button>
                    </div>
                  )
              )}
            </div>
          )}
        </div>

        {/* 서류 합격자 인원수 섹션 */}
        <div className="flex mt-[34px]">
          <p className="section-title">서류 합격자 인원수</p>
          <div className="tooltip">
            앞서 설정한 서류 합격자 인원 수를 보여드립니다.
          </div>
        </div>

        <div className="flex gap-[15px] mt-[10px] w-full h-auto py-[28px] pb-[29px] px-[31px] bg-white-100 border border-[#D6D7DA] rounded-[21px] overflow-auto [&::-webkit-scrollbar]:hidden whitespace-nowrap">
          {groups.map((groupItem) => (
            <div key={groupItem.id} className="flex items-center gap-[15px] ">
              <p className="text-body">{groupItem.groupName}</p>
              <div className="flex-center w-auto h-[38px] px-[25px] py-[9.5px] rounded-[6px] bg-gray-100 text-[16px] font-medium">
                상위 30명
              </div>
            </div>
          ))}
        </div>

        {/* 평가 기준 설정하기 섹션 */}
        <div className="flex mt-[34px]">
          <p className="section-title">평가 기준 설정하기</p>
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
                    <Link to="">지원서 폼 다시 보기</Link>
                  </p>
                  <label className="flex-center text-gray-800 text-[16px] font-bold">
                    서류 만점 점수
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
                            const textWidth = target.value.length * 8 + 110; // 기본 너비 110px에 텍스트 길이에 따라 증가
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
                              : "border-gray-200 "
                          }`}
                        >
                          <input
                            type="number"
                            {...register(
                              `groups.${selectedGroupIndex}.criteria.${criteriaIndex}.score`,
                              {
                                required: "필수 입력 사항입니다.",
                                validate: (value) => {
                                  // 현재 입력하는 값을 제외한 다른 score들의 합계 계산
                                  const otherScoresSum = groups[
                                    selectedGroupIndex
                                  ].criteria.reduce((sum, c, idx) => {
                                    if (idx === criteriaIndex) return sum;
                                    return sum + (Number(c.score) || 0);
                                  }, 0);

                                  // 현재 입력값을 포함한 총합 계산
                                  const totalScore =
                                    otherScoresSum + (Number(value) || 0);

                                  return (
                                    totalScore <= (group.maxScore || 0) ||
                                    "서류 만점 점수를 초과했어요. 다시 배점을 조율해 주세요."
                                  );
                                }
                              }
                            )}
                            min="0"
                            max={group.maxScore}
                            className={`flex-center w-[20px] outline-none button-none
                              `}
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
                  {/* <div className="relative mr-2">
                    <img
                      alt="평가 기준 추가"
                      src="/assets/ic-mainColorPlus.svg"
                      className="group-hover:opacity-0"
                    />
                    <img
                      alt="평가 기준 추가"
                      src="/assets/ic-whiteColorPlus.svg"
                      className="absolute top-0 left-0 opacity-0 group-hover:opacity-100"
                    />
                  </div>
                  <span className="">평가 기준 추가하기</span> */}
                  <IdealIcon className="mr-2" />
                  평가 기준 추가하기
                </button>
              </div>
            )
        )}
      </div>
      <button onSubmit={onSubmit}>ㅇㄶㅁㄴㅇㅎ</button>
    </form>
  );
}
