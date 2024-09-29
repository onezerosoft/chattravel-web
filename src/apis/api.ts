import axios from "axios";

export const BASE_URL = import.meta.env.VITE_CHATTRAVEL_API_URL;

export const TOUR_URL = import.meta.env.VITE_TOUR_API_URL;

export const KAKAO_SEARCH_URL = import.meta.env.VITE_KAKAO_SEARCH_API_URL;

export const api = axios.create({
  baseURL: BASE_URL,
});

export const tourApi = axios.create({
  baseURL: TOUR_URL,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
  params: {
    serviceKey: import.meta.env.VITE_TOUR_SERVICE_KEY,
    numOfRows: 10,
    pageNo: 1,
    _type: "json",
    MobileOS: "IOS",
    MobileApp: "chattravel",
  },
});

export const kakaoSearchApi = axios.create({
  baseURL: KAKAO_SEARCH_URL,
  headers: {
    Authorization: `KakaoAK ${import.meta.env.VITE_KAKAO_AK}`,
    "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
  },
});
