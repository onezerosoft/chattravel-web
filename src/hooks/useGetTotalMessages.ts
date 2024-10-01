import { useQuery } from "@tanstack/react-query";
import { getTotalMessages } from "../apis/get";
import { useChatStore } from "../stores";
import { TotalMessagesResponse } from "../types/domain";

const useGetTotalMessages = () => {
  const chatId = useChatStore((state) => state.id);
  const messageTimeStamp = useChatStore((state) => state.messageTimeStamp);

  const { data, status } = useQuery({
    queryKey: ["totalMessages", chatId, messageTimeStamp],
    enabled: chatId !== 0,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    gcTime: 1000 * 60 * 60 * 24,
    queryFn: async (): Promise<TotalMessagesResponse> => {
      const res = await getTotalMessages({ params: { chatId } });
      localStorage.setItem(
        "lastMessageId",
        res.result.messages.at(-1)!.messageId.toString()
      );
      return res;
    },
    select: (data) => data.result.messages,
  });

  return { data, status };
};

export default useGetTotalMessages;
