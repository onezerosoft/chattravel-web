import { create } from "zustand";
import type { LikeTrackingType, Region } from "../types/domain";

interface TravelStore {
  region: Region | null;
  preferences: number[];
  duration: number;
  districts: string[];
  likeTracking: LikeTrackingType;
  setRegion: (region: Region) => void;
  setPreferences: (newPreferences: number[]) => void;
  setDuration: (duration: number) => void;
  setDistricts: (districts: string[]) => void;
  setLikeTracking: (likeTracking: LikeTrackingType) => void;
  reset: () => void;
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
  setPreferences: (newPreferences: number[]) => {
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
  reset: () => {
    set({ region: null, duration: 0, districts: [] });

    localStorage.removeItem("region");
    localStorage.removeItem("duration");
    localStorage.removeItem("districts");
  },
}));
