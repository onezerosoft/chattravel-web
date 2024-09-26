import {
  ApiRequestBody,
  ApiRequestParams,
  SaveTravelBody,
  TravelInfoBody,
  UserMessageBody,
  UserMessageParams,
} from "../types/api";
import { api } from "./api";

export const postTravelInfo = async ({
  body,
}: ApiRequestBody<TravelInfoBody>) => {
  return await api.post("/chat/create", body);
};

export const postUserMessage = async ({
  body,
  params,
}: ApiRequestBody<UserMessageBody> & ApiRequestParams<UserMessageParams>) => {
  return await api.post(`/chat/${params.chatId}/send`, body);
};

export const postSaveTravel = async ({
  body,
  params,
}: ApiRequestBody<SaveTravelBody> & ApiRequestParams<UserMessageParams>) => {
  return await api.post(`/chat/${params.chatId}/save-travel`, body);
};
