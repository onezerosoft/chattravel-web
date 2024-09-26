import { useMutation } from "@tanstack/react-query";
import { postSaveTravel } from "../apis/post";

const usePostSaveTravel = () => {
  const { mutateAsync } = useMutation({
    mutationFn: postSaveTravel,
    onSuccess: (data) => {
      localStorage.setItem("travelId", data.data.result.travelId);
    },
  });

  return { mutateAsync };
};

export default usePostSaveTravel;
