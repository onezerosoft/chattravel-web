import { useState } from "react";
import usePostFeedback from "./usePostFeedback";

const getInitialState = (
  state: "like" | "hate",
  reaction: null | "POSITIVE" | "NEGATIVE"
) => {
  if (!reaction) return false;

  if (state == "like" && reaction == "POSITIVE") {
    return true;
  }
  if (state == "hate" && reaction == "NEGATIVE") {
    return true;
  }

  return false;
};

const useFeedback = (
  messageId: number | undefined,
  reaction: null | "POSITIVE" | "NEGATIVE"
) => {
  const [like, setLike] = useState(getInitialState("like", reaction));
  const [hate, setHate] = useState(getInitialState("hate", reaction));

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
