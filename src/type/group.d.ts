//그룹
declare interface Group {
  index: number; // 고유 ID
  name: string;
  documentPass: number; //서류 합격 인원
  finalPass: number; //최종 합격 인원
  numRecruit: number; //지원자 수
}

//그룹 인재상
declare interface Ideals {
  groupIndex: number;
  ideals: string[]; // FIX: 인재상 index에 따른 인재상 내용
}

// 그룹 평가 기준
declare interface GroupCriteria {
  groupIndex: number; // 그룹 ID
  criteria: ""; //평가 기준
  detailCriteria: []; //세부 평가 기준
  score: number; //점수
}

declare interface Criteria {
  criteria: Criteria[];
  maxScore: number; // 서류 만점 점수
}

// Zustand useGroupStore 타입
declare interface GroupStore {
  group: {
    index: number;
    name: string;
    documentPass: number;
    finalPass: number;
    ideals: string[]; // 인재상 추가
  }[];
  setGroup: (
    group: {
      index: number;
      name: string;
      documentPass: number;
      finalPass: number;
      ideals: string[]; // 인재상 추가
    }[]
  ) => void;
  addGroup: (newGroup: string) => void;
  removeGroup: (groupToRemove: string) => void;
}
