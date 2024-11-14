import { create } from "zustand";

// 리크루팅 전체 단계
export const useRecruitmentStepStore = create<RecruitmentStore>()((set) => ({
  currentRecruitmentStep: 0, // 초기 단계
  completedSteps: [] as boolean[], // 각 단계 완료 여부 배열 (초기에는 모두 false로)

  setCurrentRecruitmentStep: (step: number) =>
    set({ currentRecruitmentStep: step }), // 단계 변경

  // 특정 단계를 완료 상태로 설정하는 메서드
  completeStep: (step: number) =>
    set((state) => {
      const updatedCompletedSteps = [...state.completedSteps];
      updatedCompletedSteps[step] = true;
      return { completedSteps: updatedCompletedSteps };
    }),

  // 특정 단계의 완료 여부를 취소하는 메서드
  resetStepCompletion: (step: number) =>
    set((state) => {
      const updatedCompletedSteps = [...state.completedSteps];
      updatedCompletedSteps[step] = false;
      return { completedSteps: updatedCompletedSteps };
    })
}));

// 2- 리크루팅 모집 준비하기 단계 Top Section
export const useTopSectionStore = create<Store>()((set) => ({
  currentStep: 0, // 초기 단계
  steps: [], // 빈 배열로 초기화
  setCurrentStep: (step: number) => set({ currentStep: step }), // 단계 변경
  setStepCompleted: (stepId: number, completed: boolean) =>
    set((state) => ({
      steps: state.steps.map((step) =>
        step.id === stepId ? { ...step, completed } : step
      )
    })) // 단계 완료 상태 변경 함수
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
  interviewStartTime: new Date(),
  interviewEndTime: new Date(),
  interviewStartDate: new Date(),
  interviewEndDate: new Date(),
  isTimeSet: false, // 새로운 boolean 상태 추가

  setInterviewer: (id: number) => set({ interviewer: id }),
  setInterviewee: (id: number) => set({ interviewee: id }),
  setInterviewStartTime: (time: Date) => set({ interviewStartTime: time }),
  setInterviewEndTime: (time: Date) => set({ interviewEndTime: time }),
  setInterviewStartDate: (date: Date) => set({ interviewStartDate: date }),
  setInterviewEndDate: (date: Date) => set({ interviewEndDate: date }),

  // 새로운 상태 업데이트 함수 추가
  applyTimeSettings: () =>
    set((state) => ({
      isTimeSet: !!state.interviewStartTime && !!state.interviewEndTime
    }))
}));
