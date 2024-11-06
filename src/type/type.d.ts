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
