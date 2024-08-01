import { tourApi } from "../apis/api";

export const getTourPhotos = async () => {
  const res = await tourApi.get("/");
  if (!res) throw new Error("Failed to fetch tour-photos");
  return res.data.json();
};
