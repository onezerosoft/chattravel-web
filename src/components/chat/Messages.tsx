import type { Message } from "../../types/domain";
import ChatGroup from "./ChatGroup";
import Course from "./Course";

interface MessagesProps {
  messages: Message[];
  scrollDown: () => void;
}

const Messages = ({ scrollDown, messages }: MessagesProps) => {
  return (
    <>
      {messages.map((message) => {
        switch (message.messageType) {
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
            return (
              <ChatGroup
                groupKey={message.messageId.toString()}
                who="chet"
                texts={[message.content.message]}
              />
            );
          case "U_TEXT":
            return (
              <ChatGroup groupKey={message.messageId.toString()} who="user">
                {message.content.message}
              </ChatGroup>
            );
          default:
            return <></>;
        }
      })}
    </>
  );
};

export default Messages;
