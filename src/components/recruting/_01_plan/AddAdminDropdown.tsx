import { useQuery } from "@tanstack/react-query";
import { AdminPlan } from "../../../type/type";
import { getClubUser } from "../../club/service/ClubUser";

interface AddAdminDropdownProps {
  onSelect: (admin: AdminPlan) => void; // 운영진 선택시 호출될 함수
  currentAdmins: number[]; // 현재 선택된 운영진 ID 목록
}

export default function AddAdminDropdown({
  onSelect,
  currentAdmins
}: AddAdminDropdownProps) {
  const clubId = 1;
  const { data: clubUsers } = useQuery<ClubUser[], Error>(
    ["clubUsers", clubId],
    () => getClubUser(Number(clubId))
  );

  return (
    <div className="absolute animate-dropdown top-[53.5px] bg-white-100 w-[139px] rounded-[12px] z-50 overflow-y-scroll">
      <ul className="flex-center flex-col h-full p-2 text-body text-gray-1100 ">
        {clubUsers?.map((admin) => (
          <li
            key={admin.id}
            onClick={() => onSelect(admin)}
            className="relative w-[123px] h-[40px] rounded-[8px] cursor-pointer hover:bg-gray-200 flex-center"
          >
            <p className="text-center text-gray-800 font-medium">
              {admin.name}
            </p>
            {currentAdmins.includes(admin.id) && (
              <span className="absolute left-[calc(50%+2rem)] ml-1 text-main-100">
                ✓
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
