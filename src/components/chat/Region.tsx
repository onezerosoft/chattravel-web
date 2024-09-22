import React from "react";
import ChatGroup from "./ChatGroup";
import { isRegionType } from "../../utils";
import { useChatStore, useTravelStore } from "../../stores";
import Map from "./Map";

const Region = () => {
  const next = useChatStore((state) => state.next);
  const setRegion = useTravelStore((state) => state.setRegion);

  const clickRegion = (event: React.SyntheticEvent<SVGPathElement>) => {
    if (isRegionType(event.currentTarget.id)) setRegion(event.currentTarget.id);
    next();
  };

  return (
    <ChatGroup who={"chet"} groupKey={"region"}>
      <p>
        안녕! 나는 너만을 위한 여행 가이드, 체트라고 해.
        <br />
        이번 여행은 어디로 떠나? 지도에 영역을 클릭해줘!
      </p>
      <Map handleClick={clickRegion} />
    </ChatGroup>
  );
};

export default Region;
