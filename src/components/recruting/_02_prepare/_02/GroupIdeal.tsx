import { useForm, useFieldArray } from "react-hook-form";
import { useGroupStore } from "../../../../store/useStore";
import { useRef } from "react";

export default function GroupIdeal({
  onFormChange
}: {
  onFormChange?: (data: GroupIdealForm) => void;
}) {
  const { group: groups } = useGroupStore();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<GroupIdealForm>({
    defaultValues: {
      groupIdeals: groups.map((group) => ({
        id: 1,
        text: "",
        groupName: group.name
      }))
    },
    mode: "onBlur"
  });

  // 각 그룹별로 독립적인 useFieldArray 생성
  const { fields, append, remove } = useFieldArray({
    control,
    name: "groupIdeals"
  });

  const nextId = useRef<number>(2);

  if (groups.length === 0) return null;

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  // 특정 그룹의 마지막 인덱스 다음에 새 항목을 추가
  const addIdealToGroup = (groupName: string) => {
    const lastGroupIndex = fields.reduce((lastIndex, field, index) => {
      return field.groupName === groupName ? index : lastIndex;
    }, -1);

    append(
      { id: nextId.current, text: "", groupName },
      // 해당 그룹의 마지막 아이템 다음 위치에 추가
      { focusIndex: lastGroupIndex + 1 }
    );
    nextId.current += 1;
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="flex">
        <p className="section-title">
          <span className="mr-[0.25em] text-main-100">*</span> 그룹 별 인재상
        </p>
        <div className="tooltip">각 그룹별 인재상을 작성해 주세요.</div>
      </div>

      <div className="mt-[16px] py-[32px] relative h-auto bg-white-100 rounded-[12px]">
        {groups.map((group) => {
          // 현재 그룹에 해당하는 필드들만 필터링
          const groupFields = fields.filter(
            (field) => field.groupName === group.name
          );

          return (
            <div
              key={group.name}
              className="mx-[31px] mb-[28.4px] h-auto rounded-[12px] border border-gray-300 bg-[#FBFBFF]"
            >
              <p className="flex-center w-[152px] h-[55px] ml-[14px] mt-[17px] rounded-[11px] bg-main-300 border border-main-400 text-main-100 font-semibold text-[16px]">
                {group.name}
              </p>

              <div className="px-[14px]">
                {groupFields.map((field) => {
                  const fieldIndex = fields.findIndex((f) => f.id === field.id);
                  return (
                    <div key={field.id}>
                      <div className="flex items-center mt-4">
                        <input
                          {...register(`groupIdeals.${fieldIndex}.text`, {
                            required: "필수 입력 사항입니다."
                          })}
                          className={`w-full py-[11px] px-[21px] bg-white-100 rounded-[8px] outline-none text-[15px] font-medium border ${
                            errors.groupIdeals?.[fieldIndex]?.text
                              ? "border-red-100"
                              : "border-gray-500"
                          }`}
                          placeholder="인재상을 작성해 주세요."
                        />
                        <button
                          type="button"
                          onClick={() => remove(fieldIndex)}
                          aria-label="인재상 삭제하기"
                          className="absolute right-16 ml-2 flex-center bg-gray-100 rounded-full w-[16px] h-[16px] text-gray-500 hover:text-red-500"
                        >
                          -
                        </button>
                      </div>
                      {errors.groupIdeals?.[fieldIndex]?.text && (
                        <div className="w-full text-state-error mt-[4px]">
                          {errors.groupIdeals[fieldIndex]?.text?.message}
                        </div>
                      )}
                    </div>
                  );
                })}

                <button
                  type="button"
                  onClick={() => addIdealToGroup(group.name)}
                  className="w-full mt-[14px] mb-[17px] py-[11px] px-[14.55px] bg-gray-100 rounded-[8px] border border-gray-500 outline-none text-[15px] font-semibold text-left text-gray-700"
                >
                  + 인재상 추가하기
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </form>
  );
}
