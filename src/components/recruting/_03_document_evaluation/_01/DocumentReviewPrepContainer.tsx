import { useCallback, useMemo, useState } from "react";
import { useGroupStore } from "../../../../store/useStore";
import { useForm } from "react-hook-form";
import EvaluationCriteria from "../../common/EvaluationCriteria";
import RoleSettings from "../../common/RoleSetting";

export default function DocumentReviewPrepContainer() {
  const { group } = useGroupStore();
  const [dropdown, setDropdown] = useState(false);
  const [currentId, setCurrentId] = useState<number | null>(null);
  const [selectedGroupId, setSelectedGroupId] = useState<number>(1);

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
        <div>
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
        </div>

        <RoleSettings
          groups={groups}
          dropdown={dropdown}
          currentId={currentId}
          setValue={setValue}
          setDropdown={setDropdown}
          setCurrentId={setCurrentId}
          addGroupForm={addGroupForm}
          handleAdminSelect={handleAdminSelect}
          removeAdmin={removeAdmin}
          handleGroupNameChange={handleGroupNameChange}
          type="서류"
        />

        {/* 평가 기준 설정하기 섹션 */}
        <EvaluationCriteria
          groups={groups}
          selectedGroupId={selectedGroupId}
          selectedGroupIndex={selectedGroupIndex}
          setSelectedGroupId={setSelectedGroupId}
          type="서류"
          register={register}
          setValue={setValue}
          watch={watch}
          errors={errors}
        />
      </div>
    </form>
  );
}
