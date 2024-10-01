import { useMutation } from "@tanstack/react-query";
import { postUserMessage } from "../apis/post";

const usePostUserMessage = () => {
  const { mutateAsync } = useMutation({
    mutationFn: postUserMessage,
  });

  return { mutateAsync };
};

export default usePostUserMessage;
