import { create } from "zustand";

type Store = {
  currentStep: number; // 현재 단계의 인덱스
  setCurrentStep: (step: number) => void; // 단계 변경 함수
};

// 리크쿠팅 전체 단계
export const useStore = create<Store>()((set) => ({
  currentStep: 0, // 초기 단계
  setCurrentStep: (step: number) => set({ currentStep: step }) // 단계 변경
}));

// 2- 리크루팅 모집 준비하기 단계 Top Section
export const useTopSectionStore = create<Store>()((set) => ({
  currentStep: 0, // 초기 단계
  setCurrentStep: (step: number) => set({ currentStep: step }) // 단계 변경
}));
