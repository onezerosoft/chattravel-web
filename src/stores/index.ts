import { create } from "zustand";
import { Region } from "../types";

export interface TravelStore {
  region: Region | null;
  setRegion: (region: Region) => void;
  preferences: number[];
  updatePreferences: (newPreferences: number[]) => void;
  duration: number;
  setDuration: (duration: number) => void;
  districts: string[];
  setDistricts: (districts: string[]) => void;
}

export const useTravelStore = create<TravelStore>((set) => ({
  region: JSON.parse(localStorage.getItem("region") || "null"),
  preferences: JSON.parse(
    localStorage.getItem("preferences") || "[0, 0, 0, 0]"
  ),
  duration: JSON.parse(localStorage.getItem("duration") || "0"),
  districts: JSON.parse(localStorage.getItem("districts") || "[]"),
  setRegion: (region: Region) => {
    set({ region });
    localStorage.setItem("region", JSON.stringify(region));
  },
  updatePreferences: (newPreferences: number[]) => {
    set({ preferences: newPreferences });
    localStorage.setItem("preferences", JSON.stringify(newPreferences));
  },
  setDuration: (duration: number) => {
    set({ duration });
    localStorage.setItem("duration", JSON.stringify(duration));
  },
  setDistricts: (districts: string[]) => {
    set({ districts });
    localStorage.setItem("districts", JSON.stringify(districts));
  },
}));

export interface ChatStore {
  step: number;
  next: () => void;
  reset: () => void;
}

export const useChatStore = create<ChatStore>((set) => ({
  step: JSON.parse(localStorage.getItem("step") || "1"),
  next: () => {
    set((state) => {
      const newStep = state.step + 1;
      localStorage.setItem("step", JSON.stringify(newStep));
      return { step: newStep };
    });
  },
  reset: () => {
    set({ step: 1 });
    localStorage.setItem("step", JSON.stringify(1));
  },
}));
