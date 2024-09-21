import { http, HttpResponse } from "msw";
import { BASE_URL } from "../apis/api";

export const handlers = [
  http.post(`${BASE_URL}chat/create`, ({ request }) => {
    console.log("^^");
    console.log(request);

    return HttpResponse.json({
      id: "c7b3d8e0-5e0b-4b0f-8b3a-3b9f4b3d3b3d",
      firstName: "John",
      lastName: "Maverick",
    });
  }),
];
