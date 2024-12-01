import { useGroupStore } from "../../../../store/useStore";

interface filterDropdownProps {
  onSelectFilter: (selectedFilter: string) => void;
}

export default function FilterDropdown({
  onSelectFilter
}: filterDropdownProps) {
  const { group: groups } = useGroupStore();
  return (
    <div className="animate-dropdown absolute top-[40px] left-0 z-50 bg-white-100 w-[130px] py-2 rounded-[12px] border border-gray-300">
      <ul className="flex flex-col items-center justify-center h-full">
        <li
          onClick={() => onSelectFilter("전체")}
          className="small-dropdown-list"
        >
          <p className="text-center text-gray-800 font-medium">전체</p>
        </li>
        {groups.map((group) => (
          <li
            key={group.name}
            onClick={() => onSelectFilter(group.name)}
            className="small-dropdown-list cursor-pointer"
          >
            <p className="text-center text-gray-800 font-medium">
              {group.name}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
