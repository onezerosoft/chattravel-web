import { useQuery } from "@tanstack/react-query";
import { getTotalMessages } from "../apis/get";
import { TotalMessagesResponse } from "../types/domain";
import { useChatStore } from "../stores/useChatStore";
import { useAlertStore } from "../stores/useAlertStore";

const useGetTotalMessages = () => {
  const chatId = useChatStore((state) => state.id);

  const makeAlert = useAlertStore((state) => state.makeAlert);

  const { data, status } = useQuery({
    queryKey: ["totalMessages", chatId],
    enabled: chatId !== 0,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    gcTime: 1000 * 60 * 60 * 24,
    queryFn: async (): Promise<TotalMessagesResponse> => {
      const res = await getTotalMessages({ params: { chatId } });

      if (
        !(
          localStorage.getItem("activeMessageId") === "done" &&
          res.result.messages.at(-1)!.messageType === "C_COURSE"
        )
      )
        localStorage.setItem(
          "activeMessageId",
          res.result.messages.at(-1)!.messageId.toString()
        );

      // FIXME: 논의 후 고도화
      // if (!res.isSuccess) {
      //   makeAlert(
      //     "ERROR",
      //     "현재 서비스가 불안정하여 \n채팅정보 불러오기에 실패했어요 🥲",
      //     "새로고침",
      //     "홈으로"
      //   );
      // }

      return res;
    },
    select: (data) => data.result.messages,
  });

  return { data, status };
};

export default useGetTotalMessages;
