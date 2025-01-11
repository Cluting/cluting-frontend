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
    deadLine: string;
    createdAt: string;
  }[];
}

//메인 홈 동아리 리스트
declare interface ClubCardProps {
  id: number | string;
  dDay: number;
  clubImg: string;
  logoSrc: string;
  logoAlt: string;
  title: string;
  clubName: string;
  tags: string[];
  isLarge?: boolean; //크기 변환 prop
}

declare interface RecruitListParams {
  pageNum?: number;
  sortType?: "DEADLINE" | "NEWEST" | "OLDEST" | "INORDER";
  clubType?: "INTERNAL" | "EXTERNAL";
  fieldType?:
    | "CULTURE"
    | "PHYSICAL"
    | "STARTUP"
    | "LANGUAGE"
    | "SOCIAL"
    | "SERVICE"
    | "ACADEMIC"
    | "ELSE";
}

declare interface RecruitItem {
  id: number;
  clubId: number;
  title: string;
  description: string;
  category: string;
  clubType: string;
  profile: string;
  isDone: boolean;
  caution: string;
  deadLine: string;
  createdAt: string;
}

declare interface ClubCardListProps {
  clubs: RecruitItem[]; //  재사용
}

declare interface RecruitListResponse {
  items: RecruitItem[];
  totalPages: number;
  currentPage: number;
}

declare interface RecruitListParams {
  pageNum?: number;
  sortType?: "DEADLINE" | "NEWEST" | "OLDEST" | "INORDER";
  clubType?: "INTERNAL" | "EXTERNAL";
  fieldType?:
    | "CULTURE"
    | "PHYSICAL"
    | "STARTUP"
    | "LANGUAGE"
    | "SOCIAL"
    | "SERVICE"
    | "ACADEMIC"
    | "ELSE";
}
