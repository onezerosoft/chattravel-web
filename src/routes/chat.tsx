import { createFileRoute } from "@tanstack/react-router";
import Badge from "../components/common/Badge";
import styled from "styled-components";
import ChatGroup from "../components/chat/ChatBox";
import { ChatWho, Region } from "../types";
import { useEffect, useRef, useState } from "react";
import { isRegion } from "../utils";
import Map from "../components/chat/Map";
import { REGION_MAP } from "../constants";
import RegionGrid from "../components/chat/RegionGrid";

export const Route = createFileRoute("/chat")({
  // loader: fetchPosts,
  component: Chat,
});

interface Chat {
  who: ChatWho;
  chats: JSX.Element[];
}

function Chat() {
  const ChatListRef = useRef<HTMLUListElement>(null);

  const clickRegion = (event: React.SyntheticEvent<SVGPathElement>) => {
    if (isRegion(event.currentTarget.id)) {
      setRegion(event.currentTarget.id);
      setChats([
        ...chats,
        {
          who: "user",
          chats: [<>{REGION_MAP[event.currentTarget.id]}로 떠나.</>],
        },
        {
          who: "chet",
          chats: [
            <>
              {REGION_MAP[event.currentTarget.id]}에서 특별히 여행하고 싶은
              지역이 있다면 선택해줘!
            </>,
            <RegionGrid />,
          ],
        },
      ]);
    }
  };

  const initialChat = {
    who: "chet" as ChatWho,
    chats: [
      <>
        안녕! 나는 너만을 위한 여행 가이드, 체트라고 해. <br />
        이번 여행은 어디로 떠나? 지도에 영역을 클릭해줘!
      </>,
      <Map handleClick={clickRegion} />,
    ],
  };

  const [chats, setChats] = useState<Chat[]>([initialChat]);
  const [region, setRegion] = useState<Region | null>(null);

  useEffect(() => {
    if (ChatListRef.current) {
      if (chats.length == 1) return;
      ChatListRef.current.scrollTo({
        top: ChatListRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [chats]);

  return (
    <Wrapper>
      <PageName>
        <Badge text="Chat with Chet!" />
        <h1>Chat</h1>
      </PageName>
      <ChatList ref={ChatListRef}>
        {chats.map((chat) => (
          <ChatGroup who={chat.who}>{chat.chats}</ChatGroup>
        ))}
      </ChatList>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  position: relative;
  box-sizing: border-box;
  padding-top: 70px;
`;

const PageName = styled.div`
  position: absolute;
  top: 80px;
  left: 80px;

  & > h1 {
    font-weight: 600;
    margin-top: 10px;
  }

  @media screen and (width <= 500px) {
    left: 30px;
  }
`;

const ChatList = styled.ul`
  margin-left: auto;
  margin-right: auto;

  width: 45vw;
  height: 70vh;
  overflow: scroll;
  display: flex;
  flex-direction: column;
  list-style-type: none;
  gap: 20px;
  padding-bottom: 10vh;
  box-sizing: border-box;

  @media screen and (width <= 500px) {
    padding-top: 100px;
    width: 100vw;
    padding-left: 15px;
  }
`;

export default Chat;
