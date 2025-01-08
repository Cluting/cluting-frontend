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
