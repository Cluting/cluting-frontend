import { create } from "zustand";

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
