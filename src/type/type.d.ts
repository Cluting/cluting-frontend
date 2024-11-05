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

declare interface AdminUser {
  id: string;
  name: string;
  email: string;
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
