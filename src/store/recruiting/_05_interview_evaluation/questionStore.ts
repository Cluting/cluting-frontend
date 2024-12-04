import { create } from "zustand";

export interface QuestionCounts {
  total: number;
  common: number;
  group?: number; // 선택 사항
  individual: number;
}

interface QuestionStore {
  questionCounts: QuestionCounts;
  setQuestionCounts: (key: keyof QuestionCounts, value: number) => void;
  validateCounts: () => boolean;
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
  }
}));
