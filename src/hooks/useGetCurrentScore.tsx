import { useQuery } from "@tanstack/react-query";
import { getCurrentScore } from "../apis/get";

const useGetCurrentScore = () => {
  const { data, status } = useQuery({
    queryKey: ["currentScore"],
    queryFn: async () => {
      const res = await getCurrentScore();
      return res;
    },
    select: (data) => data.result.currentScore,
  });

  return { data, status };
};

export default useGetCurrentScore;
