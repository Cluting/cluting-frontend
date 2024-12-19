//지원 중인 동아리
import ClubCard from "../../../recruting/home/ClubCard";
import { v4 as uuidv4 } from "uuid";

export default function InProgressContainer() {
  const clubsData = [
    {
      id: uuidv4(),
      dDay: 3,
      clubImg: "/assets/home/main/1.svg",
      logoSrc: "/assets/home/main/1Logo.svg",
      logoAlt: "1",
      title: "밴드 온더락 6기 모집",
      clubName: "밴드 On The Rock",
      tags: ["문화예술", "밴드", "인디"]
    },
    {
      id: uuidv4(),
      dDay: 3,
      clubImg: "/assets/home/main/1.svg",
      logoSrc: "/assets/home/main/1Logo.svg",
      logoAlt: "1",
      title: "밴드 온더락 6기 모집",
      clubName: "밴드 On The Rock",
      tags: ["문화예술", "밴드", "인디"]
    }
  ];
  return (
    <div className="w-full min-h-[630px] bg-white-100">
      <div className="grid grid-cols-3 gap-8">
        {clubsData.map((club, index) => (
          <ClubCard
            id={club.id}
            key={club.id}
            dDay={club.dDay}
            clubImg={club.clubImg}
            logoSrc={club.logoSrc}
            logoAlt={club.logoAlt}
            title={club.title}
            clubName={club.clubName}
            tags={club.tags}
          />
        ))}
      </div>
    </div>
  );
}
