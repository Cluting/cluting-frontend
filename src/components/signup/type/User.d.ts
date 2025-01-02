//자체 회원가입 From
declare interface SignupFormValue {
  name: string; // 사용자 이름
  email: string; // 이메일 주소
  password: string; // 비밀번호
  phone: string; // 전화번호
  location: string; // 지역 정보
  school: string; // 학교 이름
  studentStatus: string; // 학생 상태 (예: "ENROLLED" | "GRADUATED" | "LEAVE")
  semester: string; // 학기 정보 (예:  "S1_1" | "S1_2" | "S2_1" | "S2_2")
  major: string; // 주 전공
  doubleMajor?: string; // 복수 전공 (선택 사항)
  termsOfService: boolean; // 서비스 약관 동의 여부
  privacyPolicy: boolean; // 개인정보 처리방침 동의 여부
  marketingConsent: boolean; // 마케팅 활용 동의 여부
}

//로그인 Form
declare interface LoginFormValue {
  email: string;
  password: string;
}

// 유저 정보 조회
declare interface User {
  id: number;
  email: string;
  name: string;
  role: "ADMIN" | "USER"; // 예시로 "USER"도 포함
  phone: string;
  location: string;
  school: string;
  studentStatus: "ENROLLED" | "GRADUATED" | "LEAVE_OF_ABSENCE"; // 예시로 다른 상태도 포함
  semester: "S1_1" | "S1_2" | "S2_1" | "S2_2"; // 예시로 학기 상태 추가
  major: string;
  doubleMajor?: string; // 복수 전공은 선택 사항으로 처리
  profile: string;
}
