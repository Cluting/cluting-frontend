//2-1 합격 인원 설정 Form
declare interface SetAcceptanceCountFormData {
  totalDocumentPassCount: number;
  totalFinalPassCount: number;
  groupInfos: {
    groupName: string;
    documentPassCount: number;
    finalPassCount: number;
  }[];
}

declare interface GroupPassCardProps {
  control: Control<any>;
  groupIndex: number;
  groupName: string;
  errors: any;
  rules: {
    groupName?: any;
    documentPassCount?: any;
    finalPassCount?: any;
  };
}

declare interface GroupPassCountProps {
  control: Control<any>;
  errors: any;
  rules: {
    groupName?: any;
    documentPassCount?: any;
    finalPassCount?: any;
  };
}
