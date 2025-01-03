// 서류 평가 준비하기 API 형식
declare interface GroupRequest {
  groups: Group[];
}

declare interface Group {
  groupName: string;
  admins: string[];
  criteria: Criterion[];
  maxScore: number | undefined;
}

declare interface Criterion {
  criteria: string;
  detailCriteria: string[];
  score: number | undefined;
}

// <평가 전> 지원서 불러오기 API 형식
declare interface DocBeforeRequest {
  groupName: string | null;
  sortOrder: "newest" | "oldest" | null;
}

// <평가 전> 지원서 불러오기 API 응답 형식
declare interface ApplicationResponse {
  evaluationStage: string;
  applicantName: string;
  applicantPhone: string;
  groupName: string;
  applicationNumClubUser: string;
  createdAt: string;
}
