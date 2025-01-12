// 계획하기 운영진
export interface AdminPlan {
  name: string;
  id: number;
}

declare interface GetApplicant {
  state: string;
  name: string;
  phone: string;
  part: string;
  score: number;
  rank: number;
  createdAt: string;
  result: string;
}
