// 지원자 상태 타입
declare type ApplicantState =
  | "BEFORE"
  | "ING"
  | "AFTER"
  | "COMPLETE"
  | "READABLE"
  | "EDITABLE";

// 지원자 데이터 타입
declare interface Applicant {
  id: string; // 고유 ID
  name: string;
  phone: string;
  group: string;
  incomplete: number; // 완료 운영진 수
  all: number; //담당 운영진 수
  isPass?: boolean; //합격 여부
  evaluators?: Evaluator[]; // 평가자에 대한 운영진 정보
  isDecisionMode?: boolean; //합불 결정하기 버튼 여부
  isDisputed?: boolean; //이의제기 여부
  evaluationStage?: string; //평가 단계
}

// 평가 기준
declare interface EvaluatorCriteriaScore {
  id: number;
  name: string; // 평가 기준 이름
  score: number; // 평가 점수
}

// 평가자 데이터 타입
declare interface Evaluator {
  name: string; // 평가자 이름
  state: ApplicantState;
  totalScore: number; // 총점
  criteriaScores: EvaluatorCriteriaScore[]; // 평가 기준별 점수
  comment: string; // 평가자 코멘트
  groupAccess: string; // 권한을 가지고 있는 그룹명
}

// Zustand Store 타입
declare interface ApplicantEvaluationStatusStore {
  applicants: Applicant[]; // 지원자 목록
  updateApplicantState: (name: string, newState: ApplicantState) => void; // 지원자 상태 업데이트
}
