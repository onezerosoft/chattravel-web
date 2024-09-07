import { create } from "zustand";

export const useStore = create((set) => ({
  bears: 0,
  preferences: [],
  updatePreferences: (newPreferences: number[]) => {
    set({ preferences: newPreferences });
    localStorage.setItem("preferences", JSON.stringify(newPreferences)); // localStorage에 저장
  },
  // increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  // removeAllBears: () => set({ bears: 0 }),
  // updateBears: (newBears) => set({ bears: newBears }),
}));
