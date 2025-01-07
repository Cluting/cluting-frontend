//2-2 Form
declare interface PartIdeal {
  partName: string;
  content: string[];
}

declare interface IdealForm {
  partIdeals: PartIdeal[];
}

//GET
declare interface GroupResponse {
  groupId: number;
  idealContent: {
    [key: string]: string;
  };
  numDoc: number;
  numFinal: number;
}

declare interface PassIdealResponse {
  recruitId: number;
  title: string;
  numDoc: number;
  numFinal: number;
  groupResponses: GroupResponse[];
}

// 현재 서버 응답 구조를 위한 임시 타입
declare interface IdealItem {
  id: number;
  content: string;
}
declare interface CurrentResponse {
  recruitId: number;
  title: string;
  numDoc: number;
  numFinal: number;
  ideals: IdealItem[];
}
