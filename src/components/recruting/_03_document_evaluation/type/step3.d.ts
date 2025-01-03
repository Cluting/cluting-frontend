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
