export interface TourApiResponse<T> {
  response: {
    body: T;
  };
}

export interface ApiRequestBody<T> {
  body: T;
}

export interface ApiRequestParams<T> {
  params: T;
}

export type ApiStatusCode = "CHAT201_1";

export interface TravelInfoBody {
  region: {
    sido: string;
    si: string[];
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

export interface SaveTravelBody {
  request: "Y";
  messageId: number;
}

export interface SaveTravelParams {
  chatId: number;
}

export interface TotalMessagesParams {
  chatId: number;
}

export interface TravelCourseParams {
  travelId: number;
}

export interface FeedbackBody {
  reaction: "P" | "N" | "C";
}

export interface FeedbackParams {
  messageId: number;
}

export interface TrackingCoursesParams {
  crsKorNm: string;
}

export interface PlaceThumbnailParams {
  query: string;
  sort?: string;
  page?: number;
  size?: number;
}
