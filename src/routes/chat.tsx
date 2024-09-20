import { createFileRoute, useNavigate } from "@tanstack/react-router";
import styled from "styled-components";
import ChatGroup from "../components/chat/ChatGroup";
import type { Chat } from "../types";
import { useEffect, useRef, useState } from "react";
import { isRegionType } from "../utils";
import { DISTRICT_MAP, REGION_MAP } from "../constants";
import PageTemplate from "../components/common/PageTemplate";
import Map from "../components/chat/Map";
import DistrictGrid from "../components/chat/DistrictGrid";
import Button from "../components/common/Button";
import { useChatStore, useTravelStore } from "../stores";

const DURATIONS = ["당일치기", "1박2일", "2박3일", "3박4일"];

export const Route = createFileRoute("/chat")({
  // loader: fetchChats,
  component: Chat,
});

function Chat() {
  const navigate = useNavigate();
  const ChatListRef = useRef<HTMLUListElement>(null);
  // const [chats, setChats] = useState<Chat[]>([]);

  const step = useChatStore((state) => state.step);
  const next = useChatStore((state) => state.next);
  const reset = useChatStore((state) => state.reset);
  const region = useTravelStore((state) => state.region);
  const setRegion = useTravelStore((state) => state.setRegion);
  const duration = useTravelStore((state) => state.duration);
  const setDuration = useTravelStore((state) => state.setDuration);
  const districts = useTravelStore((state) => state.districts);
  const setDistricts = useTravelStore((state) => state.setDistricts);
  const [districtBooleans, setDistrictBooleans] = useState(
    Array(30).fill(false)
  );

  const getDistricts = () => {
    if (region == null) return [];
    if (districtBooleans.every((x) => x == false)) return [];

    const selectedDistricts = DISTRICT_MAP[region].filter(
      (_, index) => districtBooleans[index]
    );

    return districtBooleans.every((x) => x == true)
      ? ["전체"]
      : selectedDistricts;
  };

  const clickRegion = (event: React.SyntheticEvent<SVGPathElement>) => {
    if (isRegionType(event.currentTarget.id)) setRegion(event.currentTarget.id);
    next();
  };

  const clickDone = () => {
    if (region == null) return;
    setDistricts(getDistricts());
    next();
  };

  const clickStyle = () => {
    navigate({ to: "/style" });
    next();
  };

  const clickDuration = (duration: number) => () => {
    setDuration(duration);
    next();
  };

  const resetCourse = () => {
    reset();
    localStorage.removeItem("region");
    localStorage.removeItem("preferences");
    localStorage.removeItem("duration");
  };

  useEffect(() => {
    if (ChatListRef.current) {
      if (step == 1) {
        ChatListRef.current.scrollTo({
          top: 0,
          behavior: "smooth",
        });
        return;
      }

      if (step == 5) {
        ChatListRef.current.scrollTo({
          top: ChatListRef.current.scrollHeight,
        });
        return;
      }

      ChatListRef.current.scrollTo({
        top: ChatListRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [step]);

  return (
    <PageTemplate pageName="Chat" badgeText="Chat with Chet!">
      <ResetButtonWrapper>
        <Button design="secondary" onClick={resetCourse}>
          + 새 여행코스
        </Button>
      </ResetButtonWrapper>
      <ChatList ref={ChatListRef}>
        {step >= 1 && (
          <ChatGroup who={"chet"}>
            <p>
              안녕! 나는 너만을 위한 여행 가이드, 체트라고 해.
              <br />
              이번 여행은 어디로 떠나? 지도에 영역을 클릭해줘!
            </p>
            <Map handleClick={clickRegion} />
          </ChatGroup>
        )}
        {step >= 2 && region && (
          <>
            <ChatGroup who={"user"}>
              <p>{REGION_MAP[region]}로 떠나.</p>
            </ChatGroup>
            <ChatGroup who={"chet"}>
              <p>
                {REGION_MAP[region]}에서 특별히 여행하고 싶은 지역이 있다면
                선택해줘!
              </p>
              <DistrictGrid
                region={region}
                districtBooleans={districtBooleans}
                setDistrictBooleans={setDistrictBooleans}
              />
            </ChatGroup>
            <ChatGroup who="user">
              <Button design="secondary" onClick={clickDone}>
                다 골랐어요
              </Button>
              {step >= 3 && <p>{districts.join(", ")}로 떠나.</p>}
            </ChatGroup>
          </>
        )}
        {step >= 3 && (
          <>
            <ChatGroup who="chet">
              <p>여행 기간은 어떻게 돼?</p>
            </ChatGroup>
            <ChatGroup who="user">
              <>
                {DURATIONS.map((duration, index) => (
                  <Button design="secondary" onClick={clickDuration(index + 1)}>
                    {duration}
                  </Button>
                ))}
              </>
            </ChatGroup>
          </>
        )}
        {step >= 4 && (
          <>
            <ChatGroup who="chet">
              <p>그렇구나! 이번 여행의 스타일을 알려줘!</p>
            </ChatGroup>
            <ChatGroup who="user">
              <Button design="secondary" onClick={clickStyle}>
                스타일 고르러 가기
              </Button>
            </ChatGroup>
          </>
        )}
        {step >= 5 && region && (
          <>
            <ChatGroup who="chet">
              <p>
                너만을 위한 {REGION_MAP[region]} {DURATIONS[duration - 1]}{" "}
                여행코스를 생성 중이야! <br /> 잠시만 기다려줘~
              </p>
            </ChatGroup>
          </>
        )}
        {/* {chats.map((chat) => (
          <ChatGroup
            who={chat.who}
            kinds={chat.kinds}
            region={region!}
            districtBooleans={districtBooleans}
            setDistrictBooleans={setDistrictBooleans}
            mapHandler={clickRegion}
            firstButtonHandler={clickDone}
          />
        ))} */}
      </ChatList>
    </PageTemplate>
  );
}

const ChatList = styled.ul`
  margin-left: auto;
  margin-right: auto;

  width: 50vw;
  height: 600px;
  overflow: scroll;
  display: flex;
  flex-direction: column;
  list-style-type: none;
  box-sizing: border-box;
  padding-bottom: 100px;

  @media screen and (width <= 500px) {
    padding-top: 100px;
    width: 100vw;
    padding-left: 15px;
  }
`;

const ResetButtonWrapper = styled.div`
  position: absolute;
  top: 28%;
  left: 5%;
`;

export default Chat;
