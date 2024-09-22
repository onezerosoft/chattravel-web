import { ApiRequestParams } from "../types/api";
import { api, tourApi } from "./api";

export const getTourPhotos = async () => {
  const res = await tourApi.get("/galleryList1");

  if (!res) throw new Error("Failed to fetch tour photos");
  return res.data;
};

interface TotalMessagesParams {
  chatId: number;
}

export const getTotalMessages = async ({
  params,
}: ApiRequestParams<TotalMessagesParams>) => {
  const res = await api.get(`/chat/${params.chatId}`);

  if (!res) throw new Error("Failed to fetch total messages");
  return res.data;
};
