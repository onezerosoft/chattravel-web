import { useMutation } from "@tanstack/react-query";
import { postUserMessage } from "../apis/post";
import { useChatStore } from "../stores";

const usePostUserMessage = () => {
  const next = useChatStore((state) => state.next);

  const { mutate } = useMutation({
    mutationFn: postUserMessage,
    onSuccess: () => next(),
  });

  return { mutate };
};

export default usePostUserMessage;
