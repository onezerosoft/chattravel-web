import { ApiRequestBody, ApiRequestParams } from "../types/api";
import { api } from "./api";

export interface TravelInfoBody {
  region: {
    SIDO: string;
    SI: string[];
  };
  days: number;
  styleList: number[];
}

export interface UserMessageBody {
  userMessage: string;
}

export interface UserMessageParams {
  chatId: number;
}

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
