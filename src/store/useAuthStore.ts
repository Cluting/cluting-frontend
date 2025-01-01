import { create } from "zustand";
import { checkTokenValidity } from "../utils/tokenUtils";

export const useAuthStore = create<AuthState>((set) => ({
  isLogin: checkTokenValidity(), // 초기 상태 설정
  setLogin: (state) => {
    if (!state) {
      localStorage.removeItem("accessToken"); // 로그아웃 시 토큰 삭제
    }
    localStorage.setItem("isLogin", JSON.stringify(state));
    set({ isLogin: state });
  }
}));
