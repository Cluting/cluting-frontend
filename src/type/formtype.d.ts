//동아리 등록 Form
declare interface RegisterClubFormValue {
  name: string;
  description: string;
  category: string; // (예: "CULTURE", "PHYSICAL", "STARTUP", "LANGUAGE", "SOCIAL", "TECHNOLOGY", "SERVICE", "ACADEMIC", "ELSE")
  type: string; // (예: "INTERNAL", "EXTERNAL")
  keyword: string[];
}

//리크루팅 시작하기 모달 Form
declare interface RecrutingStartFormValue {
  generation: number;
  isInterview: boolean;
}

//공고 작성 Form
declare interface AnnouncementForm {
  title: string;
  recruitmentStartDate: Date;
  recruitmentEndDate: Date;
  documentResultDate: Date; // 서류 합격자 발표일
  finalResultDate: Date; // 최종 합격자 발표일
  recruitmentNumber: number; //모집 인원
  activityStart: Date;
  activityEnd: Date;
  activityDay: string;
  activityTime: string;
  clubFee: string;
  posterImage?: File;
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
  admins: AdminPlan[];
  isFixed?: boolean;
}

declare interface PrepareStepRolesFormValues {
  steps: Step[];
}

//임원진 일정 Form
declare interface AdminsScheduleFormData {
  scheduleData: TimeSlotAdmins;
}

//임원진 일정
declare interface TimeSlotAdmins {
  [timeSlot: string]: string[];
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
