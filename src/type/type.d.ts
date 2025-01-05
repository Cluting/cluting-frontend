export interface Applicant {
  id: number;
  status: string;
  name: string;
  phone: string;
  group: string;
  rank: string;
  result: string;
}

// 계획하기 운영진
declare interface AdminPlan {
  name: string;
  id: number;
}
