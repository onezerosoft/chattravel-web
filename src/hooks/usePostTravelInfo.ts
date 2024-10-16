import { useMutation } from "@tanstack/react-query";
import { postTravelInfo } from "../apis/post";
import { useTravelStore } from "../stores/useTravelStore";
import { REGION_MAP } from "../constants";
import { useChatStore } from "../stores/useChatStore";
import { useAlertStore } from "../stores/useAlertStore";
import { useNavigate } from "react-router";

const usePostTravelInfo = () => {
  const navigate = useNavigate();
  const createChat = useChatStore((state) => state.createChat);

  const region = useTravelStore((state) => state.region);
  const districts = useTravelStore((state) => state.districts);
  const duration = useTravelStore((state) => state.duration);
  const preferences = useTravelStore((state) => state.preferences);

  const close = useAlertStore((state) => state.close);
  const makeAlert = useAlertStore((state) => state.makeAlert);

  const onClickTopOption = () => {
    close();
    mutate();
  };

  const onClickBottomOption = () => {
    close();
    navigate("/");
  };

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
    onError: () => {
      makeAlert(
        "ERROR",
        "현재 서비스가 불안정하여 \n여행정보 전송에 실패했어요 🥲",
        "다시시도",
        "홈으로",
        onClickTopOption,
        onClickBottomOption
      );
    },
  });

  return { mutate, isError };
};

export default usePostTravelInfo;
