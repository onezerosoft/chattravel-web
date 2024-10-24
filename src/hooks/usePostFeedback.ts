import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postFeedback } from "../apis/post";

const usePostFeedback = () => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: postFeedback,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["currentScore"] });
    },
  });

  return { mutate };
};

export default usePostFeedback;
