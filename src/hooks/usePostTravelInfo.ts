import { useMutation } from "@tanstack/react-query";
import { postTravelInfo } from "../apis/post";
import { useTravelStore } from "../stores/useTravelStore";
import { REGION_MAP } from "../constants";
import { useChatStore } from "../stores/useChatStore";

const usePostTravelInfo = () => {
  const createChat = useChatStore((state) => state.createChat);

  const region = useTravelStore((state) => state.region);
  const districts = useTravelStore((state) => state.districts);
  const duration = useTravelStore((state) => state.duration);
  const preferences = useTravelStore((state) => state.preferences);

  const { mutate, isError } = useMutation({
    mutationFn: () =>
      postTravelInfo({
        body: {
          region: { sido: REGION_MAP[region!], si: districts },
          days: duration,
          styleList: preferences,
        },
      }),
    onSuccess: (data) => {
      createChat(data.data.result.chatId);
    },
  });

  return { mutate, isError };
};

export default usePostTravelInfo;
