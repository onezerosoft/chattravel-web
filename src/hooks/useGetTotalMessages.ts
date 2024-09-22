import { useQuery } from "@tanstack/react-query";
import { getTotalMessages } from "../apis/get";
import { useChatStore } from "../stores";

interface TotalMessagesResponse {
  isSuccess: boolean;
  code: "CHAT201_1";
  message: string;
  result: {
    chatId: "10";
    chatname: "겨울 경주여행";
    totalMessageCount: 32;
    createdAt: "YYYY-MM-DD hh:mm:ss.000000";
    messages: [
      {
        messageId: 0;
        type: "C-TEXT";
        content: {
          message: "";
          courses: [];
        };
        createdAt: "YYYY-MM-DD hh:mm:ss.000000";
      },
    ];
  };
}

const useGetTotalMessages = () => {
  const chatId = useChatStore((state) => state.id);

  const { data, status } = useQuery({
    queryKey: ["totalMessages", chatId],
    enabled: chatId !== null,
    queryFn: async () => {
      const res = await getTotalMessages({ params: { chatId } });
      return res;
    },
  });

  return { data, status };
};

export default useGetTotalMessages;
