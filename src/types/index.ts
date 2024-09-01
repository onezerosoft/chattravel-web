import { REGION_MAP } from "../constants";

export interface TourApiResponse<T> {
  response: {
    body: T;
  };
}

export type Region = keyof typeof REGION_MAP;

export type ChatWho = "chet" | "user";

export interface Chat {
  who: ChatWho;
  kinds: ChatKind[];
}

export interface ChatKind {
  case: number;
  text?: string;
}
