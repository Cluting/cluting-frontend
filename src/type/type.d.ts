export interface Applicant {
  id: number;
  status: string;
  name: string;
  phone: string;
  group: string;
  rank: string;
  result: string;
}

//메인 홈 인기 있는 동아리
declare interface PopularClubProps {
  logoSrc: string;
  logoAlt: string;
  mainImageSrc: string;
  clubType: string;
  clubTitleFirst: string;
  clubTitleSecond: string;
  tags: string[];
}

declare interface GroupPassCardProps {
  control: Control<any>;
  groupIndex: number;
  groupName: string;
  errors?: any;
  rules?: RegisterOptions;
}

declare interface GroupPassCountProps {
  control: Control<any>;
  errors?: any;
  rules?: RegisterOptions;
}

//단계 설정
declare interface Step {
  id: number;
  name: string;
  admins: string[];
  isFixed?: boolean;
}

declare interface PrepareStepRolesFormValues {
  steps: Step[];
}

//공통 인재상
declare interface CommonIdeal {
  id: number;
  text: string;
}

//그룹별 인재상
declare interface GroupIdeals {
  [groupName: string]: {
    ideals: GroupIdeal[];
    showInput: boolean;
    value: string;
    nextId: number;
  };
}

//2-5
declare interface BaseQuestion {
  id: string;
  question: string;
  type: "서술형 질문" | "객관형 질문";
}

declare interface DescriptiveQuestion extends BaseQuestion {
  type: "서술형 질문";
  hasWordLimit: boolean;
  wordLimit: number;
  options: [];
}

declare interface MultipleChoiceQuestion extends BaseQuestion {
  type: "객관형 질문";
  hasWordLimit?: never; // 객관형은 글자수 제한 사용 안 함
  wordLimit?: never;
  options: Array<{
    id: string;
    value: string;
  }>;
}

declare type Question = DescriptiveQuestion | MultipleChoiceQuestion;

declare interface QuestionSection {
  caution: string;
  questions: Record<string, Question>;
}
