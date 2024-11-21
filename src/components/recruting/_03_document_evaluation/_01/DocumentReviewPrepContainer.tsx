import { useState } from "react";
import { useGroupStore } from "../../../../store/useStore";
import AddAdminDropdown from "./AddAdminDropdown";
import { Link } from "react-router-dom";
import { useForm, useFieldArray } from "react-hook-form";

export default function DocumentReviewPrepContainer() {
  const { group } = useGroupStore();
  const [dropdown, setDropdown] = useState(false);
  const [newGroupCreation, setNewGroupCreation] = useState<GroupForm[]>([]); //새로 생성된 그룹
  const [currentId, setCurrentId] = useState<number | null>(null);
  const [criteria, setCriteria] = useState<EvaluationCriteria[]>([
    {
      id: 1,
      criteria: "",
      detailCriteria: [],
      score: undefined
    }
  ]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue
  } = useForm<DocumentReviewForm>({
    mode: "onBlur",
    defaultValues: {
      groups: group.map((groupName, index) => ({
        id: index + 1,
        groupName: groupName.name,
        admins: []
      })),
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
  });

  const onSubmit = (data: DocumentReviewForm) => {
    const allGroups = [
      ...groupsWithAdmins,
      ...newGroupCreation.map((group) => ({
        id: group.id,
        groupName: { name: group.groupName },
        admins: group.admins
      }))
    ];

    // score 값을 form data에서 가져와서 criteria에 적용
    const updatedCriteria = criteria.map((item, index) => ({
      ...item,
      score: data.criteria[index]?.score
    }));

    const formData = {
      ...data,
      groups: allGroups,
      criteria: updatedCriteria
    };

    console.log(formData);
  };

  const handleFormKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === "Enter") {
      const target = e.target as HTMLElement;

      // 세부 평가 기준 입력 필드인 경우에만 Enter 키 허용
      if (!target.classList.contains("detail-criteria-input")) {
        e.preventDefault();
      }
    }
  };

  const addGroupForm = () => {
    const newFormId =
      newGroupCreation.length > 0
        ? Math.max(...newGroupCreation.map((form) => form.id)) + 1
        : 1;
    setNewGroupCreation([
      ...newGroupCreation,
      {
        id: newFormId,
        groupName: "",
        admins: []
      }
    ]);
  };

  const addCriteria = () => {
    setCriteria([
      ...criteria,
      {
        id: criteria.length + 1,
        criteria: "",
        detailCriteria: [],
        score: undefined
      }
    ]);
  };

  const deleteCriteria = (id: number) => {
    setCriteria(criteria.filter((item) => item.id !== id));
  };

  const handleDetailCriteria = (
    e: React.KeyboardEvent<HTMLInputElement>,
    id: number
  ) => {
    if (e.key === "Enter") {
      e.preventDefault(); // 수정 5: Enter 키로 인한 폼 제출 방지

      if (e.currentTarget.value.trim()) {
        const newCriteria = [...criteria];
        const index = newCriteria.findIndex((c) => c.id === id);
        newCriteria[index].detailCriteria = [
          ...newCriteria[index].detailCriteria,
          e.currentTarget.value.trim()
        ];
        e.currentTarget.value = "";
        setCriteria(newCriteria);
      }
    }
  };

  const deleteDetailCriteria = (criteriaId: number, detailIndex: number) => {
    const newCriteria = [...criteria];
    const index = newCriteria.findIndex((c) => c.id === criteriaId);
    newCriteria[index].detailCriteria = newCriteria[
      index
    ].detailCriteria.filter((_, i) => i !== detailIndex);
    setCriteria(newCriteria);
  };

  const [groupsWithAdmins, setGroupsWithAdmins] = useState<GroupWithAdmin[]>(
    group.map((groupName, index) => ({
      id: index + 1,
      groupName,
      admins: []
    }))
  );

  const handleAdminSelect = (admin: string, id: number, isNewGroup = false) => {
    if (isNewGroup) {
      setNewGroupCreation((prev) =>
        prev.map((form) => {
          if (form.id === id && !form.admins.includes(admin)) {
            return { ...form, admins: [...form.admins, admin] };
          }
          return form;
        })
      );
    } else {
      setGroupsWithAdmins((prev) =>
        prev.map((group) => {
          if (group.id === id && !group.admins.includes(admin)) {
            return { ...group, admins: [...group.admins, admin] };
          }
          return group;
        })
      );
    }
    setDropdown(false);
  };

  const removeAdmin = (
    id: number,
    adminToRemove: string,
    isNewGroup = false
  ) => {
    if (isNewGroup) {
      setNewGroupCreation((prev) =>
        prev.map((form) => {
          if (form.id === id) {
            return {
              ...form,
              admins: form.admins.filter((admin) => admin !== adminToRemove)
            };
          }
          return form;
        })
      );
    } else {
      setGroupsWithAdmins((prev) =>
        prev.map((group) => {
          if (group.id === id) {
            return {
              ...group,
              admins: group.admins.filter((admin) => admin !== adminToRemove)
            };
          }
          return group;
        })
      );
    }
  };

  return (
    <form
      className="w-[1016px]"
      onSubmit={handleSubmit(onSubmit)}
      onKeyDown={handleFormKeyDown}
    >
      <div className="ml-8 w-full mt-[34px]">
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
          {groupsWithAdmins.map((groupItem) => (
            <div key={groupItem.id} className="flex items-center gap-[15px]">
              <p>{groupItem.groupName.name}</p>
              <div className="flex-center w-auto h-[38px] px-[20px] py-[9.5px] rounded-[6px] bg-gray-100 text-[16px] font-medium">
                175명
              </div>
            </div>
          ))}
        </div>

        {groupsWithAdmins?.length ? (
          <div>
            <div className="flex mt-[34px]">
              <p className="section-title">서류 평가 역할 설정</p>
              <div className="tooltip">
                각 그룹별 서류를 평가할 운영진을 분담해 주세요.
              </div>
            </div>
            <div className="grid grid-cols-3 gap-6 mt-[10px] w-full h-auto py-[28px] pb-[29px] px-[36px] bg-white-100 border border-[#D6D7DA] rounded-[21px]">
              {groupsWithAdmins.map((groupItem) => (
                <div key={groupItem.id}>
                  <div className="flex-center w-full h-[46px] bg-gray-100 border border-gray-300 rounded-[7px] text-callout text-main-100">
                    {groupItem.groupName.name}
                  </div>
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
        ) : (
          <div>
            <div className="flex justify-between mt-[34px]">
              <div className="flex items-center">
                <p className="section-title">서류 평가 역할 설정</p>
                <div className="tooltip">
                  서류 평가 시, 그룹을 형성하여 지원자를 나누고, 각 그룹별
                  평가자를 분담 해주세요.
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
            <div className="flex mt-[10px] w-full min-h-[318px] pt-[18px] pb-[29px] px-[36px] bg-white-100 border border-[#D6D7DA] rounded-[21px] text-body text-gray-400">
              {newGroupCreation.length > 0 ? (
                <div className="w-full grid grid-cols-3 gap-6">
                  {newGroupCreation.map((form, id) => (
                    <div key={form.id} className="max-w-[286px]">
                      <div className="flex text-[12.25px] font-semibold gap-[8.33px] text-[#5C6067]">
                        <p>지원자 수</p>
                        <div className="flex-center bg-gray-100 h-[22px] px-[6.74px] py-[3.52px] rounded-[7.35px]">
                          {/*todo: 나중에 api 연동 후 지원자수 수정 */}
                          23명
                        </div>
                        <p>운영자 수</p>
                        <div className="flex-center bg-gray-100 h-[22px] px-[6.74px] py-[3.52px] rounded-[7.35px]">
                          {form.admins?.length || 0}명
                        </div>
                      </div>
                      <input
                        type="text"
                        {...register(`groups.${id}.groupName`)}
                        placeholder="그룹명"
                        value={form.groupName}
                        onChange={(e) => {
                          setNewGroupCreation((prev) =>
                            prev.map((item) =>
                              item.id === form.id
                                ? { ...item, groupName: e.target.value }
                                : item
                            )
                          );
                        }}
                        className="flex-center w-full h-[46px] mt-[7px] py-[12.5px] text-center text-main-100 rounded-[7px] bg-gray-50 border border-gray-200 text-callout outline-none focus:border-main-100"
                      />
                      <div className="mt-4">
                        {form.admins?.map((admin) => (
                          <div
                            key={admin}
                            className="relative flex-center w-full h-[43px] mb-[10px] rounded-[10px] border border-gray-300 bg-white-100 text-subheadline"
                          >
                            <span className="text-gray-800">{admin}</span>
                            <img
                              src="/assets/ic-minusCircle.svg"
                              alt="운영진 삭제 버튼"
                              onClick={() => removeAdmin(form.id, admin, true)}
                              className="absolute right-[19px] cursor-pointer"
                            />
                          </div>
                        ))}
                      </div>
                      <button
                        type="button"
                        className="relative flex-center w-full h-[46px] mt-[15px] bg-gray-100 border border-gray-300 rounded-[7px] text-subheadline text-gray-500"
                        onClick={() => {
                          setCurrentId(form.id);
                          setDropdown(!dropdown);
                        }}
                      >
                        <img src="/assets/ic-plus.svg" className="mr-2" />
                        <p>운영진 추가</p>
                        {dropdown && currentId === form.id && (
                          <AddAdminDropdown
                            onSelect={(admin) =>
                              handleAdminSelect(admin, form.id, true)
                            }
                            currentAdmins={form.admins}
                          />
                        )}
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="flex-center w-full">
                  그룹을 추가해 주세요. <br />
                  그룹을 추가하지 않으면, 운영진 모두가 모든 지원자를 평가하게
                  됩니다.
                </p>
              )}
            </div>
          </div>
        )}

        {/*서류 합격자 인원수 */}
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
          {groupsWithAdmins.map((groupItem) => (
            <div key={groupItem.id} className="flex items-center gap-[15px]">
              <p className="text-body">{groupItem.groupName.name}</p>
              <div className="flex-center w-auto h-[38px] px-[25px] p y-[9.5px] rounded-[6px] bg-gray-100 text-[16px] font-medium">
                상위 30명
              </div>
            </div>
          ))}
        </div>

        {/*평가 기준 설정하기*/}
        <div className="flex mt-[34px]">
          <p className="section-title">평가 기준 설정하기</p>
          <div className="tooltip">
            평가 기준을 설정해 주세요. 설정된 내용은 개별 평가 진행 시,
            반영됩니다.
          </div>
        </div>
        <div className="flex mt-[18px]">
          {groupsWithAdmins?.length ? (
            groupsWithAdmins.map((groupItem) => (
              <button
                type="button"
                className="flex-center w-[162px] h-[43px] rounded-t-[11px] bg-gray-100 border border-main-400 border-b-0 text-callout text-main-100 focus:bg-main-100 focus:text-white-100"
              >
                {groupItem.groupName.name}
              </button>
            ))
          ) : (
            <button
              type="button"
              key="all-groups"
              className="flex-center w-[162px] h-[43px] rounded-t-[11px] border border-main-400 border-b-0 text-callout text-white-100 bg-main-100"
            >
              전체
            </button>
          )}
        </div>
        <div className="flex flex-col w-full h-auto py-[30px] px-[36px] bg-white-100 border border-[#D6D7DA] rounded-tr-[21px] rounded-bl-[21px] rounded-br-[21px]">
          <div className="flex items-center justify-between w-full ">
            <p className="text-gray-800 text-[16px] font-bold underline underline-offset-2">
              <Link to="">지원서 폼 다시 보기</Link>
            </p>
            <label className="flex-center text-gray-800 text-[16px] font-bold">
              서류 만점 점수
              <input
                type="number"
                {...register("maxScore")}
                min="0"
                max="100"
                className="flex-center w-[89px] h-[41px] ml-2 px-[24px] py-[10px] rounded-[7px] bg-gray-100 text-callout  text-gray-700 button-none focus:border-main-100"
                placeholder="100점"
              />
            </label>
          </div>

          {criteria.map((item, id) => (
            <div className="w-full h-auto mt-[18px] bg-gray-100 border border-gray-200 px-[21px] py-[23px] rounded-[12px]">
              <div className="flex justify-between">
                <div className="flex items-center">
                  <div className="flex-center w-[28px] h-[28px] rounded-full bg-main-400 text-main-100 text-[15.71px] font-bold">
                    {item.id}
                  </div>
                  <input
                    type="text"
                    {...register(`criteria.${id}.criteria`)}
                    value={item.criteria}
                    onChange={(e) => {
                      const newCriteria = [...criteria];
                      const index = newCriteria.findIndex(
                        (c) => c.id === item.id
                      );
                      newCriteria[index].criteria = e.target.value;
                      setCriteria(newCriteria);
                    }}
                    placeholder="평가 기준"
                    className="w-[110px] max-w-full h-[40px] ml-3 px-[24px] py-[10px] bg-white-100 border border-gray-200 text-subheadline rounded-[7px] outline-none  focus:border-main-100"
                  />
                </div>
                <div className="flex-center">
                  <div className="flex w-auto h-[40px] mr-[10px] px-[24px] py-[10px] bg-white-100 border border-gray-200 rounded-[7px] text-subheadline text-gray-500">
                    <input
                      type="number"
                      {...register(`criteria.${id}.score`, {
                        valueAsNumber: true,
                        min: 0
                      })}
                      placeholder="0"
                      min="0"
                      className="flex-center w-[20px] outline-none button-none "
                    />
                    <p>/100점</p>
                  </div>
                  <button type="button" onClick={() => deleteCriteria(item.id)}>
                    <img
                      src="/assets/ic-minusCircleGray600.svg"
                      alt="삭제"
                    ></img>
                  </button>
                </div>
              </div>
              <div className="mt-[23px]">
                <p className="text-subheadline text-gray-700 text-left">
                  세부 평가 기준
                </p>

                {/* 기존 세부 평가 기준 리스트 */}
                {item.detailCriteria.map((detail, index) => (
                  <div
                    key={index}
                    className="flex justify-between w-full h-[36px] mt-[9px] px-[13px] py-[9px] bg-white-100 border border-gray-200 text-gray-1100 text-caption1 rounded-[6px] text-left outline-none"
                  >
                    {detail}
                    <button
                      type="button"
                      onClick={() => deleteDetailCriteria(item.id, index)}
                    >
                      <img
                        src="/assets/ic-minusCircleGray600.svg"
                        alt="삭제"
                        className="w-4 h-4"
                      />
                    </button>
                  </div>
                ))}

                {/* 새로운 세부 평가 기준 입력 */}
                <input
                  type="text"
                  {...register(`criteria.${id}.detailCriteria`)}
                  placeholder="세부 평가 기준을 입력해 주세요."
                  className="detail-criteria-input w-full h-[36px] mt-[9px] px-[13px] py-[9px] bg-white-100 border border-gray-200 text-caption1 rounded-[6px]  focus:border-main-100 outline-none"
                  onKeyDown={(e) => handleDetailCriteria(e, item.id)}
                />
              </div>
            </div>
          ))}

          <button
            onClick={addCriteria}
            type="button"
            className="flex-center w-full h-[54px] mt-[34px] bg-main-300 border border-main-400 rounded-[8px] text-main-100 hover:bg-main-100 hover:text-white-100 group" // group 추가
          >
            <div className="relative mr-2">
              <img
                alt="질문 추가 버튼"
                src="/assets/ic-mainColorPlus.svg"
                className="group-hover:opacity-0 "
              />
              <img
                alt="질문 추가 버튼"
                src="/assets/ic-whiteColorPlus.svg"
                className="absolute top-0 left-0 opacity-0 group-hover:opacity-100 "
              />
            </div>
            <span className="text-callout ">평가 기준 추가하기</span>
          </button>
        </div>
        <button type="submit">dkdk</button>
      </div>
    </form>
  );
}
