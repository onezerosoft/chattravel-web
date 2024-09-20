import React, { PropsWithChildren } from "react";
import styled from "styled-components";
import { ChetSVG } from "../../assets";
import type { Chat } from "../../types";

interface ChatGroupProps extends Chat {}

function ChatGroup({ who, children }: ChatGroupProps & PropsWithChildren) {
  if (who == "user")
    return (
      <UserWrapper>
        <ChatBoxContainer who={who}>
          {React.Children.toArray(children).map((child) => (
            <ChatBox who={who}>{child}</ChatBox>
          ))}
        </ChatBoxContainer>
      </UserWrapper>
    );

  return (
    <ChetWrapper>
      <ChetSVG height={100} />
      <ChatBoxContainer who={who}>
        {React.Children.toArray(children).map((child) => (
          <ChatBox who={who}>{child}</ChatBox>
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

const ChatBox = styled.div<{ who: "chet" | "user" }>`
  background-color: ${({ who }) => (who == "chet" ? "#f5f5f5" : "#3B3B3B")};
  color: ${({ who }) => (who == "chet" ? "black" : "white")};
  border-radius: 20px;
  padding: 10px 15px;
  font-weight: 500;
  text-align: start;
  width: max-content;
  display: flex;
  gap: 10px;
`;

const ChatBoxContainer = styled.div<{ who: "chet" | "user" }>`
  display: flex;
  flex-direction: column;
  align-items: ${({ who }) => (who == "chet" ? "start" : "flex-end")};
  margin: ${({ who }) => (who == "chet" ? "25px 0" : "0")};
  gap: 10px;
`;
