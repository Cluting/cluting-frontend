//동아리 등록 Form
declare interface RegisterClubFormValue {
  name: string;
  description: string;
  category: string; // (예: "CULTURE", "PHYSICAL", "STARTUP", "LANGUAGE", "SOCIAL", "TECHNOLOGY", "SERVICE", "ACADEMIC", "ELSE")
  type: string; // (예: "INTERNAL", "EXTERNAL")
  keyword: string[];
  profile?: File | null;
}

//리크루팅 시작하기 모달 Form
declare interface RecrutingStartFormValue {
  sessionNumber: string;
  interviewType: string;
}

//공고 작성 Form
declare interface AnnouncementForm {
  title: string;
  recruitmentStartDate: Date;
  recruitmentEndDate: Date;
  documentResultDate: Date;
  finalResultDate: Date;
  recruitmentNumber: number;
  activityStart: Date;
  activityEnd: Date;
  activityDay: string;
  activityTime: string;
  clubFee: string;
  content: string;
  imageUrl?: File;
}

//이용 약관 Form Type
declare interface Term {
  id: number;
  key: string;
  title: string;
  contents: string;
  status: string;
}

//메인 홈 인기 있는 동아리
declare interface PopularClubProps {
  logoSrc: string;
  logoAlt: string;
  mainImageSrc: string;
  clubType: string;
  clubTitleFirst: string;
  clubTitleSecond: string;
  tags: string[];
}

//메인 홈 동아리 리스트
declare interface ClubCardProps {
  id: string;
  dDay: number;
  clubImg: string;
  logoSrc: string;
  logoAlt: string;
  title: string;
  clubName: string;
  tags: string[];
  isLarge?: boolean; //크기 변환 prop
}

// 합격 인원 설정 Form
declare interface SetAcceptanceCountFormData {
  totalDocumentPassCount: number;
  totalFinalPassCount: number;
  groupInfos: {
    groupName: string;
    documentPassCount: number;
    finalPassCount: number;
  }[];
}

declare interface GroupPassCardProps {
  control: Control<any>;
  groupIndex: number;
  groupName: string;
  errors: any;
  rules: {
    groupName?: any;
    documentPassCount?: any;
    finalPassCount?: any;
  };
}

declare interface GroupPassCountProps {
  control: Control<any>;
  errors: any;
  rules: {
    groupName?: any;
    documentPassCount?: any;
    finalPassCount?: any;
  };
}
// 운영자 Type
declare interface AdminUser {
  id: string;
  name: string;
  email: string;
}

//단계 설정
declare interface Step {
  id: number;
  name: string;
  admins: string[];
  isFixed?: boolean;
}

declare interface PrepareStepRolesFormValues {
  steps: Step[];
}

//2-2 공통 인재상 Form
declare interface CommonIdealForm {
  commonIdeals: {
    text: string;
  }[];
}
//그룹별 인재상 Form
declare interface GroupIdealForm {
  groupIdeals: {
    [key: string]: string;
  };
}

//임원진 일정 Form
declare interface AdminsScheduleFormData {
  scheduleData: TimeSlotAdmins;
}

//임원진 일정
declare interface TimeSlotAdmins {
  [timeSlot: string]: string[];
}

// //2-5 공통 옵션 타입
interface QuestionOption {
  value: string;
}

// 기본 질문 타입
interface Question {
  id?: string; // 프론트엔드에서 사용할 ID
  content: string; //질문
  questionType: "OBJECT" | "SUBJECTIVE";
  objects?: string[]; //객관식 선택지
  hasWordLimit?: boolean; //주관식 글자수 제한 여부
  wordLimit?: number; //주관식 글자수 제한
}

interface PartQuestion {
  partName: string;
  caution: string; // 주의사항
  questions: Question[]; // 질문 목록
}

//2-5 전체 폼 타입
interface CreateApplicationForm {
  title: string;
  partQuestions: PartQuestion[]; //파트별 질문 (공통 질문 포함)
  isPortfolioRequired: boolean;
}

declare interface Groups {
  id: number;
  groupName: string;
  admins: string[];
}

//3-1, 5-1 평가 기준 설정하기
declare interface EvaluationCriteria {
  id: number;
  criteria: string;
  detailCriteria: string[];
  score: number | undefined;
}

declare interface DocumentReviewForm {
  groups: {
    id: number;
    groupName: string;
    admins: string[];
    criteria: EvaluationCriteria[];
    maxScore: number | undefined;
  }[];
}

// 2-4 운영진 면접 일정 조정 Form - 면접관, 면접자
declare interface InterviewNumValue {
  interviewer: number;
  interviewee: number;
}

// 4-3 합격 불합격 메시지
declare interface ResultMessageForm {
  pass: string;
  fail: string;
}
