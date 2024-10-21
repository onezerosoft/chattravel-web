import { useMutation } from "@tanstack/react-query";
import { postFeedback } from "../apis/post";

const usePostFeedback = () => {
  const { mutate } = useMutation({
    mutationFn: postFeedback,
  });

  return { mutate };
};

export default usePostFeedback;
