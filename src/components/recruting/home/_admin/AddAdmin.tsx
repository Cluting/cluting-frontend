//리크루팅 운영진 추가

import { useQuery } from "@tanstack/react-query";
import { getClubUser } from "../../../club/service/ClubUser";
import { useParams } from "react-router-dom";

interface AddAdminProps {
  isDropdown?: boolean;
}

export default function AddAdmin({ isDropdown }: AddAdminProps) {
  const params = useParams();
  const clubId = params.clubId && parseInt(params.clubId, 10);

  const { data: clubUsers } = useQuery<ClubUser[], Error>(
    ["clubUsers", clubId],
    () => getClubUser(Number(clubId))
  );

  return (
    <ul
      className={` ${isDropdown ? "animate-dropdown absolute right-0 top-10 bg-white-100 h-auto custom-shadow z-50" : "bg-gray-100 h-[340.88px]"} w-[300px]  px-[17px] py-[18px]  rounded-[12px] z-50`}
    >
      {clubUsers &&
        clubUsers.map((user) => (
          <li
            key={user.id}
            className={`${isDropdown ? "dropdown-list " : ""} flex w-full mb-4`}
          >
            <img
              src="/assets/ic-profile.svg"
              alt="프로필"
              className="w-[40px] h-[40px] mr-[3px]"
            />
            <div className="flex flex-col text-left mx-3">
              <p className="text-caption1 text-gray-900">{user.name}</p>
              <p className="text-caption3 text-gray-600">{user.email}</p>
            </div>
          </li>
        ))}
    </ul>
  );
}
