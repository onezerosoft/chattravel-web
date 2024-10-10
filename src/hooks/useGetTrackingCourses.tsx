import { useQueries } from "@tanstack/react-query";
import { getTrackingCourses } from "../apis/get";
import { TourApiResponse } from "../types/api";
import { TrackingCourses } from "../types/domain";
import { useTravelStore } from "../stores/useTravelStore";
import { DISTRICT_COURSES_MAP } from "../constants";

const useGetTrackingCourses = () => {
  const districts = useTravelStore((state) => state.districts);
  const courseNames = DISTRICT_COURSES_MAP[districts[0]] || [];

  const allQueries = useQueries({
    queries: courseNames.map((courseName) => ({
      queryKey: ["trackingCourses", districts, courseName],
      queryFn: async (): Promise<TourApiResponse<TrackingCourses>> => {
        const res = await getTrackingCourses({
          params: { crsKorNm: courseName },
        });
        return res;
      },
      enabled: !!districts[0] && courseName !== undefined,
      select: (data: TourApiResponse<TrackingCourses>) =>
        data.response.body.items.item[0],
    })),
  });

  const trackingCourses = allQueries.reduce((acc: any, query) => {
    if (query.data) acc.push(query.data);
    return acc;
  }, []);

  const isSuccess = allQueries.every((query) => query.isSuccess);
  return { trackingCourses, isSuccess };
};

export default useGetTrackingCourses;
