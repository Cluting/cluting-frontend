import ClubCard from "./ClubCard";

// D-day 계산 함수
const calculateDday = (deadLine: string): number => {
  if (!deadLine) return 0;
  const today = new Date();
  const deadlineDate = new Date(deadLine);
  const diffTime = deadlineDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

//더미 데이터 경로
const clubImagesMap: { [key: number]: string } = {
  1: "/assets/home/main/1.svg",
  2: "/assets/home/main/2.svg",
  3: "/assets/home/main/3.svg",
  4: "/assets/home/main/4.svg",
  5: "/assets/home/main/5.svg"
};

const clubLogosMap: { [key: number]: string } = {
  1: "/assets/home/main/1Logo.svg",
  2: "/assets/home/main/2Logo.svg",
  3: "/assets/home/main/3Logo.svg",
  4: "/assets/home/main/4Logo.svg",
  5: "/assets/home/main/5Logo.svg"
};

export default function ClubCardList({ clubs }: ClubCardListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[53px]">
      {clubs.map((club) => (
        <ClubCard
          key={club.id}
          id={club.id}
          dDay={calculateDday(club.deadLine)}
          clubImg={
            clubImagesMap[club.id] || "/assets/home/main/defaultClub.svg"
          }
          logoSrc={clubLogosMap[club.id] || "/assets/home/main/defaultClub.svg"}
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
