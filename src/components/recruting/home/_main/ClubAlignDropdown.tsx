export default function ClubAlignDropdown() {
  const sortOptions = [
    { label: "마감임박순", value: "DEADLINE" },
    { label: "최신순", value: "NEWEST" },
    { label: "오래된 순", value: "OLDEST" }
  ];

  return (
    <div className="animate-dropdown absolute top-[28px] right-[-17px] z-50 bg-white-100 w-[130px] h-[120px] rounded-[12px] border border-gray-300">
      <ul className="flex flex-col items-center justify-center h-full">
        {sortOptions.map((option) => (
          <li key={option.value} className="small-dropdown-list cursor-pointer">
            <p className="text-center text-gray-800 font-medium">
              {option.label}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
