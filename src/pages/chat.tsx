import styled from "styled-components";
import type { Chat, Message, TotalMessagesResponse } from "../types/domain";
import { useEffect, useRef, useState } from "react";
import PageTemplate from "../components/common/PageTemplate";
import Button from "../components/common/Button";
import { useChatStore, useTravelStore } from "../stores";
import Region from "../components/chat/Region";
import Districts from "../components/chat/Districts";
import Duration from "../components/chat/Duration";
import Preferences from "../components/chat/Preferences";
import Messages from "../components/chat/Messages";
import Input from "../components/chat/Input";
import useGetTotalMessages from "../hooks/useGetTotalMessages";
import usePostUserMessage from "../hooks/usePostUserMessage";
import ChatGroup from "../components/chat/ChatGroup";
import { DURATIONS, REGION_MAP } from "../constants";
import { AxiosResponse } from "axios";

const Chat = () => {
  const chatListRef = useRef<HTMLUListElement>(null);

  const step = useChatStore((state) => state.step);
  const chatId = useChatStore((state) => state.id);
  const duration = useTravelStore((state) => state.duration);
  const trigger = useChatStore((state) => state.trigger);
  const reset = useChatStore((state) => state.reset);

  const region = useTravelStore((state) => state.region);

  const { data: messages, status: totalMessagesStatus } = useGetTotalMessages();
  const [userMessage, setUserMessage] = useState("");
  const [chetAnswerMessages, setChetAnswerMessage] = useState<Message[]>([]);
  const { mutateAsync } = usePostUserMessage();

  const sendUserMessage = async (userMessage: string) => {
    localStorage.setItem("lastMessageId", "userMessage");
    setUserMessage(userMessage);

    const res: AxiosResponse<TotalMessagesResponse> = await mutateAsync({
      body: {
        userMessage,
      },
      params: {
        chatId: chatId!,
      },
    });

    setChetAnswerMessage(res.data.result.messages);
    localStorage.setItem(
      "lastMessageId",
      res.data.result.messages.at(-1)!.messageId.toString()
    );
  };

  const resetCourse = () => {
    reset();
    localStorage.removeItem("region");
    localStorage.removeItem("duration");
    localStorage.removeItem("districts");
    localStorage.removeItem("isFirst");
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
        {step >= 5 && region && !messages && (
          <ChatGroup
            groupKey={"course"}
            who="chet"
            texts={[
              `너만을 위한 ${REGION_MAP[region]} ${DURATIONS[duration - 1]} 여행코스를 생성 중이야!\n잠시만 기다려줘~ (약 10초 소요)`,
            ]}
          />
        )}
        {step >= 5 && region && messages && (
          <>
            <ChatGroup
              groupKey={"course"}
              who="chet"
              texts={[
                `너만을 위한 ${REGION_MAP[region]} ${DURATIONS[duration - 1]} 여행코스를 생성 중이야!\n잠시만 기다려줘~ (약 10초 소요)`,
              ]}
            />
            <Messages messages={messages} scrollDown={scrollDown} />
          </>
        )}
        {step >= 5 && region && userMessage != "" && (
          <Messages
            messages={[
              {
                messageId: 0,
                type: "U_TEXT",
                content: {
                  message: userMessage,
                  courses: [],
                },
                createdAt: "",
              },
            ]}
            scrollDown={scrollDown}
          />
        )}
        {step >= 5 && region && chetAnswerMessages.length > 0 && (
          <Messages messages={chetAnswerMessages} scrollDown={scrollDown} />
        )}
        {step >= 5 && <Input onSubmit={sendUserMessage} />}
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
