//zustand 단계 Type

declare interface Store {
  currentStep: number; // 현재 단계의 인덱스
  setCurrentStep: (step: number) => void; // 단계 변경 함수
}

declare interface RecruitmentStore {
  //전체 step
  currentRecruitmentStep: number; // 현재 단계의 인덱스
  setCurrentRecruitmentStep: (step: number) => void; // 단계 변경 함수
}

declare interface GroupStore {
  group: string[];
  setGroup: (group: string[]) => void;
  addGroup: (newGroup: string) => void;
  removeGroup: (groupToRemove: string) => void;
}

declare interface InterviewFormatStore {
  interviewer: number;
  interviewee: number;
  interviewStartDate: Date; // 면접 시작 날짜
  interviewEndDate: Date; // 면접 종료 날짜
  interviewStartTime: Date; // 면접 시작 시간
  interviewEndTime: Date; // 면접 시작 시간
  isTimeSet: boolean; //시간 설정 완료 여부

  setInterviewer: (id: number) => void;
  setInterviewee: (id: number) => void;
  setInterviewStartTime: (time: Date) => void;
  setInterviewEndTime: (time: Date) => void;
  setInterviewStartDate: (date: Date) => void;
  setInterviewEndDate: (date: Date) => void;
}
