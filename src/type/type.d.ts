declare interface SignupFormValue {
  name: string;
  email?: string;
  address?: string;
  school: string;
  studentStatus: string;
  semester: string;
  major: string;
  minors?: string;
}

declare interface LoginFormValue {
  email: string;
  password: string;
}

declare interface RegisterClubFormValue {
  clubImage: FileList;
  clubName: string;
  clubType: string;
  clubCategory: string;
  keywords: string[];
  clubDescription: string;
}

declare interface RecrutingStartFormValue {
  sessionNumber: string;
  interviewType: string;
}

declare interface AdminUser {
  id: string;
  name: string;
  email: string;
}

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

declare interface SetAcceptanceCountFormData {
  documentPassTotal: number;
  finalPassTotal: number;
  groups: {
    documentPass: number;
    finalPass: number;
  }[];
}

//공통 인재상
declare interface DefineCommonIdealForm {
  commonIdeal: string;
  commonIdeals: CommonIdeal[];
}

declare interface CommonIdeal {
  id: number;
  text: string;
}

//그룹별 인재상
interface DefineGroupIdealForm {
  groupIdeals: {
    [groupName: string]: string;
  };
}

interface GroupIdeals {
  [groupName: string]: {
    ideals: GroupIdeal[];
    showInput: boolean;
    value: string;
    nextId: number;
  };
}

interface GroupIdeal {
  id: number;
  text: string;
}
