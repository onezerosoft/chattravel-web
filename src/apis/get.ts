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

export const getRegionPhotos = async () => {
  const res = await tourApi.get("/galleryList1");

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
