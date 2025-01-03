import React from "react";
import { useFormContext } from "react-hook-form";
import { useGroupStore } from "../../../../store/useStore";

export default function GroupIdeal() {
  const { group: groups } = useGroupStore();
  const {
    watch,
    setValue,
    formState: { touchedFields }
  } = useFormContext<IdealForm>();

  const [groupInputs, setGroupInputs] = React.useState<Record<string, string>>(
    {}
  );
  const partIdeals = watch("partIdeals");

  const handleKeyPress = (e: React.KeyboardEvent, groupName: string) => {
    if (e.key === "Enter" && groupInputs[groupName]?.trim()) {
      e.preventDefault();
      const groupIndex = partIdeals.findIndex(
        (part) => part.partName === groupName
      );
      if (groupIndex !== -1) {
        setValue(`partIdeals.${groupIndex}.content`, [
          ...partIdeals[groupIndex].content,
          groupInputs[groupName].trim()
        ]);
        setGroupInputs((prev) => ({ ...prev, [groupName]: "" }));
      }
    }
  };

  const handleRemove = (groupName: string, index: number) => {
    const groupIndex = partIdeals.findIndex(
      (part) => part.partName === groupName
    );
    if (groupIndex !== -1) {
      setValue(
        `partIdeals.${groupIndex}.content`,
        partIdeals[groupIndex].content.filter((_, i) => i !== index)
      );
    }
  };

  const showError = (groupName: string) => {
    const groupIndex = partIdeals.findIndex(
      (part) => part.partName === groupName
    );
    return (
      touchedFields.partIdeals?.[groupIndex]?.content &&
      partIdeals[groupIndex].content.length === 0
    );
  };

  if (groups.length === 0) return null;

  return (
    <div>
      <div className="flex">
        <p className="section-title">
          <span className="mr-[0.25em] text-main-100">*</span> 그룹 별 인재상
        </p>
        <div className="tooltip">각 그룹별 인재상을 작성해 주세요.</div>
      </div>

      <div className="mt-[16px] py-[32px] relative h-auto bg-white-100 rounded-[12px]">
        {groups.map((group) => {
          const groupIdeal = partIdeals.find(
            (part) => part.partName === group.name
          );
          if (!groupIdeal) return null;

          return (
            <div
              key={group.name}
              className="mx-[31px] mb-[28.4px] h-auto rounded-[12px] border border-gray-300 bg-[#FBFBFF]"
            >
              <p className="flex-center w-[152px] h-[55px] ml-[14px] mt-[17px] rounded-[11px] bg-main-300 border border-main-400 text-main-100 font-semibold text-[16px]">
                {group.name}
              </p>

              <div className="px-[14px]">
                {groupIdeal.content.map((ideal, index) => (
                  <div
                    key={index}
                    className="mt-[14px] py-[11px] pl-[21px] pr-[53px] bg-white-100 rounded-[8px] border border-gray-500 text-[15px] font-medium flex justify-between items-center"
                  >
                    <span className="text-gray-1100">{ideal}</span>
                    <button
                      type="button"
                      onClick={() => handleRemove(group.name, index)}
                      className="flex-center bg-gray-100 rounded-full w-4 h-4 text-gray-500"
                    >
                      -
                    </button>
                  </div>
                ))}
              </div>

              <div className="px-[14px]">
                <input
                  value={groupInputs[group.name] || ""}
                  onChange={(e) =>
                    setGroupInputs((prev) => ({
                      ...prev,
                      [group.name]: e.target.value
                    }))
                  }
                  onKeyPress={(e) => handleKeyPress(e, group.name)}
                  className={`w-full my-[14px] py-[11px] px-[21px] bg-white-100 rounded-[8px] outline-none text-[15px] font-medium border ${
                    showError(group.name) ? "border-red-100" : "border-gray-500"
                  } focus:border-main-100`}
                  placeholder="인재상을 작성해 주세요."
                />
                {showError(group.name) && (
                  <p className="text-state-error mt-[4px]">
                    필수 입력 사항입니다.
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
