export const RECRUIT_STEP_ITEMS = [
  "계획 세우기",
  "모집 준비하기",
  "서류 평가하기",
  "서류 합격자 및 면접 안내",
  "면접 평가하기",
  "최종 합격자 및 활동 안내"
];

export const PATH = [
  "/recruting/01_plan",
  "/recruting/02_prepare",
  "/recruting/03_document_evaluation",
  "/recruting/04_interview_notification",
  "/recruting/05_interview_evaluation",
  "/recruting/06_final_selection"
];

export const STEP2_ITEMS = [
  "합격 인원 설정하기",
  "인재상 구축하기",
  "공고 작성하기",
  "운영진 면접 일정 조정하기",
  "지원서 폼 제작 및 공고 올리기"
];

export const STEP3_ITEMS = ["서류 평가 준비하기", "서류 평가하기"];

export const STEP4_ITEMS = [
  "지원자 합/불 결과",
  "서류 합격자 면접 일정 조율하기",
  "합/불 및 면접 일정 안내 문자 작성하기"
];

export const STEP5_ITEMS = ["면접 평가 준비하기", "면접 평가하기"];
export const STEP6_ITEMS = [
  "지원자 합/불 결과",
  "합/불 및 활동 안내 문자 작성"
];

export const BUTTON_TEXT = {
  EDIT: "수정하기",
  COMPLETE: "완료하기"
} as const;

export const ERROR_MESSAGES = {
  required: "필수 입력 사항입니다.",
  choice: "필수 선택 사항입니다."
};

export const studentStatusList = [
  { id: 1, description: "재학", value: "ENROLLED" },
  { id: 2, description: "휴학", value: "LEAVE" }
];
export const semesterList = [
  { id: 1, description: "1학년 1학기", value: "S1_1" },
  { id: 2, description: "1학년 2학기", value: "S1_2" },
  { id: 3, description: "2학년 1학기", value: "S2_1" },
  { id: 4, description: "2학년 2학기", value: "S2_2" },
  { id: 5, description: "3학년 1학기", value: "S3_1" },
  { id: 6, description: "3학년 2학기", value: "S3_2" },
  { id: 7, description: "4학년 1학기", value: "S4_1" },
  { id: 8, description: "4학년 2학기", value: "S4_2" }
];
export const clubTypeList = [
  { id: 1, description: "교내", value: "INTERNAL" },
  { id: 2, description: "연합", value: "EXTERNAL" }
];

export const clubCategoryList = [
  { id: 1, description: "문화 / 예술 / 공연", value: "CULTURE" },
  { id: 2, description: "봉사 / 사회 활동", value: "SOCIAL" },
  { id: 3, description: "학술 / 교양", value: "TECHNOLOGY" },
  { id: 4, description: "창업 / 취업", value: "STARTUP" },
  { id: 5, description: "어학", value: "LANGUAGE" },
  { id: 6, description: "체육", value: "PHYSICAL" },
  { id: 7, description: "친목", value: "SOCIAL" },
  { id: 8, description: "기타", value: "ELSE" }
];

export const TermsAgreementdata: Term[] = [
  {
    id: 0,
    key: "termsOfService",
    title: "클루팅 이용약관",
    contents:
      "본 약관은 클루팅 서비스의 이용에 대한 규칙과 조건을 설명합니다. 이용자는 서비스를 사용함으로써 본 약관에 동의하는 것으로 간주됩니다. 서비스 이용 중 발생할 수 있는 문제에 대한 책임은 이용자에게 있습니다. 이용자는 서비스 이용 시 타인의 권리를 침해해서는 안 되며, 위반 시 법적 책임을 질 수 있습니다.",
    status: "[필수]"
  },
  {
    id: 1,
    key: "privacyPolicy",
    title: "개인정보 수집 및 이용",
    contents:
      "클루팅은 이용자의 개인정보를 보호하기 위해 최선을 다하고 있습니다. 수집되는 정보에는 이름, 이메일, 전화번호 등이 포함됩니다. 이 정보는 서비스 제공 및 고객 관리, 마케팅 분석 등을 위해 사용되며, 이용자는 언제든지 자신의 개인정보 열람 및 정정을 요청할 수 있습니다. 개인정보의 보호는 법적 요구 사항을 준수하여 처리됩니다.클루팅은 이용자의 개인정보를 보호하기 위해 최선을 다하고 있습니다. 수집되는 정보에는 이름, 이메일, 전화번호 등이 포함됩니다. 이 정보는 서비스 제공 및 고객 관리, 마케팅 분석 등을 위해 사용되며, 이용자는 언제든지 자신의 개인정보 열람 및 정정을 요청할 수 있습니다. 개인정보의 보호는 법적 요구 사항을 준수하여 처리됩니다.",
    status: "[필수]"
  },
  {
    id: 2,
    key: "marketingConsent",
    title: "마케팅 이벤트 메일 수신 동의",
    contents:
      "이 항목은 클루팅의 마케팅 및 이벤트 정보 수신에 대한 동의를 요청합니다. 동의하실 경우, 새로운 이벤트, 프로모션, 특별 할인 등의 정보를 이메일로 수신하실 수 있습니다. 언제든지 수신 동의를 철회하실 수 있으며, 그 경우 관련 정보는 즉시 중단됩니다. 클루팅은 수신자의 개인정보를 안전하게 보호합니다.",
    status: "[선택]"
  }
];

//하드코딩 임시 데이터
export const ALL_ADMINS = [
  "최예은",
  "박시현",
  "김동현",
  "윤다인",
  "곽서연",
  "양성원",
  "이은재"
];

export const ALL_ADMINS_WITH_ID = [
  { id: 1, name: "최예은" },
  { id: 2, name: "박시현" },
  { id: 3, name: "김동현" },
  { id: 4, name: "윤다인" },
  { id: 5, name: "곽서연" },
  { id: 6, name: "양성원" },
  { id: 7, name: "이은재" }
];

export const DEFAULT_STEPS: Step[] = [
  { id: 1, name: "합격 인원 설정하기", completed: false, admins: [] },
  { id: 2, name: "인재상 구축하기", completed: false, admins: [] },
  { id: 3, name: "공고 작성하기", completed: false, admins: [] },
  {
    id: 4,
    name: "운영진 면접 일정 조율하기",
    admins: ["모든 운영진"],
    completed: false,
    isFixed: true
  },
  { id: 5, name: "지원서 폼 제작", completed: false, admins: [] }
];

export const CALENDAR_ITEMS = [
  "리크루팅 준비 기간",
  "공고 업로드",
  "모집 기간",
  "서류 평가 기간",
  "1차 합격자 발표",
  "면접 기간",
  "면접 평가 기간"
];

export const CALENDAR_COLORS = [
  "#FF6347",
  "#FF9500",
  "#FFCC00",
  "#00C7BE",
  "#34C759",
  "#5856D6",
  "#af52de"
];
export const CHARTS_COLORS = ["#3E0CC4", "#5E2BE8", "#9572F5", "#CAC8FF"];
export const RADIAN = Math.PI / 180;
