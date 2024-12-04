// 평가자의 평가 처리 상태
declare type ApplicantState = "평가 전" | "평가 중" | "평가 완료";

// 지원자
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
}

// 평가 기준
declare interface EvaluatorCriteriaScore {
  id: number;
  name: string; // 평가 기준 이름
  score: number; // 평가 점수
}

// 평가 정보
interface Evaluation {
  id: string;
  state: string;
  criteriaScores: EvaluatorCriteriaScoreㄴ[];
  comment: string;
  totalScore: number;
}

// 평가자
interface Evaluator {
  name: string;
  groupAccess: string; // 평가자가 담당하는 그룹
  evaluation: Evaluation[]; // 평가 정보
}

// 서류 평가 결과 제출
declare interface documentEvaluationForm {
  applicantId: string; //지원자 ID
  evaluatorId: string; //평가자 ID
  criteriaScores: EvaluatorCriteriaScore[]; // 평가 기준 별 점수
  totalScore: number; //전체 점수
  comment: string; // 서류 평가 코멘트
}

// Zustand useApplicantEvaluationStore 타입
declare interface ApplicantEvaluationStatusStore {
  applicants: Applicant[]; // 지원자 목록
  updateApplicantState: (name: string, newState: ApplicantState) => void; // 지원자 상태 업데이트
}

// Zustand useEvaluatorStore 타입
declare interface EvaluatorStore {
  evaluator: Evaluator;
  updateEvaluationState: (
    id: string,
    newState: "평가 전" | "평가 중" | "평가 완료"
  ) => void;
}
