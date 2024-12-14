import { create } from "zustand";

export const useAuthStore = create<AuthState>((set) => ({
  isLogin: false,
  setLogin: (state) => set({ isLogin: state })
}));
