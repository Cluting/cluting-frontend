//스크랩한 동아리
import ClubCard from "../../../recruting/home/ClubCard";

export default function BookmarkContainer() {
  const clubsData = [
    {
      dDay: 3,
      clubImg: "/assets/home/main/1.svg",
      logoSrc: "/assets/home/main/1Logo.svg",
      logoAlt: "1",
      title: "밴드 온더락 6기 모집",
      clubName: "밴드 On The Rock",
      tags: ["문화예술", "밴드", "인디"]
    },
    {
      dDay: 3,
      clubImg: "/assets/home/main/1.svg",
      logoSrc: "/assets/home/main/1Logo.svg",
      logoAlt: "1",
      title: "밴드 온더락 6기 모집",
      clubName: "밴드 On The Rock",
      tags: ["문화예술", "밴드", "인디"]
    },
    {
      dDay: 3,
      clubImg: "/assets/home/main/11.svg",
      logoSrc: "/assets/home/main/11Logo.svg",
      logoAlt: "동아리 로고 11",
      title: "로맨스노우 17기 크루원 모집",
      clubName: "ROMAN SNOW",
      tags: ["스키", "스노우보드", "겨울"]
    },
    {
      dDay: 3,
      clubImg: "/assets/home/main/11.svg",
      logoSrc: "/assets/home/main/11Logo.svg",
      logoAlt: "동아리 로고 11",
      title: "로맨스노우 17기 크루원 모집",
      clubName: "ROMAN SNOW",
      tags: ["스키", "스노우보드", "겨울"]
    },
    {
      dDay: 3,
      clubImg: "/assets/home/main/11.svg",
      logoSrc: "/assets/home/main/11Logo.svg",
      logoAlt: "동아리 로고 11",
      title: "로맨스노우 17기 크루원 모집",
      clubName: "ROMAN SNOW",
      tags: ["스키", "스노우보드", "겨울"]
    },
    {
      dDay: 3,
      clubImg: "/assets/home/main/11.svg",
      logoSrc: "/assets/home/main/11Logo.svg",
      logoAlt: "동아리 로고 11",
      title: "로맨스노우 17기 크루원 모집",
      clubName: "ROMAN SNOW",
      tags: ["스키", "스노우보드", "겨울"]
    }
  ];
  return (
    <div className="w-full min-h-[774px] bg-white-100">
      <div className="grid grid-cols-3 gap-8">
        {clubsData.map((club, index) => (
          <ClubCard
            key={index}
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
