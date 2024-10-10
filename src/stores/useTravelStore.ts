import { create } from "zustand";
import type { LikeTrackingType, Region } from "../types/domain";

interface TravelStore {
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

export const useTravelStore = create<TravelStore>((set) => ({
  region: JSON.parse(localStorage.getItem("region") || "null"),
  preferences: JSON.parse(
    localStorage.getItem("preferences") || "[0, 0, 0, 0]"
  ),
  duration: JSON.parse(localStorage.getItem("duration") || "0"),
  districts: JSON.parse(localStorage.getItem("districts") || "[]"),
  likeTracking:
    (localStorage.getItem("likeTracking") as LikeTrackingType) || "Y",
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
