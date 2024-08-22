import { PropsWithChildren } from "react";
import styled from "styled-components";
import { ChetSVG } from "../../assets";
import Map from "./Map";

interface ChetChatBoxProps {
  isFirst: boolean;
}

export function ChetChatBox({
  isFirst,
  children,
}: ChetChatBoxProps & PropsWithChildren) {
  if (isFirst)
    return (
      <ChetWrapper>
        <ChetSVG />
        <ChatBoxContainer>
          <ChatBox type="chet">
            안녕! 나는 너만을 위한 여행 가이드, 체트라고 해. <br />
            이번 여행은 어디로 떠나?
          </ChatBox>
          <ChatBox type="chet">
            <Map />
          </ChatBox>
        </ChatBoxContainer>
      </ChetWrapper>
    );

  return (
    <ChetWrapper>
      <ChetSVG />
      <ChatBox type="chet">{children}</ChatBox>
    </ChetWrapper>
  );
}

export function UserChatBox({ children }: PropsWithChildren) {
  return (
    <UserWrapper>
      <ChatBox type="user">{children}</ChatBox>
    </UserWrapper>
  );
}

const ChetWrapper = styled.li`
  display: flex;
  align-self: flex-start;
  justify-content: flex-start;
  margin-right: 20px;

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
  background-color: #f5f5f5;
  border-radius: 20px;
  padding: 15px;
  font-weight: 500;
  text-align: start;
`;

const ChatBoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
