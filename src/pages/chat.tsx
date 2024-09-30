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
import Input from "../components/chat/Input";
import useGetTotalMessages from "../hooks/useGetTotalMessages";

const Chat = () => {
  const chatListRef = useRef<HTMLUListElement>(null);

  const step = useChatStore((state) => state.step);
  const reset = useChatStore((state) => state.reset);

  const region = useTravelStore((state) => state.region);
  const districts = useTravelStore((state) => state.districts);
  const duration = useTravelStore((state) => state.duration);
  const preferences = useTravelStore((state) => state.preferences);

  const { mutate } = usePostTravelInfo();
  const { data: messages, status } = useGetTotalMessages();

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
        region: { sido: region, si: districts },
        days: duration,
        styleList: preferences,
      },
    });
  };

  const scrollDown = () => {
    if (chatListRef.current) {
      chatListRef.current.scrollTo({
        top: chatListRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  const scrollUp = () => {
    if (chatListRef.current) {
      chatListRef.current.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    if (step == 1) {
      localStorage.setItem("lastMessageId", "region");
      scrollUp();
      return;
    }

    if (step == 5) {
      getFirstCourse();
    }

    scrollDown();
  }, [step]);

  return (
    <PageTemplate pageName="Chat" badgeText="Chat with Chet!">
      <ResetButtonWrapper>
        <Button design="secondary" onClick={resetCourse}>
          + 새 여행코스
        </Button>
      </ResetButtonWrapper>
      <ChatList ref={chatListRef}>
        {step >= 1 && <Region />}
        {step >= 2 && region && <Districts region={region} />}
        {step >= 3 && <Duration />}
        {step >= 4 && <Preferences />}
        {step >= 5 && region && (
          <Messages
            messages={messages!}
            status={status}
            scrollDown={scrollDown}
          />
        )}
        {step >= 5 && <Input />}
      </ChatList>
    </PageTemplate>
  );
};

const ChatList = styled.ul`
  margin-left: auto;
  margin-right: auto;

  width: 50vw;
  height: 75vh;
  overflow: scroll;
  display: flex;
  flex-direction: column;
  list-style-type: none;
  box-sizing: border-box;
  padding-bottom: 80px;

  @media screen and (width <= 500px) {
    padding-top: 100px;
    width: 100vw;
    padding-left: 15px;
  }
`;

const ResetButtonWrapper = styled.div`
  position: absolute;
  top: 200px;
  left: 5%;
`;

export default Chat;
