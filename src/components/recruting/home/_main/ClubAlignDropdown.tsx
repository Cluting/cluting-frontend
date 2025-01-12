interface ClubAlignDropdownProps {
  onSort: (sortType: "DEADLINE" | "NEWEST" | "OLDEST" | "INORDER") => void;
}

export default function ClubAlignDropdown({ onSort }: ClubAlignDropdownProps) {
  const sortOptions = [
    { label: "마감임박순", value: "DEADLINE" as const },
    { label: "최신순", value: "NEWEST" as const },
    { label: "오래된 순", value: "OLDEST" as const }
  ];

  return (
    <div className="animate-dropdown absolute top-[28px] right-[-17px] z-50 bg-white-100 w-[130px] h-[120px] rounded-[12px] border border-gray-300">
      <ul className="flex flex-col items-center justify-center h-full">
        {sortOptions.map((option) => (
          <li
            key={option.value}
            className="small-dropdown-list cursor-pointer"
            onClick={() => onSort(option.value)}
          >
            <p className="text-center text-gray-800 font-medium">
              {option.label}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
