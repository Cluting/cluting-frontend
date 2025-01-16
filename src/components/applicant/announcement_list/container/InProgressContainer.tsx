//지원 중인 동아리
import ClubCard from "../../../recruting/home/_main/ClubCard";
import { useQuery } from "@tanstack/react-query";
import { getApplying } from "./services/Applicant";
import { DEFAULT_CLUB_IMAGE } from "../../../../constants/recruting";
import { dummyData } from "./dummyData";
// ClubData를 ClubCard 프롭스로 변환하는 함수
function mapClubDataToCardProps(club: ClubData): ClubCardProps {
  // 현재 진행중인 모집 공고 찾기
  const currentRecruit = club.recruits.find(
    (recruit) => !recruit.isDone && new Date(recruit.deadLine) > new Date()
  );

  if (!currentRecruit) {
    // 현재 진행중인 모집이 없는 경우의 기본값
    return {
      id: club.id,
      dDay: 0,
      clubImg: DEFAULT_CLUB_IMAGE,
      logoSrc: club.profile || DEFAULT_CLUB_IMAGE,
      logoAlt: club.name,
      title: `${club.name} 모집 예정`,
      clubName: club.name,
      tags: club.keyword,
      isLarge: false
    };
  }

  // D-Day 계산
  const today = new Date();
  const deadline = new Date(currentRecruit.deadLine);
  const diffTime = deadline.getTime() - today.getTime();
  const dDay = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return {
    id: club.id,
    dDay: dDay,
    clubImg: currentRecruit.image || DEFAULT_CLUB_IMAGE,
    logoSrc: club.profile || DEFAULT_CLUB_IMAGE,
    logoAlt: club.name,
    title: currentRecruit.title,
    clubName: club.name,
    tags: club.keyword,
    isLarge: false
  };
}

export default function InProgressContainer() {
  // const { data: progressData } = useQuery<ClubData[]>(
  //   ["progressData"],
  //   getApplying
  // );

  // 더미 데이터 사용
  const progressData = dummyData;

  console.log("지원 중인 데이터:", progressData);

  // 실제 지원 가능한(마감되지 않은) 동아리만 필터링
  const activeClubs = progressData?.filter(
    (club) =>
      club.isRecruiting &&
      club.recruits.some(
        (recruit) => !recruit.isDone && new Date(recruit.deadLine) > new Date()
      )
  );

  console.log("원본 데이터:", progressData);
  console.log("필터링된 데이터:", activeClubs);

  return (
    <div className="w-full min-h-[630px] bg-white-100">
      <div className="grid grid-cols-3 gap-8">
        {activeClubs &&
          activeClubs.map((club) => (
            <ClubCard key={club.id} {...mapClubDataToCardProps(club)} />
          ))}
      </div>
    </div>
  );
}
