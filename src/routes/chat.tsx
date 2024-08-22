import { createFileRoute } from "@tanstack/react-router";
import Badge from "../components/common/Badge";
import styled from "styled-components";
import { ChetChatBox, UserChatBox } from "../components/chat/ChatBox";

export const Route = createFileRoute("/chat")({
  // loader: fetchPosts,
  component: Chat,
});

function Chat() {
  return (
    <Wrapper>
      <PageName>
        <Badge text="Chat with Chet!" />
        <h1>Chat</h1>
      </PageName>
      <ChatList>
        <ChetChatBox isFirst={true} />
        <UserChatBox>전주로 떠나</UserChatBox>
      </ChatList>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  position: relative;
  box-sizing: border-box;
  padding-top: 100px;
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
  height: 80vh;
  overflow: scroll;
  display: flex;
  flex-direction: column;
  list-style-type: none;
  gap: 20px;

  @media screen and (width <= 500px) {
    padding-top: 100px;
    width: 100vw;
    padding-left: 15px;
  }
`;

export default Chat;
