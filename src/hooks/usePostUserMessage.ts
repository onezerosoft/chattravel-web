import { useMutation } from "@tanstack/react-query";
import { postUserMessage } from "../apis/post";

const usePostUserMessage = () => {
  const { mutateAsync, status } = useMutation({
    mutationFn: postUserMessage,
  });

  return { mutateAsync, status };
};

export default usePostUserMessage;
