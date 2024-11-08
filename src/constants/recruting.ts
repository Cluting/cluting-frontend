export const RECRUIT_STEP_ITEMS = [
  "계획 세우기",
  "모집 준비하기",
  "서류 평가하기",
  "서류 합격자 및 면접 안내",
  "면접 평가하기",
  "최종 합격자 및 활동 안내"
];

export const STEP2_ITEMS = [
  "합격 인원 설정하기",
  "인재상 구축하기",
  "공고 작성하기",
  "운영진 면접 일정 조정하기",
  "지원서 폼 제작 및 공고 올리기"
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
  { id: 1, description: "재학" },
  { id: 2, description: "휴학" }
];
export const semesterList = [
  { id: 1, description: "1학년 1학기" },
  { id: 2, description: "1학년 2학기" },
  { id: 3, description: "2학년 1학기" },
  { id: 4, description: "2학년 2학기" },
  { id: 5, description: "3학년 1학기" },
  { id: 6, description: "3학년 2학기" },
  { id: 7, description: "4학년 1학기" },
  { id: 8, description: "4학년 2학기" }
];
export const clubTypeList = [
  { id: 1, description: "교내" },
  { id: 2, description: "연합" }
];
export const clubCategoryList = [
  { id: 1, description: "전체" },
  { id: 2, description: "문화 / 예술 / 공연" },
  { id: 3, description: "봉사 / 사회 활동" },
  { id: 4, description: "학술 / 교양" },
  { id: 5, description: "창업 / 취업" },
  { id: 6, description: "어학" },
  { id: 7, description: "체육" },
  { id: 8, description: "친목" },
  { id: 9, description: "기타" }
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
