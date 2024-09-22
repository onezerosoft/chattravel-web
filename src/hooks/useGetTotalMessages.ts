import { useQuery } from "@tanstack/react-query";
import { getTotalMessages } from "../apis/get";
import { useChatStore } from "../stores";
import { ApiStatusCode } from "../types/api";
import { Course } from "../types/domain";

interface TotalMessagesResponse {
  isSuccess: boolean;
  code: ApiStatusCode;
  message: string;
  result: {
    chatId: number;
    chatname: string;
    totalMessageCount: number;
    createdAt: string;
    messages: [
      {
        messageId: number;
        type: "C-TEXT" | "C-COURSE" | "U-TEXT";
        content: {
          message: string;
          courses: Course[];
        };
        createdAt: string;
      },
    ];
  };
}

const useGetTotalMessages = () => {
  const chatId = useChatStore((state) => state.id);

  const { data, status } = useQuery({
    queryKey: ["totalMessages", chatId],
    enabled: chatId !== null,
    queryFn: async (): Promise<TotalMessagesResponse> => {
      const res = await getTotalMessages({ params: { chatId: chatId! } });
      return res;
    },
    select: (data) => data.result.messages,
  });

  return { data, status };
};

export default useGetTotalMessages;
