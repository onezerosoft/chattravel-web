import { REGION_MAP, DURATIONS } from "../../constants";
import useGetTotalMessages from "../../hooks/useGetTotalMessages";
import { useTravelStore } from "../../stores";
import Button from "../common/Button";
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
        {messages.map((message) => (
          <Course
            messageId={message.messageId}
            courses={message.content.courses}
          />
        ))}
      </ChatGroup>
      <ChatGroup groupKey={"courseuser"} who="user">
        <Button design="secondary">코스 저장하기</Button>
      </ChatGroup>
    </>
  );
};

export default Messages;
