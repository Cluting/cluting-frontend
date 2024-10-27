interface DropdownProps {
  studentStatus?: boolean;
  semester?: boolean;
  clubType?: boolean;
  clubCategory?: boolean;
  onSelect: (description: string) => void;
}

export default function SignupDropdown({
  studentStatus,
  semester,
  clubType,
  clubCategory,
  onSelect
}: DropdownProps) {
  const studentStatusList = [
    { id: 1, description: "재학" },
    { id: 2, description: "휴학" }
  ];
  const semesterList = [
    { id: 1, description: "1학년 1학기" },
    { id: 2, description: "1학년 2학기" },
    { id: 3, description: "2학년 1학기" },
    { id: 4, description: "2학년 2학기" },
    { id: 5, description: "3학년 1학기" },
    { id: 6, description: "3학년 2학기" },
    { id: 7, description: "4학년 1학기" },
    { id: 8, description: "4학년 2학기" }
  ];
  const clubTypeList = [
    { id: 1, description: "교내" },
    { id: 2, description: "연합" }
  ];
  const clubCategoryList = [
    { id: 1, description: "전체" },
    { id: 2, description: "문화 / 예술 / 공연" },
    { id: 3, description: "봉사 / 사회 활동" },
    { id: 4, description: "학술 / 교양" },
    { id: 5, description: "창업 / 취업" },
    { id: 6, description: "어학" },
    { id: 7, description: "체육" },
    { id: 8, description: "친목" },
    { id: 9, description: "기타" }
  ];
  return (
    <div className="absolute top-20 left-0 w-[404px] h-auto bg-white-100 z-50 p-2 rounded-[12px] border border-gray-100">
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
              onClick={() => onSelect(semester.description)} // 선택 시 onSelect 호출
            >
              {semester.description}
            </li>
          ))}
        {clubType &&
          clubTypeList.map((clubType) => (
            <li
              key={clubType.id}
              className="signup-dropdown-list text-gray-900 my-2"
              onClick={() => onSelect(clubType.description)} // 선택 시 onSelect 호출
            >
              {clubType.description}
            </li>
          ))}
        {clubCategory &&
          clubCategoryList.map((clubCategory) => (
            <li
              key={clubCategory.id}
              className="signup-dropdown-list text-gray-900 my-2"
              onClick={() => onSelect(clubCategory.description)} // 선택 시 onSelect 호출
            >
              {clubCategory.description}
            </li>
          ))}
      </ul>
    </div>
  );
}
