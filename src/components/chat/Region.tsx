import React from "react";
import ChatGroup from "./ChatGroup";
import { isRegionType } from "../../utils";
import { useTravelStore } from "../../stores/useTravelStore";
import { useChatStore } from "../../stores/useChatStore";
import Map from "./Map";

const Region = () => {
  const step = useChatStore((state) => state.step);
  const next = useChatStore((state) => state.next);

  const setRegion = useTravelStore((state) => state.setRegion);

  const clickRegion = (event: React.SyntheticEvent<SVGPathElement>) => {
    if (step !== 1) return;
    if (!isRegionType(event.currentTarget.id)) return;

    setRegion(event.currentTarget.id);
    next();
    localStorage.setItem("activeMessageId", "districts2");
  };

  return (
    <>
      <ChatGroup
        who={"chet"}
        groupKey={"region"}
        texts={[
          "안녕! 나는 너만을 위한 여행 가이드, 챗트라고 해.\n이번 여행은 어디로 떠나? 지도에 영역을 클릭해줘!",
        ]}
      />
      <Map handleClick={clickRegion} />
    </>
  );
};

export default Region;
