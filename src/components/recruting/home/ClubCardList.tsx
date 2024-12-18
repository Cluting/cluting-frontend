import ClubCard from "./ClubCard";
export default function ClubCardList() {
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
      clubImg: "/assets/home/main/2.svg",
      logoSrc: "/assets/home/main/2Logo.svg",
      logoAlt: "2",
      title: "맛집 탐방 동아리 '연' 2기 모집",
      clubName: "맛집 탐방 동아리 '연'",
      tags: ["맛집", "연합", "미식"]
    },
    {
      dDay: 3,
      clubImg: "/assets/home/main/3.svg",
      logoSrc: "/assets/home/main/3Logo.svg",
      logoAlt: "동아리 로고 3",
      title: "낙화 밴드 기타 추가모집",
      clubName: "밴드 낙화",
      tags: ["밴드", "기타", "대학생"]
    },
    {
      dDay: 3,
      clubImg: "/assets/home/main/4.svg",
      logoSrc: "/assets/home/main/4Logo.svg",
      logoAlt: "동아리 로고 3",
      title: "Tour de Force 4기 모집",
      clubName: "연합 봉사 동아리 our de Force",
      tags: ["연합", "봉사", "대학생"]
    },
    {
      dDay: 3,
      clubImg: "/assets/home/main/5.svg",
      logoSrc: "/assets/home/main/5Logo.svg",
      logoAlt: "동아리 로고 5",
      title: "댄스 동아리 디온 13기 모집",
      clubName: "댄스 D-ON",
      tags: ["댄스", "공연", "실용댄스"]
    },
    {
      dDay: 3,
      clubImg: "/assets/home/main/6.svg",
      logoSrc: "/assets/home/main/6Logo.svg",
      logoAlt: "동아리 로고 6",
      title: "일본어 동아리 오소이 부원 모집",
      clubName: "오소이",
      tags: ["일본어", "어학", "교류"]
    },
    {
      dDay: 3,
      clubImg: "/assets/home/main/7.svg",
      logoSrc: "/assets/home/main/7Logo.svg",
      logoAlt: "동아리 로고 7",
      title: "일이 활발 동아리 UNSC 신규 모집",
      clubName: "UNSC",
      tags: ["IT", "개발", "기획"]
    },
    {
      dDay: 3,
      clubImg: "/assets/home/main/8.svg",
      logoSrc: "/assets/home/main/8Logo.svg",
      logoAlt: "동아리 로고 8",
      title: "IT 서비스 동아리 잇타 6기 모집",
      clubName: "잇타",
      tags: ["IT", "개발", "서비스기획"]
    },
    {
      dDay: 3,
      clubImg: "/assets/home/main/9.svg",
      logoSrc: "/assets/home/main/9Logo.svg",
      logoAlt: "동아리 로고 9",
      title: "FRONT LINE 신규 3기 모집합니다!",
      clubName: "Front Line",
      tags: ["게임", "프로젝트", "개발"]
    },
    {
      dDay: 3,
      clubImg: "/assets/home/main/10.svg",
      logoSrc: "/assets/home/main/10Logo.svg",
      logoAlt: "동아리 로고 10",
      title: "전람 디자인 동아리 뉴비 6기 모집",
      clubName: "New-B",
      tags: ["디자인", "그래픽", "전시"]
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
      clubImg: "/assets/home/main/12.svg",
      logoSrc: "/assets/home/main/12Logo.svg",
      logoAlt: "동아리 로고 12",
      title: "트라이브 4기 멤버 모집합니다.",
      clubName: "Tribe",
      tags: ["운동", "레저", "스노우보드"]
    }
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[53px]">
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
          isLarge={true}
        />
      ))}
    </div>
  );
}
