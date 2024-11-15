import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useGroupStore } from "../../../../store/useStore";

export default function GroupIdeal() {
  const { group: groups } = useGroupStore();

  const [groupIdeals, setGroupIdeals] = useState<GroupIdeals>(() =>
    groups.reduce(
      (acc, group) => ({
        ...acc,
        [group.name]: {
          ideals: [],
          showInput: [true], // 배열로 여러 인재상 입력을 관리
          value: [""],
          nextId: 1
        }
      }),
      {}
    )
  );

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<GroupIdealForm>({ mode: "onBlur" });

  if (groups.length === 0) return null;

  const onInsert = (groupName: string, inputIndex: number) => {
    const currentGroup = groupIdeals[groupName];

    if (currentGroup.value[inputIndex].trim()) {
      const ideal = {
        id: currentGroup.nextId,
        text: currentGroup.value[inputIndex]
      };

      setGroupIdeals((prev) => ({
        ...prev,
        [groupName]: {
          ...prev[groupName],
          ideals: [...prev[groupName].ideals, ideal],
          value: prev[groupName].value.map((val, index) =>
            index === inputIndex ? "" : val
          ),
          nextId: prev[groupName].nextId + 1
        }
      }));
    }
  };

  const onRemove = (groupName: string, id: number) => {
    setGroupIdeals((prev) => ({
      ...prev,
      [groupName]: {
        ...prev[groupName],
        ideals: prev[groupName].ideals.filter((ideal) => ideal.id !== id)
      }
    }));
  };

  const addInputField = (groupName: string) => {
    setGroupIdeals((prev) => ({
      ...prev,
      [groupName]: {
        ...prev[groupName],
        showInput: [...prev[groupName].showInput, true],
        value: [...prev[groupName].value, ""]
      }
    }));
  };

  const onSubmit = handleSubmit((data) => {
    console.log({ groupIdeals });
  });

  return (
    <form onSubmit={onSubmit}>
      <div className="flex">
        <p className="section-title">
          <span className="mr-[0.25em] text-main-100">*</span> 그룹 별 인재상
        </p>
        <div className="tooltip">각 그룹별 인재상을 작성해 주세요.</div>
      </div>

      <div className="mt-[16px] py-[32px] relative h-auto bg-white-100 rounded-[12px]">
        {groups.map((group) => (
          <div
            key={group.name}
            className="mx-[31px] mb-[28.4px] h-auto rounded-[12px] border border-gray-300 bg-[#FBFBFF]"
          >
            <p className="flex-center w-[152px] h-[55px] ml-[14px] mt-[17px] rounded-[11px] bg-main-300 border border-main-400 text-main-100 font-semibold text-[16px]">
              {group.name}
            </p>

            <div className="px-[14px]">
              {groupIdeals[group.name].ideals.map((ideal) => (
                <div
                  key={ideal.id}
                  className="mt-[14px] py-[11px] pl-[21px] pr-[53px] bg-white-100 rounded-[8px] border border-gray-500 text-[15px] font-medium flex justify-between items-center"
                >
                  <span className="text-gray-1100">{ideal.text}</span>
                  <button
                    type="button"
                    onClick={() => onRemove(group.name, ideal.id)}
                    className="flex-center bg-gray-100 rounded-full w-4 h-4 text-gray-500 hover:text-red-500"
                  >
                    -
                  </button>
                </div>
              ))}
            </div>

            <div className="px-[14px]">
              {groupIdeals[group.name].showInput.map((show, index) =>
                show ? (
                  <input
                    key={index}
                    {...register(`groupIdeals.${group.name}.${index}`, {
                      required: "필수 입력 사항입니다."
                    })}
                    className={`w-full mt-[14px] py-[11px] px-[21px] bg-white-100 rounded-[8px] outline-none text-[15px] font-medium border ${
                      errors.groupIdeals?.[group.name] &&
                      groupIdeals[group.name].ideals.length === 0
                        ? "border-red-100"
                        : "border-gray-500"
                    }`}
                    type="text"
                    value={groupIdeals[group.name].value[index]}
                    // input의 onChange 부분 수정
                    onChange={(e) => {
                      const newValue = e.target.value;
                      setValue(`groupIdeals.${group.name}`, newValue); // useForm의 setValue로 값 설정
                      setGroupIdeals((prev) => ({
                        ...prev,
                        [group.name]: {
                          ...prev[group.name],
                          value: prev[group.name].value.map((val, idx) =>
                            idx === index ? newValue : val
                          )
                        }
                      }));
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        onInsert(group.name, index);
                      }
                    }}
                    placeholder="인재상을 작성해 주세요."
                  />
                ) : null
              )}

              <button
                type="button"
                onClick={() => addInputField(group.name)}
                className="w-full mt-[14px] mb-[17px] py-[11px] px-[14.55px] bg-gray-100 rounded-[8px] border border-gray-500 outline-none text-[15px] font-semibold text-left text-gray-700"
              >
                + 인재상 추가하기
              </button>
            </div>
          </div>
        ))}
      </div>
    </form>
  );
}
