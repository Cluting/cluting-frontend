import { create } from "zustand";

// 그룹 설정
export const useGroupStore = create<GroupStore>()((set) => ({
  group: [],

  setGroup: (
    group: {
      id: number;
      name: string;
      documentPass: number;
      finalPass: number;
      ideals: string[]; // 인재상 추가
    }[]
  ) => set({ group }),

  addGroup: (newGroup: string) =>
    set((state) => ({
      group: [
        ...state.group,
        {
          id: state.group.length,
          name: newGroup,
          documentPass: 0,
          finalPass: 0,
          ideals: []
        }
      ]
    })),

  removeGroup: (groupToRemove: string) =>
    set((state) => ({
      group: state.group.filter((group) => group.name !== groupToRemove)
    }))
}));
