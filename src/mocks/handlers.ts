import { http, HttpResponse } from "msw";
import { BASE_URL } from "../apis/api";

export const handlers = [
  http.get(`${BASE_URL}/chat/:chatId`, ({ params }) => {
    console.log("params", params.chatId);

    return HttpResponse.json({
      isSuccess: true,
      code: "CHAT201_1",
      message: "조회 성공",
      result: {
        chatId: "10",
        chatname: "겨울 경주여행",
        totalMessageCount: 32,
        createdAt: "YYYY-MM-DD hh:mm:ss.000000",
        messages: [
          {
            messageId: 0,
            type: "C-TEXT",
            content: {
              message: "",
              courses: [],
            },
            createdAt: "YYYY-MM-DD hh:mm:ss.000000",
          },
        ],
      },
    });
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
