import { createFileRoute } from "@tanstack/react-router";
import styled from "styled-components";
import type { Chat } from "../types/domain";
import { useEffect, useRef } from "react";
import PageTemplate from "../components/common/PageTemplate";
import Button from "../components/common/Button";
import { useChatStore, useTravelStore } from "../stores";
import Region from "../components/chat/Region";
import Districts from "../components/chat/Districts";
import Duration from "../components/chat/Duration";
import Preferences from "../components/chat/Preferences";
import usePostTravelInfo from "../hooks/usePostTravelInfo";
import Messages from "../components/chat/Messages";

export const Route = createFileRoute("/chat")({
  component: Chat,
});

function Chat() {
  const ChatListRef = useRef<HTMLUListElement>(null);

  const step = useChatStore((state) => state.step);
  const reset = useChatStore((state) => state.reset);

  const region = useTravelStore((state) => state.region);
  const districts = useTravelStore((state) => state.districts);
  const duration = useTravelStore((state) => state.duration);
  const preferences = useTravelStore((state) => state.preferences);

  const { mutate } = usePostTravelInfo();

  const resetCourse = () => {
    reset();
    localStorage.removeItem("region");
    localStorage.removeItem("duration");
    localStorage.removeItem("districts");
    localStorage.removeItem("isFirst");
  };

  const getFirstCourse = () => {
    if (!region) return;

    mutate({
      body: {
        region: { SIDO: region, SI: districts },
        days: duration,
        styleList: preferences,
      },
    });
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
        getFirstCourse();
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
        {step >= 1 && <Region />}
        {step >= 2 && region && <Districts region={region} />}
        {step >= 3 && <Duration />}
        {step >= 4 && <Preferences />}
        {step >= 5 && region && <Messages />}
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
