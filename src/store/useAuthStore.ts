import { create } from "zustand";

export const useAuthStore = create<AuthState>((set) => ({
  isLogin: JSON.parse(localStorage.getItem("isLogin") || "false"), // 로컬스토리지에서 초기값 가져오기
  setLogin: (state) => {
    localStorage.setItem("isLogin", JSON.stringify(state)); // 상태 변경 시 로컬스토리지에 저장
    set({ isLogin: state });
  }
}));
