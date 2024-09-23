import { delay, http, HttpResponse } from "msw";
import { BASE_URL } from "../apis/api";
import { mockTotalMessage, mockTotalMessage2 } from "./data";

export const handlers = [
  http.get(`${BASE_URL}/chat/:chatId`, async () => {
    // await delay(2000);
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
];
