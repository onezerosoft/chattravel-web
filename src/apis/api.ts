import axios from "axios";

const BASE_URL = "https://api.chattravel.com/";
const TOUR_URL = `http://apis.data.go.kr/B551011/PhotoGalleryService1/galleryList1?serviceKey=${import.meta.env.TOUR_SERVICE_KEY}&numOfRows=10&pageNo=1&MobileOS=ETC&MobileApp=Chattravel&_type=json`;

export const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export const tourApi = axios.create({
  baseURL: TOUR_URL,
  withCredentials: true,
});
