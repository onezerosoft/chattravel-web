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
