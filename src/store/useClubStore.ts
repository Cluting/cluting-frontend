import { create } from "zustand";

export const useClubStore = create<ClubStore>((set) => ({
  clubId: null,
  clubName: "",

  setClubId: (id: number) => set({ clubId: id }),
  setClubName: (name: string) => set({ clubName: name })
}));
