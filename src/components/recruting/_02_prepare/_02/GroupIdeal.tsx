import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useGroupStore } from "../../../../store/useStore";

interface GroupIdeal {
  id: number;
  text: string;
}

interface GroupIdeals {
  [groupName: string]: {
    confirmedIdeals: GroupIdeal[];
    showInput: boolean;
  };
}

interface GroupIdealForm {
  groupIdeals: {
    [key: string]: string;
  };
}

export default function GroupIdeal() {
  const { group: groups } = useGroupStore();
  const nextIdRef = useRef<{ [key: string]: number }>({});

  const [groupIdeals, setGroupIdeals] = useState<GroupIdeals>(() => {
    return groups.reduce(
      (acc, group) => ({
        ...acc,
        [group.name]: {
          confirmedIdeals: [],
          showInput: true
        }
      }),
      {}
    );
  });

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors }
  } = useForm<GroupIdealForm>({
    mode: "onBlur"
  });

  if (groups.length === 0) return null;

  const handleKeyPress = (e: React.KeyboardEvent, groupName: string) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const currentValue = getValues(`groupIdeals.${groupName}`);

      if (currentValue && currentValue.trim()) {
        if (!nextIdRef.current[groupName]) {
          nextIdRef.current[groupName] = 1;
        }

        const newIdeal = {
          id: nextIdRef.current[groupName],
          text: currentValue.trim()
        };

        setGroupIdeals((prev) => ({
          ...prev,
          [groupName]: {
            ...prev[groupName],
            confirmedIdeals: [...prev[groupName].confirmedIdeals, newIdeal],
            showInput: false
          }
        }));

        nextIdRef.current[groupName] += 1;
        setValue(`groupIdeals.${groupName}`, "");
      }
    }
  };

  const handleRemove = (groupName: string, id: number) => {
    setGroupIdeals((prev) => ({
      ...prev,
      [groupName]: {
        ...prev[groupName],
        confirmedIdeals: prev[groupName].confirmedIdeals.filter(
          (ideal) => ideal.id !== id
        )
      }
    }));
  };

  const handleAddIdeal = (groupName: string) => {
    const currentGroup = groupIdeals[groupName];
    if (currentGroup.confirmedIdeals.length > 0) {
      setGroupIdeals((prev) => ({
        ...prev,
        [groupName]: {
          ...prev[groupName],
          showInput: true
        }
      }));
    }
  };

  return (
    <form onSubmit={handleSubmit((data) => console.log(data))}>
      <div className="flex">
        <p className="section-title">
          <span className="mr-[0.25em] text-main-100">*</span> 그룹 별 인재상
        </p>
        <div className="tooltip">각 그룹별 인재상을 작성해 주세요.</div>
      </div>

      <div className="mt-[16px] py-[32px] relative h-auto bg-white-100 rounded-[12px] ">
        {groups.map((group) => (
          <div
            key={group.name}
            className="mx-[31px] mb-[28.4px] h-auto rounded-[12px] border border-gray-300 bg-[#FBFBFF]"
          >
            <p className="flex-center w-[152px] h-[55px] ml-[14px] mt-[17px] rounded-[11px] bg-main-300 border border-main-400 text-main-100 font-semibold text-[16px]">
              {group.name}
            </p>

            <div className="px-[14px]">
              {groupIdeals[group.name].confirmedIdeals.map((ideal) => (
                <div
                  key={ideal.id}
                  className="mt-[14px] py-[11px] pl-[21px] pr-[53px] bg-white-100 rounded-[8px] border border-gray-500 text-[15px] font-medium flex justify-between items-center"
                >
                  <span className="text-gray-1100">{ideal.text}</span>
                  <button
                    type="button"
                    onClick={() => handleRemove(group.name, ideal.id)}
                    className="flex-center bg-gray-100 rounded-full w-4 h-4 text-gray-500"
                  >
                    -
                  </button>
                </div>
              ))}
            </div>

            <div className="px-[14px]">
              {groupIdeals[group.name].showInput && (
                <>
                  <input
                    {...register(`groupIdeals.${group.name}`, {
                      required:
                        groupIdeals[group.name].confirmedIdeals.length === 0
                          ? "필수 입력 사항입니다."
                          : false
                    })}
                    onKeyPress={(e) => handleKeyPress(e, group.name)}
                    className={`w-full mt-[14px] py-[11px] px-[21px] bg-white-100 rounded-[8px] outline-none text-[15px] font-medium border ${
                      errors.groupIdeals?.[group.name] &&
                      groupIdeals[group.name].confirmedIdeals.length === 0
                        ? "border-red-100"
                        : "border-gray-500"
                    }`}
                    placeholder="인재상을 작성해 주세요."
                  />
                  {errors.groupIdeals?.[group.name] &&
                    groupIdeals[group.name].confirmedIdeals.length === 0 && (
                      <p className="text-state-error">
                        {errors.groupIdeals?.[group.name]?.message}
                      </p>
                    )}
                </>
              )}

              <button
                type="button"
                onClick={() => handleAddIdeal(group.name)}
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
