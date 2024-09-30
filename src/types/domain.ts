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
  type: "숙소" | "식당" | "카페" | "여행지";
  placeName: string;
  comment: string;
  address: string;
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

export interface Document {
  doc_url: string;
  image_url: string;
  thumbnail_url: string;
}
