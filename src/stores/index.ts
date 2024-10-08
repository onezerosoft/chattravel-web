import { create } from "zustand";
import { Region } from "../types/domain";

export interface TravelStore {
  region: Region | null;
  setRegion: (region: Region) => void;
  preferences: number[];
  updatePreferences: (newPreferences: number[]) => void;
  duration: number;
  setDuration: (duration: number) => void;
  districts: string[];
  setDistricts: (districts: string[]) => void;
  likeTracking: LikeTrackingType;
  setLikeTracking: (likeTracking: LikeTrackingType) => void;
}

type LikeTrackingType = "Y" | "N";

export const useTravelStore = create<TravelStore>((set) => ({
  region: JSON.parse(localStorage.getItem("region") || "null"),
  preferences: JSON.parse(
    localStorage.getItem("preferences") || "[0, 0, 0, 0]"
  ),
  duration: JSON.parse(localStorage.getItem("duration") || "0"),
  districts: JSON.parse(localStorage.getItem("districts") || "[]"),
  likeTracking:
    (localStorage.getItem("likeTraking") as LikeTrackingType) || "Y",
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
  setLikeTracking: (likeTracking: "Y" | "N") => {
    set({ likeTracking });
    localStorage.setItem("likeTracking", JSON.stringify(likeTracking));
  },
}));

export interface ChatStore {
  id: number;
  step: number;
  messageTimeStamp: number;
  trigger: () => void;
  next: () => void;
  reset: () => void;
  createChat: (chatId: number) => void;
}

export const useChatStore = create<ChatStore>((set) => ({
  id: JSON.parse(localStorage.getItem("chatId") || "0"),
  step: JSON.parse(localStorage.getItem("step") || "1"),
  messageTimeStamp: JSON.parse(
    localStorage.getItem("timestamp") || Date.now().toString()
  ),
  trigger: () => {
    set({ messageTimeStamp: Date.now() });
    localStorage.setItem("timestamp", JSON.stringify(Date.now()));
  },
  next: () => {
    set((state) => {
      const newStep = state.step + 1;
      localStorage.setItem("step", JSON.stringify(newStep));
      return { step: newStep };
    });
  },
  reset: () => {
    set({ step: 1, id: 0 });
    localStorage.setItem("step", JSON.stringify(1));
    localStorage.setItem("chatId", JSON.stringify(0));
    localStorage.removeItem("region");
    localStorage.removeItem("duration");
    localStorage.removeItem("districts");
  },
  createChat: (chatId: number) => {
    set({ id: chatId });
  },
}));
