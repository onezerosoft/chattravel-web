import { REGION_MAP, DURATIONS } from "../../constants";
import { useTravelStore } from "../../stores";
import type { Message } from "../../types/domain";
import LoadingDots from "../common/LoadingDots";
import ChatGroup from "./ChatGroup";
import Course from "./Course";

interface MessagesProps {
  messages: Message[];
  status: "pending" | "error" | "success";
}

const Messages = ({ messages, status }: MessagesProps) => {
  const region = useTravelStore((state) => state.region!);
  const duration = useTravelStore((state) => state.duration);

  if (status == "pending" || !messages) {
    return (
      <>
        <ChatGroup
          groupKey={"course"}
          who="chet"
          texts={[
            `너만을 위한 ${REGION_MAP[region]} ${DURATIONS[duration - 1]} 여행코스를
          생성 중이야! \n 잠시만 기다려줘~`,
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
          `너만을 위한 ${REGION_MAP[region]} ${DURATIONS[duration - 1]} 여행코스를 생성 중이야! \n 잠시만 기다려줘~`,
        ]}
      />
      {messages.map((message) => {
        switch (message.type) {
          case "C-COURSE":
            return (
              <Course
                key={message.messageId}
                messageId={message.messageId}
                courses={message.content.courses}
              />
            );
          case "C-TEXT":
            return (
              <ChatGroup groupKey={message.messageId.toString()} who="chet">
                {message.content.message}
              </ChatGroup>
            );
          case "U-TEXT":
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
