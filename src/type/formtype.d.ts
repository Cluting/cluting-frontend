//자체 회원가입 From
declare interface SignupFormValue {
  name: string; // 사용자 이름
  email: string; // 이메일 주소
  password: string; // 비밀번호
  phone: string; // 전화번호
  location: string; // 지역 정보
  school: string; // 학교 이름
  studentStatus: string; // 학생 상태 (예: "ENROLLED" | "GRADUATED" | "LEAVE")
  semester: string; // 학기 정보 (예:  "S1_1" | "S1_2" | "S2_1" | "S2_2")
  major: string; // 주 전공
  doubleMajor?: string; // 복수 전공 (선택 사항)
  termsOfService: boolean; // 서비스 약관 동의 여부
  privacyPolicy: boolean; // 개인정보 처리방침 동의 여부
  marketingConsent: boolean; // 마케팅 활용 동의 여부
}

//로그인 Form
declare interface LoginFormValue {
  email: string;
  password: string;
}

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
  recruitmentStart: Date;
  recruitmentEnd: Date;
  announcementDate: Date;
  finalResultAnnouncementDate: Date;
  recruitsCount: number;
  activityStart: Date;
  activityEnd: Date;
  activityDay: string;
  activityTime: string;
  clubFee: string;
  posterImage?: File;
  content: string;
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
  dDay: number;
  clubImg: string;
  logoSrc: string;
  logoAlt: string;
  title: string;
  clubName: string;
  tags: string[];
}

// 합격 인원 설정 Form
declare interface SetAcceptanceCountFormData {
  documentPassTotal: number;
  finalPassTotal: number;
  groups: {
    documentPass: number;
    finalPass: number;
  }[];
}

declare interface GroupPassCardProps {
  control: Control<any>;
  groupIndex: number;
  groupName: string;
  errors?: any;
  rules?: RegisterOptions;
}

declare interface GroupPassCountProps {
  control: Control<any>;
  errors?: any;
  rules?: RegisterOptions;
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

//공통 인재상(배열로) Form
declare interface CommonIdealForm {
  commonIdeal: string;
  commonIdeals: CommonIdeal[];
}

//공통 인재상
declare interface CommonIdeal {
  id: number;
  text: string;
}

//그룹별 인재상 Form
declare interface GroupIdealForm {
  groupIdeals: {
    [groupName: string]: string;
  };
}

//그룹별 인재상
declare interface GroupIdeals {
  [groupName: string]: {
    ideals: GroupIdeal[];
    showInput: boolean;
    value: string;
    nextId: number;
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

//2-5
declare interface BaseQuestion {
  id: string;
  question: string;
  type: "서술형 질문" | "객관형 질문";
}

declare interface DescriptiveQuestion extends BaseQuestion {
  type: "서술형 질문";
  hasWordLimit: boolean;
  wordLimit: number;
  options: [];
}

declare interface MultipleChoiceQuestion extends BaseQuestion {
  type: "객관형 질문";
  hasWordLimit?: never; // 객관형은 글자수 제한 사용 안 함
  wordLimit?: never;
  options: Array<{
    id: string;
    value: string;
  }>;
}

declare type Question = DescriptiveQuestion | MultipleChoiceQuestion;

declare interface QuestionSection {
  caution: string;
  questions: Record<string, Question>;
}

declare interface CreateApplicationForm {
  title: string;
  applyGroups: string[];
  commonSection: {
    caution: string;
    questions: Record<string, Question>;
  };
  groupSections: Record<string, QuestionSection>;
  portfolio: {
    enabled: boolean;
    requirements?: string;
  };
  multipleApplicationAllowed: boolean;
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

// 운영진 면접 일정 조정 Form - 면접관, 면접자
declare interface InterviewNumValue {
  interviewer: number;
  interviewee: number;
}

// 4-3 합격 불합격 메시지
declare interface ResultMessageForm {
  pass: string;
  fail: string;
}
