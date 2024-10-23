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
      if (like == false)
        mutate({
          body: {
            reaction: "P",
          },
          params: {
            messageId,
          },
        });
      else if (like == true)
        mutate({
          body: {
            reaction: "C",
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
      if (hate == false)
        mutate({
          body: {
            reaction: "N",
          },
          params: {
            messageId,
          },
        });
      else if (hate == true)
        mutate({
          body: {
            reaction: "C",
          },
          params: {
            messageId,
          },
        });

      if (like == true) {
        setLike(false);
      }
    }
  };

  return { like, hate, handleClickThumbs };
};

export default useFeedback;
