import axios from "axios";

export const BASE_URL = "http://chattravel.pro";

export const TOUR_URL = `http://apis.data.go.kr/B551011/PhotoGalleryService1`;

export const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export const tourApi = axios.create({
  baseURL: TOUR_URL,
  withCredentials: true,
  params: {
    serviceKey: import.meta.env.VITE_TOUR_SERVICE_KEY,
    numOfRows: 100,
    pageNo: 1,
    _type: "json",
    MobileOS: "IOS",
    MobileApp: "chattravel",
  },
});
