interface alignDropdownProps {
  onSelectAlign: (selectedAlign: string) => void;
}

export default function AlignDropdown({ onSelectAlign }: alignDropdownProps) {
  return (
    <div className="animate-dropdown absolute top-[40px] left-0 z-50 bg-white-100 w-[130px] py-2 rounded-[12px] border border-gray-300">
      <ul className="flex flex-col items-center justify-center h-full">
        <li
          onClick={() => onSelectAlign("지원순")}
          className="small-dropdown-list"
        >
          <p className="text-center text-gray-800 font-medium">지원순</p>
        </li>
        <li
          onClick={() => onSelectAlign("최신순")}
          className="small-dropdown-list"
        >
          <p className="text-center text-gray-800 font-medium">최신순</p>
        </li>
      </ul>
    </div>
  );
}
