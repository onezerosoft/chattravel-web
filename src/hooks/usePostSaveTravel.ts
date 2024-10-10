import { useMutation } from "@tanstack/react-query";
import { postSaveTravel } from "../apis/post";

const usePostSaveTravel = () => {
  const { mutateAsync } = useMutation({
    mutationFn: postSaveTravel,
  });

  return { mutateAsync };
};

export default usePostSaveTravel;
