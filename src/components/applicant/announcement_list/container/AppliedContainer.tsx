//지원한 동아리
import ClubCard from "../../../recruting/home/_main/ClubCard";
import { useQuery } from "@tanstack/react-query";
import { getApplied } from "./services/Applicant";
import { DEFAULT_CLUB_IMAGE } from "../../../../constants/recruting";

function mapClubDataToCardProps(club: ClubData): ClubCardProps {
  // 사용자가 지원한 모집 공고 찾기
  const appliedRecruit = club.recruits.find((recruit) => recruit.isDone);

  if (!appliedRecruit) {
    return {
      id: club.id,
      dDay: 0,
      clubImg: DEFAULT_CLUB_IMAGE,
      logoSrc: club.profile || DEFAULT_CLUB_IMAGE,
      logoAlt: club.name,
      title: `${club.name}`,
      clubName: club.name,
      tags: club.keyword,
      isLarge: false
    };
  }

  const today = new Date();
  const deadline = new Date(appliedRecruit.deadLine);
  const diffTime = deadline.getTime() - today.getTime();
  const dDay = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return {
    id: club.id,
    dDay: dDay,
    clubImg: appliedRecruit.image || DEFAULT_CLUB_IMAGE,
    logoSrc: club.profile || DEFAULT_CLUB_IMAGE,
    logoAlt: club.name,
    title: appliedRecruit.title,
    clubName: club.name,
    tags: club.keyword,
    isLarge: false
  };
}

export default function AppliedContainer() {
  const { data: appliedData } = useQuery<ClubData[]>(
    ["appliedData"],
    getApplied
  );
  console.log("지원한 동아리 데이터:", appliedData);

  //지원한 동아리 필터링
  const completedApplications = appliedData?.filter((club) =>
    club.recruits.some((recruit) => recruit.isDone)
  );

  return (
    <div className="w-full min-h-[630px] bg-white-100">
      <div className="grid grid-cols-3 gap-8">
        {completedApplications &&
          completedApplications.map((club) => (
            <ClubCard key={club.id} {...mapClubDataToCardProps(club)} />
          ))}
      </div>
    </div>
  );
}
