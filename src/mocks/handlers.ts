import { http, HttpResponse } from "msw";
import { BASE_URL } from "../apis/api";
import { mockTotalMessage, mockTotalMessage2, mockTravelCourse } from "./data";

export const handlers = [
  http.get(`${BASE_URL}/chat/:chatId`, async () => {
    if (localStorage.getItem("timestamp"))
      return HttpResponse.json(mockTotalMessage2);
    return HttpResponse.json(mockTotalMessage);
  }),

  http.post(`${BASE_URL}/chat/create`, () => {
    return HttpResponse.json({
      isSuccess: true,
      code: "COMMON201_1",
      message: "저장 성공",
      result: {
        chatId: 1,
      },
    });
  }),

  http.post(`${BASE_URL}/chat/:chatId/send`, () => {
    return HttpResponse.json({
      isSuccess: true,
      code: "COMMON201_1",
      message: "응답 생성 성공",
      result: {
        chatId: 1,
      },
    });
  }),

  http.post(`${BASE_URL}/chat/:chatId/save-travel`, () => {
    return HttpResponse.json({
      isSuccess: true,
      code: "COMMON201_1",
      message: "생성 성공",
      result: {
        travelId: 0,
        travelTitle: "울릉도에서의 3박4일",
        createdAt: "2024-07-16",
      },
    });
  }),

  http.get(`${BASE_URL}/travel/:travelId`, async () => {
    // await delay(2000);
    return HttpResponse.json(mockTravelCourse);
  }),
];
