import { Link, useNavigate } from "react-router-dom";
import { getClub, getClubRecruitingList } from "../club/service/Club";
import { useQuery } from "@tanstack/react-query";

export default function AdminProfileDropdown() {
  const navigate = useNavigate();

  const { data: clubsData, isLoading } = useQuery(
    ["clubList"],
    getClubRecruitingList
  );

  const fetchClub = (clubId: number) => {
    return getClub(clubId).then((data) => {
      console.log(data);
      if (data.recruits && data.recruits.length > 0) {
        const recruitId = data.recruits[0].id;
        navigate(`/recruting/home/${data.id}/${recruitId}`);
      } else {
        // 리크루팅 정보가 없는 경우 처리
        console.error("리크루팅 정보가 없습니다");
      }
      return data;
    });
  };

  const handleClick = (clubId: number) => {
    fetchClub(clubId);
  };
  return (
    <div className=" absolute animate-dropdown top-[50px] right-[10px] bg-white-100 z-50 w-[320px] h-auto p-2 rounded-[12px]">
      <ul>
        {clubsData &&
          clubsData.length > 0 &&
          clubsData.map((club: ClubData) => (
            <li
              key={club.id}
              className="dropdown-list"
              onClick={() => handleClick(club.id)}
            >
              <img
                src={club.profile ? club.profile : "/assets/ic-profile.svg"}
                alt="프로필"
                className="w-[35px] h-[35px] mx-3 rounded-full"
              />
              <div className="flex flex-col text-left mx-3">
                <p className="text-body text-gray-900">{club.name}</p>
                <p className="text-caption text-gray-900">{club.description}</p>
              </div>
            </li>
          ))}

        <Link to="/register_club" className="dropdown-list">
          <img
            src="/assets/ic-add.svg"
            alt="운영자 계정 프로필"
            className="w-[35px] h-[35px] mx-3"
          />
          <p className="mx-3 text-gray-600">동아리 추가</p>
        </Link>
      </ul>
    </div>
  );
}
