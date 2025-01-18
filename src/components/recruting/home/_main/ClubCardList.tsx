import { random } from "lodash";
import ClubCard from "./ClubCard";

export default function ClubCardList({ clubs }: ClubCardListProps) {
  // D-day 계산 함수
  const calculateDday = (deadLine: string): number => {
    if (!deadLine) return 0;
    const today = new Date();
    const deadlineDate = new Date(deadLine);
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getValidImagePath = (profile: string) => {
    if (!profile) {
      return "assets/home/main/ita.svg"; //null일 때 기본 이미지
    }
    // example.com URL인 경우 더미 이미지 사용
    if (profile.startsWith("https")) {
      const imageNumber = Math.floor(Math.random() * 12) + 1; // id 1~12 랜덤
      return `assets/home/main/${imageNumber}.svg`;
    }

    // 더미데이터의 경우 앞에 슬래시 제거
    if (profile.startsWith("/")) {
      return profile.slice(1);
    }

    return "assets/home/main/ita.svg";
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[53px]">
      {clubs.map((club) => (
        <ClubCard
          key={club.id}
          id={club.id}
          dDay={calculateDday(club.deadLine)}
          clubImg={getValidImagePath(club.profile)}
          logoSrc={getValidImagePath(club.profile)}
          logoAlt={club.title}
          title={club.title}
          clubName={club.description}
          tags={[club.category]}
          isLarge={true}
        />
      ))}
    </div>
  );
}
