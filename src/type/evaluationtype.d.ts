// 지원자 상태 타입
declare type ApplicantState = "평가 전" | "평가 중" | "평가 완료";

// 지원자 데이터 타입
declare interface Applicant {
  id: string; // 고유 ID
  name: string;
  phone: string;
  group: string;
  state: ApplicantState;
  incomplete: number; // 완료 운영진 수
  all: number; //담당 운영진 수
  isDisputed: boolean; //이의제기 여부
  isPass: boolean; //합격 여부
}

// Zustand Store 타입
declare interface ApplicantEvaluationStatusStore {
  applicants: Applicant[]; // 지원자 목록
  updateApplicantState: (name: string, newState: ApplicantState) => void; // 지원자 상태 업데이트
}
