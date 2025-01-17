// 평가 전, 중, 후 params
declare interface InterviewEvaluationParams {
  recruitId: number;
  groupName?: string;
  sortOrder?: "newest" | "oldest";
}

//면접 평가 내용 가져오기
declare interface ApplicantInfo {
  name: string;
  email: string;
  phone: string;
  location: string;
  profile: string;
  school: string;
  major: string;
  doubleMajor: string;
  semester: string;
  groupName: string;
}

declare interface QuestionAnswer {
  question: string;
  answer: string;
}

declare interface Score {
  criterion: string;
  score: number;
}

declare interface EvaluatorScore {
  evaluatorName: string;
  scores: Score[];
}

interface InterviewEvaluationContent {
  applicantInfo: ApplicantInfo;
  groupedQuestions: {
    [key: string]: QuestionAnswer[];
  };
  ideals: string[];
  averageScore: number;
  evaluatorScores: EvaluatorScore[];
  myEvaluation: EvaluatorScore;
}

//평가 중 응답
declare interface IngApiApplicant {
  applicationId: number;
  evaluationStage: string;
  applicantName: string;
  applicantPhone: string;
  groupName: string;
  applicationNumClubUser: string;
  createdAt: string;
  currentEvaluator: {
    name: string;
    stage: string;
  };
  otherEvaluators: Array<{
    name: string;
    stage: string;
  }>;
}

declare interface IngApplicant {
  id: string;
  name: string;
  phone: string;
  group: string;
  incomplete: number;
  all: number;
  isPass: undefined;
  evaluators: any[];
  isDecisionMode: boolean;
  isDisputed: boolean;
  evaluationStage: string;
}
