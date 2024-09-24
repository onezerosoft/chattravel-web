import React, { PropsWithChildren, useEffect, useState } from "react";
import styled from "styled-components";
import { ChetSVG } from "../../assets";
import type { Chat } from "../../types/domain";

interface ChatGroupProps extends Chat {
  groupKey: string;
  texts?: string[];
}

function ChatGroup({
  who,
  children,
  groupKey,
  texts,
}: ChatGroupProps & PropsWithChildren) {
  const [displayedText, setDisplayedText] = useState("");

  if (who === "user" || !texts) {
    return (
      <UserWrapper key={JSON.stringify(who + groupKey)}>
        <ChatBoxContainer $who={who}>
          {React.Children.toArray(children).map((child, index) => (
            <ChatBox key={groupKey + index} $who={who}>
              {child}
            </ChatBox>
          ))}
        </ChatBoxContainer>
      </UserWrapper>
    );
  }

  const fullText = texts[0];
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    let index = 0;
    console.log(fullText);
    const interval = setInterval(() => {
      if (index < fullText.length) {
        setDisplayedText((prev) => prev + fullText[index]);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [fullText]);

  return (
    <ChetWrapper key={JSON.stringify(who + groupKey)}>
      <ChetSVG height={100} />
      <ChatBoxContainer $who={who}>
        {texts.map((text, index) => (
          <ChatBox key={groupKey + index} $who={who}>
            {displayedText}
          </ChatBox>
        ))}
      </ChatBoxContainer>
    </ChetWrapper>
  );
}

export default ChatGroup;

const ChetWrapper = styled.li`
  display: flex;

  @media screen and (width <= 500px) {
    & > svg {
      width: 100px;
      height: 100px;
    }
  }
`;

const UserWrapper = styled.li`
  align-self: flex-end;
  margin-left: 20px;
  margin-right: 30px;
`;

const ChatBox = styled.div<{ $who: "chet" | "user" }>`
  background-color: ${({ $who }) => ($who === "chet" ? "#f5f5f5" : "#3B3B3B")};
  color: ${({ $who }) => ($who === "chet" ? "black" : "white")};
  border-radius: 20px;
  padding: 10px 15px;
  font-weight: 500;
  text-align: start;
  width: max-content;
  display: flex;
  gap: 10px;
  max-width: 450px;
`;

const ChatBoxContainer = styled.div<{ $who: "chet" | "user" }>`
  display: flex;
  flex-direction: column;
  align-items: ${({ $who }) => ($who === "chet" ? "start" : "flex-end")};
  margin: ${({ $who }) => ($who === "chet" ? "25px 0" : "0")};
  gap: 10px;
`;
