import { useMutation } from "@tanstack/react-query";
import { postUserMessage } from "../apis/post";

const usePostUserMessage = () => {
  const { mutate } = useMutation({
    mutationFn: postUserMessage,
  });

  return { mutate };
};

export default usePostUserMessage;
