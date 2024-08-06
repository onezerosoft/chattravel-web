import axios from "axios";

const BASE_URL = "https://api.chattravel.com/";
const TOUR_URL = `http://apis.data.go.kr/B551011/PhotoGalleryService1`;

export const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export const tourApi = axios.create({
  baseURL: TOUR_URL,
  withCredentials: true,
  params: {
    serviceKey: import.meta.env.VITE_TOUR_SERVICE_KEY,
    numOfRows: 1,
    pageNo: 10,
    _type: "json",
    MobileOS: "IOS",
    MobileApp: "chattravel",
  },
});
