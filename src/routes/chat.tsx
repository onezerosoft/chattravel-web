import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/chat")({
  // loader: fetchPosts,
  component: Chat,
});

function Chat() {
  return <div>Chat</div>;
}

export default Chat;
