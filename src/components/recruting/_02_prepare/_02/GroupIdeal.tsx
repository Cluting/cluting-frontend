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
  const [showInputs, setShowInputs] = React.useState<Record<string, boolean>>(
    () => groups.reduce((acc, group) => ({ ...acc, [group.name]: true }), {})
  );
  const [touchedGroups, setTouchedGroups] = React.useState<
    Record<string, boolean>
  >({});

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
        setShowInputs((prev) => ({ ...prev, [groupName]: false }));
        setTouchedGroups((prev) => ({ ...prev, [groupName]: true }));
      }
    }
  };

  const handleAddIdeal = (groupName: string) => {
    setShowInputs((prev) => ({ ...prev, [groupName]: true }));
    setTouchedGroups((prev) => ({ ...prev, [groupName]: true }));
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
      setTouchedGroups((prev) => ({ ...prev, [groupName]: true }));
    }
  };

  const showError = (groupName: string) => {
    const groupIdeal = partIdeals.find((part) => part.partName === groupName);
    return touchedGroups[groupName] && !groupIdeal?.content.length;
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
              className="mx-[31px] mb-[28.4px] pt-[18px] pb-[14px] px-[14px] h-auto rounded-[12px] border border-gray-300 bg-[#FBFBFF]"
            >
              <p className="flex-center w-[152px] h-[55px] rounded-[11px] bg-main-300 border border-main-400 text-main-100 font-semibold text-[16px]">
                {group.name}
              </p>

              <div>
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

              <div>
                {showInputs[group.name] ? (
                  <>
                    <input
                      value={groupInputs[group.name] || ""}
                      onChange={(e) =>
                        setGroupInputs((prev) => ({
                          ...prev,
                          [group.name]: e.target.value
                        }))
                      }
                      onKeyPress={(e) => handleKeyPress(e, group.name)}
                      onBlur={() =>
                        setTouchedGroups((prev) => ({
                          ...prev,
                          [group.name]: true
                        }))
                      }
                      className={`w-full mt-[14px] py-[11px] px-[21px] bg-white-100 rounded-[8px] outline-none text-[15px] font-medium border ${
                        showError(group.name)
                          ? "border-red-100"
                          : "border-gray-500"
                      } focus:border-main-100`}
                      placeholder="인재상을 작성해 주세요."
                    />
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleAddIdeal(group.name)}
                    className="w-full mt-[14px] mb-[17px] py-[11px] px-[14.55px] bg-gray-100 rounded-[8px] border border-gray-500 outline-none text-[15px] font-semibold text-left text-gray-700"
                  >
                    + 인재상 추가하기
                  </button>
                )}

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
