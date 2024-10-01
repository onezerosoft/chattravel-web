import { REGION_MAP, DURATIONS } from "../../constants";
import { useTravelStore } from "../../stores";
import type { Message } from "../../types/domain";
import LoadingDots from "../common/LoadingDots";
import ChatGroup from "./ChatGroup";
import Course from "./Course";

interface MessagesProps {
  messages: Message[];
  status: "pending" | "error" | "success";
  scrollDown: () => void;
}

const Messages = ({ scrollDown, messages, status }: MessagesProps) => {
  const region = useTravelStore((state) => state.region!);
  const duration = useTravelStore((state) => state.duration);

  if (status == "pending" || !messages) {
    localStorage.setItem("lastMessageId", "course");

    return (
      <>
        <ChatGroup
          groupKey={"course"}
          who="chet"
          texts={[
            `너만을 위한 ${REGION_MAP[region]} ${DURATIONS[duration - 1]} 여행코스를 생성 중이야!\n잠시만 기다려줘~ (약 10초 소요)`,
          ]}
        />
        <LoadingDots />
      </>
    );
  }

  return (
    <>
      <ChatGroup
        groupKey={"course"}
        who="chet"
        texts={[
          `너만을 위한 ${REGION_MAP[region]} ${DURATIONS[duration - 1]} 여행코스를 생성 중이야!\n잠시만 기다려줘~ (약 10초 소요)`,
        ]}
      />
      {messages.map((message) => {
        switch (message.type) {
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
