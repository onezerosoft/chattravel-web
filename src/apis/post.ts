import {
  ApiRequestBody,
  ApiRequestParams,
  FeedbackBody,
  FeedbackParams,
  SaveTravelBody,
  SaveTravelParams,
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
}: ApiRequestBody<SaveTravelBody> & ApiRequestParams<SaveTravelParams>) => {
  return await api.post(`/chat/${params.chatId}/save-travel`, body);
};

export const postFeedback = async ({
  body,
  params,
}: ApiRequestBody<FeedbackBody> & ApiRequestParams<FeedbackParams>) => {
  return await api.post(`/feedback/${params.messageId}`, body);
};
