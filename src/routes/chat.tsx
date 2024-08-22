import { createFileRoute } from "@tanstack/react-router";
import Badge from "../components/Badge";
import styled from "styled-components";

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
        <li>dfdfd</li>
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
`;

const ChatList = styled.ul`
  margin-left: auto;
  margin-right: auto;

  background-color: pink;
  width: 500px;
  height: 80vh;
  overflow: scroll;
`;

export default Chat;
