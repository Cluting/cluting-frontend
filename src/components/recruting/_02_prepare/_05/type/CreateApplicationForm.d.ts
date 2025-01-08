interface QuestionItemProps {
  question: Question;
  partName: string;
  questionIndex: number;
  onTypeChange: (
    partName: string,
    questionId: string,
    newType: "OBJECT" | "SUBJECT"
  ) => void;
  onDelete: (partName: string, questionId: string) => void;
  onAddOption: (partName: string, questionId: string, value: string) => void;
  onRemoveOption: (
    partName: string,
    questionId: string,
    optionIndex: number
  ) => void;
  register: UseFormRegister<CreateApplicationForm>;
  setValue: UseFormSetValue<CreateApplicationForm>;
  watch: UseFormWatch<CreateApplicationForm>;
  errors?: FieldErrors<CreateApplicationForm>;
  isSubmitted: boolean;
  partIndex: number;
}

// //2-5 공통 옵션 타입
interface QuestionOption {
  value: string;
}

// 기본 질문 타입
interface Question {
  id?: string;
  content: string; //질문
  questionType: "OBJECT" | "SUBJECT";
  objects?: string[]; //객관식 선택지
  hasWordLimit?: boolean; //주관식 글자수 제한 여부
  wordLimit?: number; //주관식 글자수 제한
  multiSelect?: boolean; //객관식 중복 선택 여부
}

interface PartQuestion {
  partName: string;
  caution: string; // 주의사항
  questions: Question[]; // 질문 목록
}

//2-5 전체 폼 타입
interface CreateApplicationForm {
  title: string;
  multiApply: boolean; //다중 지원 가능 여부
  partQuestions: PartQuestion[]; //파트별 질문 (공통 질문 포함)
  isPortfolioRequired: boolean;
}
