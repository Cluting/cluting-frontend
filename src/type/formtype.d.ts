//회원가입 From
declare interface SignupFormValue {
  name: string;
  email?: string;
  location?: string;
  school: string;
  studentStatus: string; //FIX: IsOnLeaver, boolean 값임 수정 필요
  semester: string;
  major: string;
  doubleMajor?: string;
  //FIX: 약관 동의 백 요청에 없음
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

//공통 인재상 Form
declare interface CommonIdealForm {
  commonIdeal: string;
  commonIdeals: CommonIdeal[];
}

//그룹별 인재상 Form
declare interface GroupIdealForm {
  groupIdeals: {
    [groupName: string]: string;
  };
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

//3-1 평가 기준 설정하기
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

// 4-3 합격 불합격 메시지 Form
declare interface ResultMessageForm {
  pass: string;
  fail: string;
}
