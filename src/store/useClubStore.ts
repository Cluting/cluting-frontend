import { create } from "zustand";

export const useClubStore = create<ClubStore>((set) => ({
  clubId: null,
  clubName: "",

  setClubInfo: (id, name) => set({ clubId: id, clubName: name })
}));
