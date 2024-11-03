import { create } from "zustand";

type Store = {
  currentStep: number; // 현재 단계의 인덱스
  setCurrentStep: (step: number) => void; // 단계 변경 함수
};

export const useStore = create<Store>()((set) => ({
  currentStep: 0, // 초기 단계
  setCurrentStep: (step: number) => set({ currentStep: step }) // 단계 변경
}));

export const useTopSectionStore = create<Store>()((set) => ({
  currentStep: 0, // 초기 단계
  setCurrentStep: (step: number) => set({ currentStep: step }) // 단계 변경
}));
