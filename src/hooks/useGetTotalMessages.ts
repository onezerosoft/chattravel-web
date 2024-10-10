import { useQuery } from "@tanstack/react-query";
import { getTotalMessages } from "../apis/get";
import { TotalMessagesResponse } from "../types/domain";
import { useChatStore } from "../stores/useChatStore";

const useGetTotalMessages = () => {
  const chatId = useChatStore((state) => state.id);

  const { data, status } = useQuery({
    queryKey: ["totalMessages", chatId],
    enabled: chatId !== 0,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    gcTime: 1000 * 60 * 60 * 24,
    queryFn: async (): Promise<TotalMessagesResponse> => {
      const res = await getTotalMessages({ params: { chatId } });

      if (localStorage.getItem("lastMessageId") !== "done")
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
