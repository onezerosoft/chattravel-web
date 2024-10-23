import { REGION_MAP } from "../constants";
import {
  ApiRequestParams,
  PlaceThumbnailParams,
  TotalMessagesParams,
  TrackingCoursesParams,
  TravelCourseParams,
} from "../types/api";
import { api, kakaoSearchApi, tourApi } from "./api";

export const getGalleryItems = async () => {
  const res = await tourApi.get("/B551011/PhotoGalleryService1/galleryList1");

  if (!res) throw new Error("Failed to fetch tour photos");
  return res.data;
};

export const getRegionThumbnail = async () => {
  const region = localStorage.getItem("region");

  if (!region) throw new Error("region is null");

  const res = await tourApi.get(
    `/B551011/PhotoGalleryService1/gallerySearchList1?keyword=${REGION_MAP[JSON.parse(region)]}`
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

export const getPlaceThumbnail = async ({
  params,
}: ApiRequestParams<PlaceThumbnailParams>) => {
  const res = await kakaoSearchApi.get(
    `/v2/search/image?query=${encodeURIComponent(params.query)}`
  );

  if (!res) throw new Error("Failed to fetch total messages");
  return res.data;
};

export const getTrackingCourses = async ({
  params,
}: ApiRequestParams<TrackingCoursesParams>) => {
  const res = await tourApi.get(
    `/B551011/Durunubi/courseList?crsKorNm=${params.crsKorNm}`
  );

  if (!res) throw new Error("Failed to fetch tour photos");
  return res.data;
};

export const getCurrentScore = async () => {
  const res = await api.get(`/feedback/currentScore`);

  if (!res) throw new Error("Failed to fetch total messages");
  return res.data;
};
