import {
  clubCategoryList,
  clubTypeList,
  semesterList,
  studentStatusList
} from "../../constants/recruting";

interface DropdownProps {
  studentStatus?: boolean;
  semester?: boolean;
  clubType?: boolean;
  clubCategory?: boolean;
  onSelect: (description: string, value?: string) => void;
}

export default function SignupDropdown({
  studentStatus,
  semester,
  clubType,
  clubCategory,
  onSelect
}: DropdownProps) {
  return (
    <div className="animate-dropdown absolute top-20 left-0 w-[404px] h-auto bg-white-100 z-50 p-2 rounded-[12px] border border-gray-100">
      <ul>
        {studentStatus &&
          studentStatusList.map((status) => (
            <li
              key={status.id}
              className="signup-dropdown-list text-gray-900 my-2"
              onClick={() => onSelect(status.description)} // 선택 시 onSelect 호출
            >
              {status.description}
            </li>
          ))}
        {semester &&
          semesterList.map((semester) => (
            <li
              key={semester.id}
              className="signup-dropdown-list text-gray-900 my-2"
              onClick={() => onSelect(semester.description, semester.value)}
            >
              {semester.description}
            </li>
          ))}
        {clubType &&
          clubTypeList.map((clubType) => (
            <li
              key={clubType.id}
              className="signup-dropdown-list text-gray-900 my-2"
              onClick={() => onSelect(clubType.description, clubType.value)}
            >
              {clubType.description}
            </li>
          ))}
        {clubCategory &&
          clubCategoryList.map((clubCategory) => (
            <li
              key={clubCategory.id}
              className="signup-dropdown-list text-gray-900 my-2"
              onClick={() =>
                onSelect(clubCategory.description, clubCategory.value)
              }
            >
              {clubCategory.description}
            </li>
          ))}
      </ul>
    </div>
  );
}
