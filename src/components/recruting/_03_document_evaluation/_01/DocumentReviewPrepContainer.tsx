import { useCallback, useState } from "react";
import { useGroupStore } from "../../../../store/useStore";
import AddAdminDropdown from "./AddAdminDropdown";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

export default function DocumentReviewPrepContainer() {
  const { group } = useGroupStore();
  const [dropdown, setDropdown] = useState(false);
  const [currentId, setCurrentId] = useState<number | null>(null);
  const [selectedGroupId, setSelectedGroupId] = useState<number>(1);

  const [groups, setGroups] = useState<DocumentReviewForm["groups"]>(() => {
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

    // [공통 그룹] 디폴트로
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
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<DocumentReviewForm>({
    defaultValues: {
      groups: groups
    },
    values: { groups },
    mode: "onBlur"
  });

  // 새 그룹 추가
  const addGroupForm = useCallback(() => {
    const newGroup: DocumentReviewForm["groups"][0] = {
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
    };
    setGroups((prev) => [...prev, newGroup]);
    setSelectedGroupId(newGroup.id);
  }, [groups]);

  // 평가 기준 추가
  const addCriteria = useCallback((groupId: number) => {
    setGroups((prev) =>
      prev.map((group) => {
        if (group.id === groupId) {
          return {
            ...group,
            criteria: [
              ...group.criteria,
              {
                id: group.criteria.length + 1,
                criteria: "",
                detailCriteria: [],
                score: undefined
              }
            ]
          };
        }
        return group;
      })
    );
  }, []);

  // 세부 평가 기준 추가
  const handleDetailCriteria = useCallback(
    (
      e: React.KeyboardEvent<HTMLInputElement>,
      groupId: number,
      criteriaId: number
    ) => {
      if (e.key === "Enter") {
        e.preventDefault(); // 폼 제출 방지
        const newValue = e.currentTarget.value.trim();

        if (newValue) {
          setGroups((prev) => {
            return prev.map((group) => {
              if (group.id === groupId) {
                return {
                  ...group,
                  criteria: group.criteria.map((criterion) => {
                    if (criterion.id === criteriaId) {
                      return {
                        ...criterion,
                        detailCriteria: [
                          ...(criterion.detailCriteria || []),
                          newValue
                        ]
                      };
                    }
                    return criterion;
                  })
                };
              }
              return group;
            });
          });

          // input 값 초기화
          e.currentTarget.value = "";
        }
      }
    },
    []
  );

  // 평가 기준 삭제
  const deleteCriteria = useCallback((groupId: number, criteriaId: number) => {
    setGroups((prev) =>
      prev.map((group) => {
        if (group.id === groupId && group.criteria.length > 1) {
          return {
            ...group,
            criteria: group.criteria.filter((c) => c.id !== criteriaId)
          };
        }
        return group;
      })
    );
  }, []);

  // 세부 평가 기준 삭제
  const deleteDetailCriteria = useCallback(
    (groupId: number, criteriaId: number, detailIndex: number) => {
      setGroups((prev) =>
        prev.map((group) => {
          if (group.id === groupId) {
            return {
              ...group,
              criteria: group.criteria.map((criterion) => {
                if (criterion.id === criteriaId) {
                  return {
                    ...criterion,
                    detailCriteria: criterion.detailCriteria.filter(
                      (_, i) => i !== detailIndex
                    )
                  };
                }
                return criterion;
              })
            };
          }
          return group;
        })
      );
    },
    []
  );

  // 운영진 추가
  const handleAdminSelect = useCallback((admin: string, groupId: number) => {
    setGroups((prev) =>
      prev.map((group) => {
        if (group.id === groupId && !group.admins.includes(admin)) {
          return {
            ...group,
            admins: [...group.admins, admin]
          };
        }
        return group;
      })
    );
    setDropdown(false);
  }, []);

  // 운영진 삭제
  const removeAdmin = useCallback((groupId: number, adminToRemove: string) => {
    setGroups((prev) =>
      prev.map((group) => {
        if (group.id === groupId) {
          return {
            ...group,
            admins: group.admins.filter((admin) => admin !== adminToRemove)
          };
        }
        return group;
      })
    );
  }, []);

  // 그룹명 변경
  const handleGroupNameChange = useCallback(
    (groupId: number, newName: string) => {
      setGroups((prev) =>
        prev.map((group) =>
          group.id === groupId ? { ...group, groupName: newName } : group
        )
      );
    },
    []
  );

  const onSubmit = handleSubmit((data) => {
    // 현재 groups 상태를 사용하여 제출
    const formData: DocumentReviewForm = {
      groups: groups.map((group) => ({
        ...group,
        criteria: group.criteria.map((criterion) => ({
          ...criterion,
          detailCriteria: criterion.detailCriteria || [] // 빈 배열 대신 실제 데이터 사용
        }))
      }))
    };
    console.log("제출된 데이터:", formData);
  });

  return (
    <form className="w-[1016px]" onSubmit={onSubmit}>
      <div className="ml-8 w-full mt-[34px]">
        {/* 전체 지원자 수 섹션 */}
        <div className="flex">
          <p className="section-title">전체 지원자 수</p>
          <div className="tooltip">
            우리 동아리에 지원한 전체 지원자 수를 보여드립니다.
          </div>
        </div>

        <div className="flex gap-[15px] mt-[10px] w-full h-auto py-[28px] pb-[29px] px-[31px] bg-white-100 border border-[#D6D7DA] rounded-[21px]">
          <div className="flex items-center gap-[15px]">
            <p>전체</p>
            <div className="flex-center w-auto h-[38px] px-[20px] py-[9.5px] rounded-[6px] bg-gray-100 text-[16px] font-medium">
              175명
            </div>
          </div>
          {groups.map((groupItem) => (
            <div key={groupItem.id} className="flex items-center gap-[15px]">
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
            <div className="tooltip">
              서류 평가 시, 그룹을 형성하여 지원자를 나누고, 각 그룹별 평가자를
              분담 해주세요.
            </div>
          </div>
          <button
            type="button"
            className="flex-center w-[150.93] h-[48.6px] pl-[24.54px] pr-[17.93px] py-[18.23px] bg-main-300 border border-main-400 rounded-[8.95px] text-main-100 hover:bg-main-100 hover:text-white-100 group"
            onClick={addGroupForm}
          >
            <div className="relative mr-[4.81px]">
              <img
                alt="그룹 추가 버튼"
                src="/assets/ic-mainColorPlus.svg"
                className="w-[13px] h-[13px] group-hover:opacity-0"
              />
              <img
                alt="그룹 추가 버튼"
                src="/assets/ic-whiteColorPlus.svg"
                className="w-[13px] h-[13px] absolute top-0 left-0 opacity-0 group-hover:opacity-100"
              />
            </div>
            <span className="text-semibold">그룹 추가하기</span>
          </button>
        </div>

        <div className="w-full min-h-[318px] mt-[10px] pt-[18px] pb-[29px] px-[36px] bg-white-100 border border-[#D6D7DA] rounded-[21px]">
          <div className="grid grid-cols-3 gap-6">
            {groups.map((groupItem) => (
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
            ))}
          </div>
        </div>

        {/* 서류 합격자 인원수 섹션 */}
        <div className="flex mt-[34px]">
          <p className="section-title">서류 합격자 인원수</p>
          <div className="tooltip">
            앞서 설정한 서류 합격자 인원 수를 보여드립니다.
          </div>
        </div>

        <div className="flex gap-[15px] mt-[10px] w-full h-auto py-[28px] pb-[29px] px-[31px] bg-white-100 border border-[#D6D7DA] rounded-[21px]">
          <div className="flex items-center gap-[15px]">
            <p className="text-body">전체</p>
            <div className="flex-center w-auto h-[38px] px-[25px] py-[9.5px] rounded-[6px] bg-gray-100 text-[16px] font-medium">
              상위 30명
            </div>
          </div>
          {groups.map((groupItem) => (
            <div key={groupItem.id} className="flex items-center gap-[15px]">
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
              className={`flex-center w-[162px] h-[43px] rounded-t-[11px] border border-main-400 border-b-0 text-callout 
                ${
                  selectedGroupId === groupItem.id
                    ? "bg-main-100 text-white-100"
                    : "bg-gray-100 text-main-100"
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
                      max="100"
                      value={group.maxScore}
                      onChange={(e) => {
                        setGroups((prev) =>
                          prev.map((g) =>
                            g.id === group.id
                              ? { ...g, maxScore: parseInt(e.target.value) }
                              : g
                          )
                        );
                      }}
                      className="flex-center w-[89px] h-[41px] ml-2 px-[24px] py-[10px] rounded-[7px] bg-gray-100 text-callout text-gray-700 button-none focus:border-main-100"
                      placeholder="100점"
                    />
                  </label>
                </div>

                {group.criteria.map((criterion) => (
                  <div
                    key={criterion.id}
                    className="w-full h-auto mt-[18px] bg-gray-100 border border-gray-200 px-[21px] py-[23px] rounded-[12px]"
                  >
                    <div className="flex justify-between">
                      <div className="flex items-center">
                        <div className="flex-center w-[28px] h-[28px] rounded-full bg-main-400 text-main-100 text-[15.71px] font-bold">
                          {criterion.id}
                        </div>
                        <input
                          type="text"
                          value={criterion.criteria}
                          onChange={(e) => {
                            setGroups((prev) =>
                              prev.map((g) =>
                                g.id === group.id
                                  ? {
                                      ...g,
                                      criteria: g.criteria.map((c) =>
                                        c.id === criterion.id
                                          ? { ...c, criteria: e.target.value }
                                          : c
                                      )
                                    }
                                  : g
                              )
                            );
                          }}
                          placeholder="평가 기준"
                          className="w-[110px] max-w-full h-[40px] ml-3 px-[24px] py-[10px] bg-white-100 border border-gray-200 text-subheadline rounded-[7px] outline-none focus:border-main-100"
                        />
                      </div>
                      <div className="flex-center">
                        <div className="flex w-auto h-[40px] mr-[10px] px-[24px] py-[10px] bg-white-100 border border-gray-200 rounded-[7px] text-subheadline text-gray-500">
                          <input
                            type="number"
                            value={criterion.score}
                            onChange={(e) => {
                              setGroups((prev) =>
                                prev.map((g) =>
                                  g.id === group.id
                                    ? {
                                        ...g,
                                        criteria: g.criteria.map((c) =>
                                          c.id === criterion.id
                                            ? {
                                                ...c,
                                                score: parseInt(e.target.value)
                                              }
                                            : c
                                        )
                                      }
                                    : g
                                )
                              );
                            }}
                            min="0"
                            className="flex-center w-[20px] outline-none button-none"
                            placeholder="0"
                          />
                          <p>/100점</p>
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

                    <div className="mt-[23px]">
                      <p className="text-subheadline text-gray-700 text-left">
                        세부 평가 기준
                      </p>
                      {criterion.detailCriteria?.map((detail, index) => (
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
                        placeholder="세부 평가 기준을 입력해 주세요."
                        className="w-full h-[36px] mt-[9px] px-[13px] py-[9px] bg-white-100 border border-gray-200 text-caption1 rounded-[6px] focus:border-main-100 outline-none"
                        onKeyDown={(e) =>
                          handleDetailCriteria(e, group.id, criterion.id)
                        }
                      />
                    </div>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={() => addCriteria(group.id)}
                  className="flex-center w-full h-[54px] mt-[34px] bg-main-300 border border-main-400 rounded-[8px] text-main-100 hover:bg-main-100 hover:text-white-100 group"
                >
                  <div className="relative mr-2">
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
                  <span className="text-callout">평가 기준 추가하기</span>
                </button>
              </div>
            )
        )}
      </div>

      <div className="flex justify-end mt-6 mb-6 px-8">
        <button
          type="submit"
          className="px-6 py-2 bg-main-100 text-white rounded-[8px] hover:bg-main-200"
        >
          저장하기
        </button>
      </div>
    </form>
  );
}
