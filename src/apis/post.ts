import { ApiRequestBody } from "../types/api";
import { api } from "./api";

export interface TravelInfoBody {
  region: {
    SIDO: string;
    SI: string[];
  };
  days: number;
  styleList: number[];
}

export const postTravelInfo = async ({
  body,
}: ApiRequestBody<TravelInfoBody>) => {
  return await api.post("/chat/create", body);
};
