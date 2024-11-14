//Form Type
declare interface SignupFormValue {
  name: string;
  email?: string;
  address?: string;
  school: string;
  studentStatus: string;
  semester: string;
  major: string;
  minors?: string;
  termsOfService: boolean; // 클루팅 이용약관 동의
  privacyPolicy: boolean; // 개인정보 수집 및 이용 동의
  marketingConsent?: boolean; // 마케팅 이벤트 메일 수신 동의
}

declare interface LoginFormValue {
  email: string;
  password: string;
}

declare interface RegisterClubFormValue {
  clubImage: FileList;
  clubName: string;
  clubType: string;
  clubCategory: string;
  keywords: string[];
  clubDescription: string;
}

declare interface RecrutingStartFormValue {
  sessionNumber: string;
  interviewType: string;
}

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

declare interface Term {
  id: number;
  key: string;
  title: string;
  contents: string;
  status: string;
}

declare interface SetAcceptanceCountFormData {
  documentPassTotal: number;
  finalPassTotal: number;
  groups: {
    documentPass: number;
    finalPass: number;
  }[];
}

// 운영자 Type
declare interface AdminUser {
  id: string;
  name: string;
  email: string;
}

//메인 페이지 popularClub
declare interface PopularClubProps {
  logoSrc: string;
  logoAlt: string;
  mainImageSrc: string;
  clubType: string;
  clubTitleFirst: string;
  clubTitleSecond: string;
  tags: string[];
}

//zustand 단계 Type

declare interface Store {
  currentStep: number; // 현재 단계의 인덱스
  setCurrentStep: (step: number) => void; // 단계 변경 함수
}

declare interface RecruitmentStore {
  //전체 step
  currentRecruitmentStep: number; // 현재 단계의 인덱스
  setCurrentRecruitmentStep: (step: number) => void; // 단계 변경 함수
}

declare interface GroupStore {
  group: string[];
  setGroup: (group: string[]) => void;
  addGroup: (newGroup: string) => void;
  removeGroup: (groupToRemove: string) => void;
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

//2-5 질문 드롭다운 타입
declare type QuestionType = "서술형 질문" | "객관형 질문";

//2-5 질문들(서술형, 객관형) 정보 정의
declare interface Question {
  id: string;
  type: QuestionType;
  question: string;
  hasWordLimit?: boolean; //서술형 질문의 글자 수 제한 여부
  wordLimit?: number; //서술형 질문의 글자 수 제한
  options?: string[]; // 객관식 선택지
}

// 그룹별 질문 구조
declare interface GroupQuestion {
  caution: string;
  questions: {
    [questionId: string]: Question;
  };
}

//2-5 지원서 폼 제작 Form
declare interface CreateApplicationForm {
  title: string;
  commonQuestionCaution: string;
  commonQuestions: {
    [questionId: string]: Question;
  };

  // 그룹별 질문 섹션
  groupQuestionCaution: string;
  groupQuestions: {
    [groupName: string]: GroupQuestion;
  };

  // 포트폴리오 섹션
  hasPortfolio: boolean;
}

//3-1 group+admin 배열
declare interface GroupWithAdmin {
  id: number;
  groupName: string;
  admins: string[];
}
