import { useCallback, useMemo, useState } from "react";
import { useGroupStore } from "../../../../store/useStore";
import AddAdminDropdown from "./AddAdminDropdown";
import { useForm } from "react-hook-form";
import { ReactComponent as IdealIcon } from "../../../../assets/ic-plus.svg";
import EvaluationCriteria from "../../common/EvaluationCriteria";

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
        admins: [], //여기에 admins를 다 넣어야 할 것 같긴한딩ㅇ.. How..?
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
    mode: "onTouched",
    reValidateMode: "onChange"
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
            className="flex-center w-[150.93] h-[48.6px] pl-[24.54px] pr-[17.93px] py-[18.23px] bg-main-300 border border-main-400 rounded-[8.95px] text-main-100 font-semibold hover:bg-main-100 hover:text-white-100 group"
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
        <EvaluationCriteria
          groups={groups}
          selectedGroupId={selectedGroupId}
          selectedGroupIndex={selectedGroupIndex}
          setSelectedGroupId={setSelectedGroupId}
          text="서류"
          register={register}
          setValue={setValue}
          watch={watch}
          errors={errors}
        />
      </div>
    </form>
  );
}
