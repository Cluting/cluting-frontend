import { ALL_ADMINS } from "../../../constants/recruting";

interface AddAdminDropdownProps {
  onSelect: (adminId: string) => void; // 운영진 선택시 호출될 함수
  currentAdmins: string[]; // 현재 선택된 운영진 목록록
}

export default function AddAdminDropdown({
  onSelect,
  currentAdmins
}: AddAdminDropdownProps) {
  return (
    <div className="absolute animate-dropdown top-[53.5px] bg-white-100 w-[139px] rounded-[12px] z-50">
      <ul className="flex-center flex-col h-full p-2 text-body text-gray-1100">
        {ALL_ADMINS.map((admin) => (
          <li
            key={admin.id}
            onClick={() => onSelect(admin.id)}
            className="relative w-[123px] h-[40px] rounded-[8px] cursor-pointer hover:bg-gray-200 flex-center"
          >
            <p className="text-center text-gray-800 font-medium">
              {admin.name}
            </p>
            {currentAdmins.some(
              (currentAdmin) => currentAdmin === admin.id
            ) && (
              <span className="absolute text-main-100 ml-1 left-[calc(50%+2rem)]">
                ✓
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
