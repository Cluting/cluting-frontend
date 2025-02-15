import { create } from "zustand";

export interface QuestionCounts {
  total: number; // 전체 질문
  common: number; // 공통 질문
  group?: number; // 그룹별 질문(선택 사항)
  individual: number; // 개별 질문
}

interface QuestionStore {
  questionCounts: QuestionCounts;
  setQuestionCounts: (key: keyof QuestionCounts, value: number) => void;
  validateCounts: () => boolean;
  checkedCount: number;
  setCheckedCount: (count: number) => void;
}

export const useQuestionStore = create<QuestionStore>((set, get) => ({
  questionCounts: {
    total: 0,
    common: 0,
    group: 0,
    individual: 0
  },
  setQuestionCounts: (key, value) =>
    set((state) => ({
      questionCounts: { ...state.questionCounts, [key]: value }
    })),
  validateCounts: () => {
    const { total, common, group, individual } = get().questionCounts;
    const groupCount = group || 0; // 그룹 질문이 없으면 0으로 처리
    return total === common + groupCount + individual;
  },
  checkedCount: 0,
  setCheckedCount: (count) => set({ checkedCount: count })
}));
