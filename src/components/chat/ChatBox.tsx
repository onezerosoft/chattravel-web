import React, { PropsWithChildren } from "react";
import styled from "styled-components";
import { ChetSVG } from "../../assets";
import { ChatWho } from "../../types";

interface ChatGroup {
  who: ChatWho;
}

function ChatGroup({ who, children }: ChatGroup & PropsWithChildren) {
  if (who == "user")
    return (
      <UserWrapper>
        <ChatBoxContainer>
          {React.Children.toArray(children).map((child) => (
            <ChatBox type={who}>{child}</ChatBox>
          ))}
        </ChatBoxContainer>
      </UserWrapper>
    );

  return (
    <ChetWrapper>
      <ChetSVG height={100} />
      <ChatBoxContainer>
        {React.Children.toArray(children).map((child) => (
          <ChatBox type={who}>{child}</ChatBox>
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

const ChatBox = styled.div<{ type: "chet" | "user" }>`
  background-color: ${({ type }) => (type == "chet" ? "#f5f5f5" : "#3B3B3B")};
  color: ${({ type }) => (type == "chet" ? "black" : "white")};
  border-radius: 20px;
  padding: 10px 15px;
  font-weight: 500;
  text-align: start;
`;

const ChatBoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 15px;
`;
