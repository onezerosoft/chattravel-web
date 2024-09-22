import { REGION_MAP } from "../constants";

export type Region = keyof typeof REGION_MAP;

export type ChatWho = "chet" | "user";

export interface Chat {
  who: ChatWho;
  kinds?: ChatKind[];
}

export interface ChatKind {
  case: number;
  text?: string;
}

export interface Course {
  courseId: number;
  courseName: string;
  day: number;
  places: Place[];
}

export interface Place {
  placeId: number;
  type: "숙소" | "식당" | "카페" | "여행지";
  placeName: string;
  comment: string;
}
