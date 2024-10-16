import styled from "styled-components";
import type { Chat, Message, TotalMessagesResponse } from "../types/domain";
import { useEffect, useRef, useState } from "react";
import PageTemplate from "../components/common/PageTemplate";
import Button from "../components/common/Button";
import { useTravelStore } from "../stores/useTravelStore";
import Region from "../components/chat/Region";
import Districts from "../components/chat/Districts";
import Duration from "../components/chat/Duration";
import Preferences from "../components/chat/Preferences";
import Messages from "../components/chat/Messages";
import Input from "../components/chat/Input";
import useGetTotalMessages from "../hooks/useGetTotalMessages";
import usePostUserMessage from "../hooks/usePostUserMessage";
import ChatGroup from "../components/chat/ChatGroup";
import { DURATIONS } from "../constants";
import { AxiosResponse } from "axios";
import LoadingDots from "../components/common/LoadingDots";
import LoadingChet from "../components/chat/LoadingChet";
import { useChatStore } from "../stores/useChatStore";

const Chat = () => {
  const chatListRef = useRef<HTMLUListElement>(null);

  const step = useChatStore((state) => state.step);
  const chatId = useChatStore((state) => state.id);
  const resetChatStore = useChatStore((state) => state.reset);

  const duration = useTravelStore((state) => state.duration);
  const resetTravelStore = useTravelStore((state) => state.reset);

  const [userMessages, setUserMessages] = useState<Message[]>([]);
  const [chetMessages, setChetMessages] = useState<Message[]>([]);

  const { data: totalMessages, status: totalMessagesStatus } =
    useGetTotalMessages();

  const { mutateAsync, status: userMessageStatus } = usePostUserMessage();

  const sendUserMessage = async (userMessage: string) => {
    localStorage.setItem("activeMessageId", "userMessage");
    setUserMessages((prev) => [
      ...prev,
      {
        messageId: 0,
        messageType: "U_TEXT",
        content: {
          message: userMessage,
          courses: [],
        },
        createdAt: "",
      },
    ]);

    const res: AxiosResponse<TotalMessagesResponse> = await mutateAsync({
      body: {
        userMessage,
      },
      params: {
        chatId,
      },
    });

    if (res.status) {
      setChetMessages((prev) => [...prev, ...res.data.result.messages]);
      localStorage.setItem(
        "activeMessageId",
        res.data.result.messages.at(-1)!.messageId.toString()
      );
    }
  };

  const resetCourse = () => {
    resetChatStore();
    resetTravelStore();
    setUserMessages([]);
    setChetMessages([]);
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
      localStorage.setItem("activeMessageId", "region");
      scrollUp();
      return;
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
        {step >= 2 && <Districts />}
        {step >= 3 && <Duration />}
        {step >= 4 && <Preferences />}
        {step >= 5 && (
          <ChatGroup
            groupKey={"course"}
            who="chet"
            texts={[
              `너만을 위한 ${DURATIONS[duration - 1]} 여행코스를 생성 중이야!\n잠시만 기다려줘~ (약 1분 소요)`,
            ]}
          />
        )}
        {step >= 5 && totalMessagesStatus == "pending" && (
          <LoadingDotsWrapper>
            <LoadingDots />
          </LoadingDotsWrapper>
        )}
        {step >= 5 && totalMessages && (
          <Messages messages={totalMessages} scrollDown={scrollDown} />
        )}
        {step >= 5 &&
          userMessages.length > 0 &&
          userMessages.map((userMessage, index) => (
            <>
              <Messages messages={[userMessage]} scrollDown={scrollDown} />
              {userMessageStatus == "pending" &&
              index == userMessages.length - 1 ? (
                <LoadingChet />
              ) : (
                <Messages
                  messages={[chetMessages[index]]}
                  scrollDown={scrollDown}
                />
              )}
            </>
          ))}
        {step >= 5 && <Input onSubmit={sendUserMessage} />}
      </ChatList>
    </PageTemplate>
  );
};

const LoadingDotsWrapper = styled.div`
  margin-left: 120px;
  margin-top: -15px;
`;

const ChatList = styled.ul`
  margin-left: auto;
  margin-right: auto;

  width: 50vw;
  height: 80vh;
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
