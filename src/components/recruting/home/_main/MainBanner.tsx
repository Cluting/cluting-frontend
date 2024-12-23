import { useQuery } from "@tanstack/react-query";
import PopularClub from "./PopularClub";
import { getPopularClub } from "../../../club/service/Club";
import { clubCategoryList } from "../../../../constants/recruting";
import LoadingSpinner from "../../common/LoadingSpinner";

function mapClubDataToPopularClubProps(club: ClubData): PopularClubProps {
  const categoryDescription =
    clubCategoryList.find((category) => category.value === club.category)
      ?.description || "기타";

  return {
    logoSrc: club.profile || "/assets/ic-add.svg",
    logoAlt: `${club.name} 로고`,
    mainImageSrc: club.recruits[0]?.image || "/assets/home/profile-default.png",
    clubType: club.type === "INTERNAL" ? "교내" : "연합",
    clubTitleFirst: categoryDescription,
    clubTitleSecond: club.name,
    tags: club.keyword
  };
}

export default function MainBanner() {
  const { data: clubsData, isLoading } = useQuery<ClubData[]>(
    ["popularClubs"],
    getPopularClub
  );

  console.log(clubsData);
  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="relative w-full h-[378px]">
      <img
        src="/assets/home/banner/mainBanner.svg"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 flex flex-col px-[141px] pt-[176px] pb-[86px]">
        <p className="text-left text-white-100 text-title3">클루팅 PICK!</p>
        <p className="text-left text-white-100 text-largeTitle mt-4">
          지금 가장 인기 있는
          <br />
          동아리 리스트
        </p>
      </div>

      <div className="absolute right-[150px] top-[85.5px] flex gap-[25.36px]">
        {clubsData &&
          clubsData
            .slice(0, 3)
            .map((club) => (
              <PopularClub
                key={club.id}
                {...mapClubDataToPopularClubProps(club)}
              />
            ))}
      </div>
    </div>
  );
}
