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

export const ALL_ADMINS = [
  "최예은",
  "박시현",
  "김동현",
  "윤다인",
  "곽서연",
  "양성원",
  "이은재"
];

export const DEFAULT_STEPS: Step[] = [
  { id: 1, name: "합격 인원 설정하기", admins: [] },
  { id: 2, name: "인재상 구축하기", admins: [] },
  { id: 3, name: "공고 작성하기", admins: [] },
  {
    id: 4,
    name: "운영진 면접 일정 조율하기",
    admins: ["모든 운영진"],
    isFixed: true
  },
  { id: 5, name: "지원서 폼 제작", admins: [] }
];
