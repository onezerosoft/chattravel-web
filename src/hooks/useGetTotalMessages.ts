import { useQuery } from "@tanstack/react-query";
import { getTotalMessages } from "../apis/get";
import { useChatStore } from "../stores";
import { ApiStatusCode } from "../types/api";
import { Message } from "../types/domain";

interface TotalMessagesResponse {
  isSuccess: boolean;
  code: ApiStatusCode;
  message: string;
  result: {
    chatId: number;
    chatname: string;
    totalMessageCount: number;
    createdAt: string;
    messages: Message[];
  };
}

const useGetTotalMessages = () => {
  const chatId = useChatStore((state) => state.id);
  const messageTimeStamp = useChatStore((state) => state.messageTimeStamp);

  const { data, status } = useQuery({
    queryKey: ["totalMessages", chatId, messageTimeStamp],
    enabled: chatId !== 0,
    queryFn: async (): Promise<TotalMessagesResponse> => {
      const res = await getTotalMessages({ params: { chatId: chatId! } });
      localStorage.setItem(
        "lastMessageId",
        res.result.messages.at(-1)!.messageId.toString()
      );
      return res;
    },
    select: (data) => data.result.messages,
    retryOnMount: false,
  });

  return { data, status };
};

export default useGetTotalMessages;
