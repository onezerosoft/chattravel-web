import { delay, http, HttpResponse } from "msw";
import { BASE_URL } from "../apis/api";
import { mockTotalMessage } from "./data";

export const handlers = [
  http.get(`${BASE_URL}/chat/:chatId`, async ({ params }) => {
    console.log("params", params.chatId);
    await delay(5000);
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
];
