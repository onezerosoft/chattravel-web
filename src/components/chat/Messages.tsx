import type { Message } from "../../types/domain";
import ChatGroup from "./ChatGroup";
import Course from "./Course";

interface MessagesProps {
  messages: Message[];
  scrollDown: () => void;
}

const Messages = ({ scrollDown, messages }: MessagesProps) => {
  return messages.map((message) => {
    const messageType = message.messageType;
    if (messageType == "C_COURSE")
      return (
        <Course
          scrollDown={scrollDown}
          key={message.messageId + "first"}
          messageId={message.messageId}
          courses={message.content.courses}
        />
      );
    if (messageType == "C_TEXT" || messageType == "C_COMMON")
      return (
        <ChatGroup
          groupKey={message.messageId.toString()}
          who="chet"
          texts={[message.content.message]}
        />
      );
    if (message.messageType == "U_TEXT")
      return (
        <ChatGroup groupKey={message.messageId.toString()} who="user">
          {message.content.message}
        </ChatGroup>
      );
  });
};

export default Messages;
