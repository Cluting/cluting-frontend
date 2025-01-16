//그룹 선택 탭 컴포넌트

interface GroupTabsProps {
  group: Array<{ index: number; name: string }>;
  selectedGroupId: number;
  onSelectGroup: (groupId: number) => void;
  scheduleData?: ScheduleFormData;
}

export const GroupTabs = ({
  group,
  selectedGroupId,
  onSelectGroup
}: GroupTabsProps) => (
  <div className="flex mt-[22px]">
    {group && group.length > 0 ? (
      group.map((groupItem) => (
        <button
          key={groupItem.index}
          type="button"
          className={`flex-center w-[162px] min-h-[43px] rounded-t-[11px] border border-b-0 text-callout 
            ${
              selectedGroupId === groupItem.index
                ? "border-main-100 bg-main-100 text-white-100"
                : "border-gray-200 bg-gray-100 text-main-100"
            }`}
          onClick={() => onSelectGroup(groupItem.index)}
        >
          {groupItem.name}
        </button>
      ))
    ) : (
      <div className="flex-center w-[162px] min-h-[43px] rounded-t-[11px] border border-b-0 text-callout border-main-100 bg-main-100 text-white-100">
        전체
      </div>
    )}
  </div>
);
