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

    switch (messageType) {
      case "C_COURSE":
        return (
          <Course
            scrollDown={scrollDown}
            key={message.messageId + "first"}
            messageId={message.messageId}
            courses={message.content.courses}
          />
        );
      case "C_TEXT":
      case "C_COMMON":
        return (
          <ChatGroup
            groupKey={message.messageId.toString()}
            messageId={message.messageId}
            who="chet"
            texts={[message.content.message]}
            needFeedback={messageType == "C_TEXT"}
          />
        );
      case "U_TEXT":
      default:
        return (
          <ChatGroup
            groupKey={message.messageId.toString()}
            messageId={message.messageId}
            who="user"
          >
            {message.content.message}
          </ChatGroup>
        );
    }
  });
};

export default Messages;
