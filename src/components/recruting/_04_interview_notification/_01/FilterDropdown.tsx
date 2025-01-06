import { useQuery } from "@tanstack/react-query";
import { getDocumentEvaluationGroups } from "../service/Step4";

interface filterDropdownProps {
  onSelectFilter: (selectedFilter: string) => void;
}

interface filteringGroup {
  id: number;
  name: string;
}

export default function FilterDropdown({
  onSelectFilter
}: filterDropdownProps) {
  //FIX: 하드코딩
  const recruitId = 1;
  const { data: groups } = useQuery(["group", recruitId], () =>
    getDocumentEvaluationGroups(Number(recruitId))
  );
  console.log(groups);
  return (
    <div className="animate-dropdown absolute top-[40px] left-0 z-50 bg-white-100 w-[130px] py-2 rounded-[12px] border border-gray-300">
      <ul className="flex flex-col items-center justify-center h-full">
        <li
          onClick={() => onSelectFilter("전체")}
          className="small-dropdown-list"
        >
          <p className="text-center text-gray-800 font-medium">전체</p>
        </li>
        {groups &&
          groups.map((group: filteringGroup) => (
            <li
              key={group.id}
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
