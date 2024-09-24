import { useMutation } from "@tanstack/react-query";
import { postTravelInfo } from "../apis/post";
import { useChatStore } from "../stores";

const usePostTravelInfo = () => {
  const createChat = useChatStore((state) => state.createChat);

  const { mutate } = useMutation({
    mutationFn: postTravelInfo,
    onSuccess: (data) => {
      createChat(data.data.result.chatId);
      localStorage.setItem("chatId", data.data.result.chatId);
    },
  });

  return { mutate };
};

export default usePostTravelInfo;
