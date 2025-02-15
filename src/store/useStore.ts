import { create } from "zustand";

// 리크루팅 전체 단계
export const useRecruitmentStepStore = create<RecruitmentStore>()((set) => ({
  currentRecruitmentStep: 0,
  completedSteps: [] as boolean[],

  setCurrentRecruitmentStep: (step: number) =>
    set({ currentRecruitmentStep: step }),

  // Modified completeStep function
  completeStep: (step: number, isCompleted: boolean) =>
    set((state) => {
      const updatedCompletedSteps = [...state.completedSteps];
      updatedCompletedSteps[step] = isCompleted;
      return { completedSteps: updatedCompletedSteps };
    })

  // The resetStepCompletion function can be removed as it's now redundant
}));

// 리크루팅 모집 준비하기 단계 (2) Top Section
export const useStepTwoStore = create<Store>()((set) => ({
  currentStep: 0, // 초기 단계
  steps: [
    { id: 0, completed: false, name: "합격 인원 설정하기", admins: [] },
    { id: 1, completed: false, name: "인재상 구축하기", admins: [] },
    { id: 2, completed: false, name: "공고 작성하기", admins: [] },
    { id: 3, completed: false, name: "운영진 면접 일정 조정하기", admins: [] },
    {
      id: 4,
      completed: false,
      name: "지원서 폼 제작 및 공고 올리기",
      admins: []
    }
  ],

  setCurrentStep: (step: number) => set({ currentStep: step }), // 현재 단계 설정

  // 단계 완료 상태 변경 메서드
  setStepCompleted: (stepId: number, completed: boolean) =>
    set((state) => ({
      steps: state.steps.map((step) =>
        step.id === stepId ? { ...step, completed } : step
      )
    }))
}));

// 리크루팅 모집 준비하기 단계 (2) Top Section
export const useStepThreeStore = create<Store>()((set) => ({
  currentStep: 0, // 초기 단계
  steps: [
    { id: 0, completed: false, name: "서류 평가 준비하기", admins: [] },
    { id: 1, completed: false, name: "서류 평가하기", admins: [] }
  ],

  setCurrentStep: (step: number) => set({ currentStep: step }), // 현재 단계 설정

  // 단계 완료 상태 변경 메서드
  setStepCompleted: (stepId: number, completed: boolean) =>
    set((state) => ({
      steps: state.steps.map((step) =>
        step.id === stepId ? { ...step, completed } : step
      )
    }))
}));

// 4단계
export const useStepFourStore = create<Store>()((set) => ({
  currentStep: 0, // 초기 단계
  steps: [
    { id: 0, completed: false, name: "지원자 합불 결과" },
    { id: 1, completed: false, name: "면접 일정 조절하기" },
    { id: 2, completed: false, name: "합불 안내 메시지 작성하기" }
  ],

  setCurrentStep: (step: number) => set({ currentStep: step }), // 현재 단계 설정

  // 단계 완료 상태 변경 메서드
  setStepCompleted: (stepId: number, completed: boolean) =>
    set((state) => ({
      steps: state.steps.map((step) =>
        step.id === stepId ? { ...step, completed } : step
      )
    }))
}));

//5단계
export const useStepFiveStore = create<Store>()((set) => ({
  currentStep: 0, // 초기 단계
  steps: [
    { id: 0, completed: false, name: "면접 평가 준비하기" },
    { id: 1, completed: false, name: "면접 평가하기" }
  ],

  setCurrentStep: (step: number) => set({ currentStep: step }), // 현재 단계 설정

  // 단계 완료 상태 변경 메서드
  setStepCompleted: (stepId: number, completed: boolean) =>
    set((state) => ({
      steps: state.steps.map((step) =>
        step.id === stepId ? { ...step, completed } : step
      )
    }))
}));

//6단계
export const useStepSixStore = create<Store>()((set) => ({
  currentStep: 0, // 초기 단계
  steps: [
    { id: 0, completed: false, name: "지원자 합불 결과" },
    { id: 1, completed: false, name: "합불 안내 메시지 작성하기" }
  ],

  setCurrentStep: (step: number) => set({ currentStep: step }), // 현재 단계 설정

  // 단계 완료 상태 변경 메서드
  setStepCompleted: (stepId: number, completed: boolean) =>
    set((state) => ({
      steps: state.steps.map((step) =>
        step.id === stepId ? { ...step, completed } : step
      )
    }))
}));

// 그룹 설정
export const useGroupStore = create<GroupStore>()((set) => ({
  group: [], // 초기 그룹 상태

  // 전체 그룹을 설정하는 함수
  setGroup: (
    group: {
      index: number;
      name: string;
      documentPass: number;
      finalPass: number;
      ideals: string[]; // 인재상 추가
    }[]
  ) => set({ group }),

  // 새로운 그룹을 추가하는 함수
  addGroup: (newGroup: string) =>
    set((state) => ({
      group: [
        ...state.group,
        {
          index: state.group.length, // 자동 증가 인덱스
          name: newGroup,
          documentPass: 0,
          finalPass: 0,
          ideals: [] // 새로운 그룹에 인재상 추가
        }
      ]
    })),

  // 특정 그룹을 삭제하는 함수
  removeGroup: (groupToRemove: string) =>
    set((state) => ({
      group: state.group.filter((group) => group.name !== groupToRemove)
    }))
}));

// 면접 형식 설정
export const useInterviewStore = create<InterviewFormatStore>()((set) => ({
  interviewer: 0,
  interviewee: 0,
  interviewDuration: 60, // 기본값을 60으로 설정
  interviewStartTime: new Date(),
  interviewEndTime: new Date(),
  interviewStartDate: "",
  interviewEndDate: "",
  isTimeSet: false,

  setInterviewer: (id: number) => set({ interviewer: id }),
  setInterviewee: (id: number) => set({ interviewee: id }),
  setInterviewDuration: (time: number) => set({ interviewDuration: time }),
  setInterviewStartTime: (time: Date) => set({ interviewStartTime: time }),
  setInterviewEndTime: (time: Date) => set({ interviewEndTime: time }),
  setInterviewStartDate: (date: string) => set({ interviewStartDate: date }),
  setInterviewEndDate: (date: string) => set({ interviewEndDate: date }),

  applyTimeSettings: () =>
    set((state) => ({
      isTimeSet: !!state.interviewStartTime && !!state.interviewEndTime
    }))
}));

//리크루팅 시작 여부 Store
export const useRecruitmentStartStore = create<RecruitmentStartStore>(
  (set) => ({
    isRecruitingStarted: false, // 초기값: 리크루팅 시작 안 됨
    startRecruiting: () => set({ isRecruitingStarted: true }) // 시작 상태로 변경
  })
);

// 동아리 정보 Store -> 사이드메뉴 연결용
export const useClubInfoStore = create<ClubInfoStore>((set) => ({
  clubProfile: "", // 동아리 프로필
  clubName: "",
  generation: 0,
  currentStage: "",
  setClubProfile: (profile) => set({ clubProfile: profile }),
  setClubName: (name) => set({ clubName: name }),
  setGeneration: (gen) => set({ generation: gen }),
  setCurrentStage: (stage) => set({ currentStage: stage })
}));
