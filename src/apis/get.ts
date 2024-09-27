import { REGION_MAP } from "../constants";
import {
  ApiRequestParams,
  TotalMessagesParams,
  TravelCourseParams,
} from "../types/api";
import { api, tourApi } from "./api";

export const getTourPhotos = async () => {
  const res = await tourApi.get("/galleryList1");

  if (!res) throw new Error("Failed to fetch tour photos");
  return res.data;
};

export const getRegionThumbnail = async () => {
  const region = localStorage.getItem("region");

  if (!region) throw new Error("region is null");

  const res = await tourApi.get(
    `/gallerySearchList1?keyword=${REGION_MAP[JSON.parse(region)]}`
  );

  if (!res) throw new Error("Failed to fetch tour photos");
  return res.data;
};

export const getTotalMessages = async ({
  params,
}: ApiRequestParams<TotalMessagesParams>) => {
  const res = await api.get(`/chat/${params.chatId}`);

  if (!res) throw new Error("Failed to fetch total messages");
  return res.data;
};

export const getTravelCourse = async ({
  params,
}: ApiRequestParams<TravelCourseParams>) => {
  const res = await api.get(`/travel/${params.travelId}`);

  if (!res) throw new Error("Failed to fetch total messages");
  return res.data;
};
