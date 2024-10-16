import { REGION_MAP } from "../constants";
import { ApiStatusCode } from "./api";

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

export interface TrackingCourse {
  crsLevel: string;
  crsCycle: string;
  crsContents: string;
  createdtime: string;
  travelerinfo: string;
  crsTourInfo: string;
  crsSummary: string;
  routeIdx: string;
  crsIdx: string;
  crsKorNm: string;
  crsDstnc: string;
  crsTotlRqrmHour: string;
  modifiedtime: string;
  sigun: string;
  brdDiv: string;
  gpxpath: string;
}

export interface TrackingCourses {
  items: {
    item: TrackingCourse[];
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
  places: Place[];
}

export interface Place {
  placeId: number;
  placeType: "숙소" | "식당" | "카페" | "여행지";
  placeName: string;
  comment: string;
  address: string;
  ratings?: string;
  url: string;
}

export interface Message {
  messageId: number;
  messageType: "C_TEXT" | "C_COURSE" | "U_TEXT";
  content: {
    message: string;
    courses: Course[];
  };
  createdAt: string;
}

export interface Document {
  doc_url: string;
  image_url: string;
  thumbnail_url: string;
  display_sitename?: string;
}

export interface TotalMessagesResponse {
  isSuccess: boolean;
  code: ApiStatusCode;
  message: string;
  result: {
    chatId: number;
    chatname: string;
    totalMessageCount: number;
    createdAt: string;
    messages: Message[];
  };
}

export type LikeTrackingType = "Y" | "N";
