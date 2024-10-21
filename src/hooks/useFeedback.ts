import { useState } from "react";
import usePostFeedback from "./usePostFeedback";

const useFeedback = (messageId: number | undefined) => {
  const [like, setLike] = useState(false);
  const [hate, setHate] = useState(false);

  const { mutate } = usePostFeedback();

  const handleClickThumbs = (thumb: "like" | "hate") => () => {
    if (messageId == undefined) return;

    if (thumb == "like") {
      setLike((prev) => !prev);
      mutate({
        body: {
          request: "P",
        },
        params: {
          messageId,
        },
      });

      if (hate == true) {
        setHate(false);
      }
    }
    if (thumb == "hate") {
      setHate((prev) => !prev);

      if (like == true) {
        setLike(false);
      }
    }
  };

  return { like, hate, handleClickThumbs };
};

export default useFeedback;
