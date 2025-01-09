declare interface MainClubData {
  count: number;
  recruits: {
    id: number;
    clubId: number;
    title: string;
    description: string;
    category: string;
    clubType: "INTERNAL" | "EXTERNAL";
    profile: string;
    isDone: boolean;
    caution: string;
    deadline: string;
    createdAt: string;
  }[];
}

//메인 홈 동아리 리스트
declare interface ClubCardProps {
  id: string;
  dDay: number;
  clubImg: string;
  logoSrc: string;
  logoAlt: string;
  title: string;
  clubName: string;
  tags: string[];
  isLarge?: boolean; //크기 변환 prop
}
