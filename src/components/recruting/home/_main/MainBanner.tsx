import { useQuery } from "@tanstack/react-query";
import PopularClub from "./PopularClub";
import { getPopularClub } from "../../../club/service/Club";
import { clubCategoryList } from "../../../../constants/recruting";
import LoadingSpinner from "../../common/LoadingSpinner";
import LazyLoad from "./LazyLoad";

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
    <div className="w-full">
      <LazyLoad />

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
