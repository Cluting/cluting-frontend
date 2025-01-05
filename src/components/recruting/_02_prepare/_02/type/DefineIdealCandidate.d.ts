//2-2 Form
declare interface PartIdeal {
  partName: string;
  content: string[];
}

declare interface IdealForm {
  partIdeals: PartIdeal[];
}

declare interface PassIdealResponse {
  recruitId: number;
  title: string;
  numDoc: number;
  numFinal: number;
  ideals: {
    id: number;
    content: string;
  }[];
}
