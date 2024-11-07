interface AddAdminDropdownProps {
  onSelect: (admin: string) => void; // 운영진 선택시 호출될 함수
  currentAdmins: string[]; // 현재 선택된 운영진 목록
}

export default function AddAdminDropdown({
  onSelect,
  currentAdmins
}: AddAdminDropdownProps) {
  const allAdmins = ["최예은", "박시현", "김동현"];

  return (
    <div className="absolute top-[53.5px] bg-white-100 w-[139px] rounded-[12px]">
      <ul className="flex-center flex-col h-full p-2 text-body text-[#3B3D46]">
        {allAdmins.map((admin) => (
          <li
            key={admin}
            onClick={() => onSelect(admin)}
            className="w-[123px] h-[40px] rounded-[8px] cursor-pointer hover:bg-gray-200 flex-center"
          >
            <p className="text-center text-gray-800 font-medium">
              {admin}
              {currentAdmins.includes(admin) && (
                <span className="ml-2 text-main-100">✓</span>
              )}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
