import { useQuery } from "@tanstack/react-query";
import { getTravelCourse } from "../apis/get";
import { ApiStatusCode } from "../types/api";
import { Course } from "../types/domain";

interface TravelCourseResponse {
  isSuccess: boolean;
  code: ApiStatusCode;
  message: string;
  result: {
    travelTitle: string;
    days: number;
    courses: Course[];
  };
}

const useGetTravelCourse = (travelId: number) => {
  const { data, status } = useQuery({
    queryKey: ["TravelCourse", travelId],
    queryFn: async (): Promise<TravelCourseResponse> => {
      const res = await getTravelCourse({ params: { travelId } });
      return res;
    },
    select: (data) => data.result,
  });

  return { data, status };
};

export default useGetTravelCourse;
