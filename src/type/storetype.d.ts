//zustand 단계 Type

// 로그인 여부 store 타입
declare interface AuthState {
  isLogin: boolean;
  setLogin: (state: boolean) => void;
}

declare interface Step {
  id: number;
  name: string;
  completed: boolean; // 단계 완료 여부
  admins?: string[]; // 관리자의 이름 배열
}

declare interface Store {
  currentStep: number;
  steps: Step[]; // 각 단계의 상태를 추적하기 위한 배열
  setCurrentStep: (step: number) => void; // 현재 단계를 설정하는 함수
  setStepCompleted: (stepId: number, completed: boolean) => void; // 단계 완료 상태 변경
}

declare interface RecruitmentStore {
  // 전체 step
  currentRecruitmentStep: number; // 현재 단계의 인덱스
  setCurrentRecruitmentStep: (step: number) => void; // 단계 변경 함수

  // 단계 완료 여부 배열 및 관련 메서드
  completedSteps: boolean[]; // 각 단계의 완료 여부를 저장하는 배열
  completeStep: (step: number, isCompleted: boolean) => void; // 특정 단계의 완료 여부를 설정하는 함수
}

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

declare interface InterviewFormatStore {
  interviewer: number;
  interviewee: number;
  interviewDuration: number;
  interviewStartDate: Date; // 면접 시작 날짜
  interviewEndDate: Date; // 면접 종료 날짜
  interviewStartTime: Date; // 면접 시작 시간
  interviewEndTime: Date; // 면접 시작 시간
  isTimeSet: boolean; //시간 설정 완료 여부

  setInterviewer: (id: number) => void;
  setInterviewee: (id: number) => void;
  setInterviewDuration: (time: number) => void;
  setInterviewStartTime: (time: Date) => void;
  setInterviewEndTime: (time: Date) => void;
  setInterviewStartDate: (date: Date) => void;
  setInterviewEndDate: (date: Date) => void;
  applyTimeSettings: () => void; // 시간 설정 적용 함수
}

//동아리 기수
declare interface RecruitmentSessionStore {
  sessionNumber: number; // 현재 기수
  setSessionNumber: (session: number) => void; // 기수를 설정하는 함수
}

//리크루팅 시작 여부
declare interface RecruitmentStartStore {
  isRecruitingStarted: boolean; // 리크루팅 시작 여부
  startRecruiting: () => void; // 리크루팅 시작 메서드
}

// 클럽 (동아리) 정보
declare interface ClubInfoStore {
  clubProfile: string;
  clubName: string;
  generation: number;
  currentStage: string;
  setClubProfile: (profile: string) => void;
  setClubName: (name: string) => void;
  setGeneration: (gen: number) => void;
  setCurrentStage: (stage: string) => void;
}
