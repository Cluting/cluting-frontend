//동아리 등록 Form
declare interface RegisterClubFormValue {
  clubImage: FileList;
  clubName: string;
  clubType: string;
  clubCategory: string;
  keywords: string[];
  clubDescription: string;
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
