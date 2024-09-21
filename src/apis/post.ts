import { api } from "./api";

export interface ApiRequest<T> {
  params?: string;
  body: T;
}

export interface TravelInfoBody {
  region: {
    SIDO: string;
    SI: string[];
  };
  days: number;
  styleList: number[];
}

export const postTravelInfo = async ({ body }: ApiRequest<TravelInfoBody>) => {
  return await api.post("/chat/create", body);
};
