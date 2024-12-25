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

//2-2 인재상
declare interface CommonIdeal {
  id: number;
  text: string;
}

declare interface CommonIdealForm {
  commonIdeals: CommonIdeal[];
}

declare interface GroupIdeal {
  id: number;
  text: string;
  groupName: string;
}

declare interface GroupIdealForm {
  groupIdeals: GroupIdeal[];
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

declare interface QuestionSection {
  caution: string;
  questions: Record<string, Question>;
}

declare type Question = DescriptiveQuestion | MultipleChoiceQuestion;

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

//투두
declare interface TodoInsertProps {
  onInsert: (value: string) => void;
}

declare interface Todo {
  id: number;
  content: string;
  status: boolean;
}

declare interface TodoRequest {
  content: string;
}

declare interface TodoListProps {
  todos: Todo[];
  onToggle: (id: number) => void;
  onRemove: (id: number) => void;
}

interface TodoListItemProps {
  todo: Todo;
  onToggle: (id: number) => void;
  onRemove: (id: number) => void;
}
