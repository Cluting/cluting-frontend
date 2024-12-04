import { ALL_ADMINS } from "../../../../constants/recruting";

interface AddAdminDropdownProps {
  onSelect: (adminId: string) => void; // 운영진 선택시 호출될 함수
  currentAdmins: Admin[]; // 현재 선택된 운영진 목록
}

export default function AddAdminDropdown({
  onSelect,
  currentAdmins
}: AddAdminDropdownProps) {
  return (
    <div className="absolute animate-dropdown top-[53.5px] w-[328px] bg-white-100 rounded-[12px] z-50">
      <ul className="flex-center flex-col h-full p-2 text-body text-gray-1100">
        {ALL_ADMINS.map((admin) => (
          <li
            key={admin.id}
            onClick={() => onSelect(admin.id)}
            className="relative w-full h-[40px] rounded-[8px] cursor-pointer hover:bg-gray-200 flex-center z-50"
          >
            <span className="text-gray-1100 font-medium">{admin.name}</span>
            {currentAdmins.some(
              (currentAdmin) => currentAdmin.id === admin.id
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
