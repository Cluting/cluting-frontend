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
