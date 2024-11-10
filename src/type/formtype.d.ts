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

// 합격 인원 설정 Form
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

interface Step {
  id: number;
  name: string;
  admins: string[];
  isFixed?: boolean;
}

interface PrepareStepRolesFormValues {
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
interface GroupIdealForm {
  groupIdeals: {
    [groupName: string]: string;
  };
}

interface GroupIdeals {
  [groupName: string]: {
    ideals: GroupIdeal[];
    showInput: boolean;
    value: string;
    nextId: number;
  };
}
