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

// <평가 전> 지원서 불러오기 API 요청 형식
declare interface DocBeforeRequest {
  groupName: string | null;
  sortOrder: "newest" | "oldest" | null;
}

// <평가 전> 지원서 불러오기 API 응답 형식
declare interface DocBeforeRequestResponse {
  evaluationStage: string;
  applicantName: string;
  applicantPhone: string;
  groupName: string;
  applicationNumClubUser: string;
  createdAt: string;
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

declare interface DocIngApplicant {
  evaluationStage: string;
  applicantName: string;
  applicantPhone: string;
  groupName: string;
  applicationNumClubUser: string;
  createdAt: string;
}

// <평가 중> 지원서 불러오기 API 응답 형식
declare interface DocIngResponse {
  ING: DocIngApplicant[];
  EDITABLE: [];
}

// 서류 평가 전송 API 요청 형식
interface DocEvaluationRequest {
  criteriaEvaluations: CriteriaEvaluation[];
  comment: string;
}

interface CriteriaEvaluation {
  criteriaId: number;
  score: number;
}

// 서류 평가 지원자 정보 조회
declare interface ApplicantInfo {
  name: string;
  email: string;
  phone: string;
  location: string;
  profile: string;
  school: string;
  major: string;
  doubleMajor: string | null;
  semester: string;
  groupName: string;
}

declare interface EvaluatorScore {
  evaluatorName: string;
  scores: number[];
  totalScore: number;
  comment: string;
}

declare interface DocEvaluationContent {
  applicantInfo: ApplicantInfo;
  questionAndAnswers: any[]; // You might want to define a more specific type
  groupIdeals: GroupIdeal[];
  averageScore: number;
  evaluatorScores: EvaluatorScore[];
  myEvaluation: any | null; // You might want to define a more specific type
}

declare interface GroupIdeal {
  question: string;
  ideals: string[];
}

interface ApplicantInfo {
  name: string;
  email: string;
  phone: string;
  location: string;
  profile: string;
  school: string;
  major: string;
  doubleMajor: string | null;
  semester: string;
  groupName: string;
}

interface EvaluatorScore {
  evaluatorName: string;
  scores: number[];
  totalScore: number;
  comment: string;
}
