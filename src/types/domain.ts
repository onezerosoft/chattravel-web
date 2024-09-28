import { REGION_MAP } from "../constants";

export interface GalleryItem {
  galContentId: number;
  galTitle: string;
  galWebImageUrl: string;
}

export interface GalleryItems {
  items: {
    item: GalleryItem[];
  };
}

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
  day: number;
  // courseName: string;
  places: Place[];
}

export interface Place {
  placeId: number;
  type: "숙소" | "식당" | "카페" | "여행지";
  placeName: string;
  comment: string;
}

export interface Message {
  messageId: number;
  type: "C-TEXT" | "C-COURSE" | "U-TEXT";
  content: {
    message: string;
    courses: Course[];
  };
  createdAt: string;
}
