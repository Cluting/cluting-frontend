import PopularClub from "./PopularClub";

export default function MainBanner() {
  const clubsData = [
    {
      logoSrc: "assets/home/banner/popularClub1Logo.svg",
      logoAlt: "요술랭 로고",
      mainImageSrc: "assets/home/banner/popularClub1.svg",
      clubType: "연합",
      clubTitleFirst: "대학 연합",
      clubTitleSecond: "요리 동아리 요슐랭",
      tags: ["이색", "요리", "친목"]
    },
    {
      logoSrc: "assets/home/banner/popularClub2Logo.svg",
      logoAlt: "잇타 로고",
      mainImageSrc: "assets/home/banner/popularClub2.svg",
      clubType: "연합",
      clubTitleFirst: "IT 서비스",
      clubTitleSecond: "동아리 잇타",
      tags: ["IT", "프로그래밍", "서비스기획"]
    },
    {
      logoSrc: "assets/home/banner/popularClub3Logo.svg",
      logoAlt: "세번째 동아리 로고",
      mainImageSrc: "assets/home/banner/popularClub3.svg",
      clubType: "교내",
      clubTitleFirst: "데이터 기반",
      clubTitleSecond: "UX 학회 UXO",
      tags: ["UX", "데이터분석", "서비스"]
    }
  ];

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
        {clubsData.map((club, index) => (
          <PopularClub
            key={index}
            logoSrc={club.logoSrc}
            logoAlt={club.logoAlt}
            mainImageSrc={club.mainImageSrc}
            clubType={club.clubType}
            clubTitleFirst={club.clubTitleFirst}
            clubTitleSecond={club.clubTitleSecond}
            tags={club.tags}
          />
        ))}
      </div>
    </div>
  );
}
