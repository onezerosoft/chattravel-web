import { createFileRoute } from "@tanstack/react-router";
import styled from "styled-components";
import ChatGroup from "../components/chat/ChatGroup";
import type { Chat, ChatWho, Region } from "../types";
import { useEffect, useRef, useState } from "react";
import { isRegion } from "../utils";
import { DISTRICT_MAP, REGION_MAP } from "../constants";
import PageTemplate from "../components/common/PageTemplate";

export const Route = createFileRoute("/chat")({
  // loader: fetchPosts,
  component: Chat,
});

function Chat() {
  const clickRegion = (event: React.SyntheticEvent<SVGPathElement>) => {
    if (isRegion(event.currentTarget.id)) {
      setRegion(event.currentTarget.id);
      const secondOnboardingChat = [
        {
          who: "user" as ChatWho,
          kinds: [
            { case: 0, text: `${REGION_MAP[event.currentTarget.id]}로 떠나.` },
          ],
        },
        {
          who: "chet" as ChatWho,
          kinds: [
            {
              case: 0,
              text: `${REGION_MAP[event.currentTarget.id]}에서 특별히 여행하고 싶은 지역이 있다면 선택해줘!`,
            },
            { case: 2 },
            { case: 3, text: "다 골랐어요" },
          ],
        },
      ];
      setChats(chats.concat(secondOnboardingChat));
    }
  };

  const firstOnboardingChat = {
    who: "chet" as ChatWho,
    kinds: [
      {
        case: 0,
        text: "안녕! 나는 너만을 위한 여행 가이드, 체트라고 해.\n이번 여행은 어디로 떠나? 지도에 영역을 클릭해줘!",
      },
      { case: 1 },
    ],
  };
  const [chats, setChats] = useState<Chat[]>([firstOnboardingChat]);
  const [region, setRegion] = useState<Region | null>(null);
  const ChatListRef = useRef<HTMLUListElement>(null);
  const [districtBooleans, setDistrictBooleans] = useState(
    Array(30).fill(false)
  );

  const clickDone = () => {
    if (region == null) return;

    const selectedDistricts = DISTRICT_MAP[region].filter(
      (_, index) => districtBooleans[index]
    );
    const textedDistricts = districtBooleans.every((x) => x == true)
      ? `${REGION_MAP[region]} 전체`
      : selectedDistricts.join(", ");

    const thirdOnboardingChat = [
      {
        who: "user" as ChatWho,
        kinds: [{ case: 0, text: `${textedDistricts}` }],
      },
      {
        who: "chet" as ChatWho,
        kinds: [
          {
            case: 0,
            text: `그렇구나! 이번 여행의 스타일을 알려줘!`,
          },
          { case: 4, text: "스타일 고르러가기" },
        ],
      },
    ];
    setChats(chats.concat(thirdOnboardingChat));
  };

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
    <PageTemplate pageName="Chat" badgeText="Chat with Chet!">
      <ChatList ref={ChatListRef}>
        {chats.map((chat) => (
          <ChatGroup
            who={chat.who}
            kinds={chat.kinds}
            region={region!}
            districtBooleans={districtBooleans}
            setDistrictBooleans={setDistrictBooleans}
            mapHandler={clickRegion}
            firstButtonHandler={clickDone}
          />
        ))}
      </ChatList>
    </PageTemplate>
  );
}

const ChatList = styled.ul`
  margin-left: auto;
  margin-right: auto;

  width: 50vw;
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
