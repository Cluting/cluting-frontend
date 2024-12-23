declare interface Recruit {
  id: number;
  title: string;
  description: string;
  image: string;
  isDone: boolean;
  caution: string;
  deadLine: string;
  currentStage: string;
  isInterview: boolean;
  applicationTitle: string;
  isRequiredPortfolio: boolean;
  interviewerCount: number;
  intervieweeCount: number;
  interviewDuration: number;
}

// 동아리 (Club) 전역 상태
declare interface ClubStore {
  clubId: number | null;
  clubName: string;
  setClubInfo: (id: number, name: string) => void;
}

declare interface ClubData {
  id: number;
  recruits: Recruit[];
  name: string;
  description: string;
  profile: string;
  category: string;
  type: "INTERNAL" | "EXTERNAL";
  keyword: string[];
  isRecruiting: boolean;
}

declare interface PopularClubProps {
  logoSrc: string;
  logoAlt: string;
  mainImageSrc: string;
  clubType: string;
  clubTitleFirst: string;
  clubTitleSecond: string;
  tags: string[];
}
