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
  clubName: string;
  clubType: string;
  clubCategory: string;
  keywords: string[];
  clubDescription: string;
}
