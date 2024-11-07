import { create } from "zustand";

// 리크쿠팅 전체 단계
export const useRecruitmentStepStore = create<RecruitmentStore>()((set) => ({
  currentRecruitmentStep: 0, // 초기 단계
  setCurrentRecruitmentStep: (step: number) =>
    set({ currentRecruitmentStep: step }) // 단계 변경
}));

// 2- 리크루팅 모집 준비하기 단계 Top Section
export const useTopSectionStore = create<Store>()((set) => ({
  currentStep: 0, // 초기 단계
  setCurrentStep: (step: number) => set({ currentStep: step }) // 단계 변경
}));

// 그룹 설정
export const useGroupStore = create<GroupStore>()((set) => ({
  group: [], // 초기 단계

  // 전체 그룹을 설정하는 함수
  setGroup: (group: string[]) => set({ group }),

  // 새로운 그룹을 추가하는 함수
  addGroup: (newGroup: string) =>
    set((state) => ({ group: [...state.group, newGroup] })),

  // 특정 그룹을 삭제하는 함수
  removeGroup: (groupToRemove: string) =>
    set((state) => ({
      group: state.group.filter((group) => group !== groupToRemove)
    }))
}));
