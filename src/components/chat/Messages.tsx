import { REGION_MAP, DURATIONS } from "../../constants";
import useGetTotalMessages from "../../hooks/useGetTotalMessages";
import { useTravelStore } from "../../stores";
import LoadingDots from "../common/LoadingDots";
import ChatGroup from "./ChatGroup";
import Course from "./Course";

const Messages = () => {
  const { data: messages, status } = useGetTotalMessages();
  const region = useTravelStore((state) => state.region!);
  const duration = useTravelStore((state) => state.duration);

  if (status == "pending" || !messages) {
    return (
      <ChatGroup groupKey={"course"} who="chet">
        <p>
          너만을 위한 {REGION_MAP[region]} {DURATIONS[duration - 1]} 여행코스를
          생성 중이야! <br /> 잠시만 기다려줘~
        </p>
        <LoadingDots />
      </ChatGroup>
    );
  }

  return (
    <>
      <ChatGroup groupKey={"coursechet"} who="chet">
        <p>
          너만을 위한 {REGION_MAP[region]} {DURATIONS[duration - 1]} 여행코스를
          생성 중이야! <br /> 잠시만 기다려줘~
        </p>
      </ChatGroup>
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
