import axios from "axios";

export const BASE_URL = import.meta.env.VITE_CHATTRAVEL_API_URL;

export const TOUR_URL = import.meta.env.VITE_TOUR_API_URL;

export const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export const tourApi = axios.create({
  baseURL: TOUR_URL,
  withCredentials: true,
  params: {
    serviceKey: import.meta.env.VITE_TOUR_SERVICE_KEY,
    numOfRows: 10,
    pageNo: 1,
    _type: "json",
    MobileOS: "IOS",
    MobileApp: "chattravel",
  },
});
