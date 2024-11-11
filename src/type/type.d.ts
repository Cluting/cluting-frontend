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

declare interface Step {
  id: number;
  name: string;
  admins: string[];
  isFixed?: boolean;
}

declare interface PrepareStepRolesFormValues {
  steps: Step[];
}

//공통 인재상
declare interface CommonIdealForm {
  commonIdeal: string;
  commonIdeals: CommonIdeal[];
}

declare interface CommonIdeal {
  id: number;
  text: string;
}

//그룹별 인재상
declare interface GroupIdealForm {
  groupIdeals: {
    [groupName: string]: string;
  };
}

declare interface GroupIdeals {
  [groupName: string]: {
    ideals: GroupIdeal[];
    showInput: boolean;
    value: string;
    nextId: number;
  };
}

declare interface AdminsScheduleFormData {
  scheduleData: TimeSlotAdmins;
}

declare interface TimeSlotAdmins {
  [timeSlot: string]: string[];
}
