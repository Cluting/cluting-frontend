//회원가입 From
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

//로그인 Form
declare interface LoginFormValue {
  email: string;
  password: string;
}

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
    showInput: boolean[];
    value: string[];
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

//2-5 객관형 질문들
declare interface Option {
  id: string;
  value: string;
}

//2-5 질문들(서술형, 객관형) 정보 정의
declare interface Question {
  id: string;
  type: QuestionType;
  question: string;
  hasWordLimit?: boolean; //서술형 질문의 글자 수 제한 여부
  wordLimit?: number; //서술형 질문의 글자 수 제한
  options: Option[]; // 객관형 질문의 객관식들
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
interface GroupDetails {
  index: number;
  name: string;
  documentPass: number;
  finalPass: number;
  ideals: string[];
}

declare interface GroupWithAdmin {
  id: number;
  groupName: GroupDetails; // groupName의 타입을 string에서 GroupDetails로 변경
  admins: any[]; // 필요에 따라 적절한 타입으로 수정
}
// 운영진 면접 일정 조정 Form - 면접관, 면접자
interface InterviewNumValue {
  interviewer: number;
  interviewee: number;
}
