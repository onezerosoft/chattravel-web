import { REGION_MAP } from "../constants";

export interface TourApiResponse<T> {
  response: {
    body: T;
  };
}

export type region = keyof typeof REGION_MAP;
