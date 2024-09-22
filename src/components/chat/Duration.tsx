import Button from "../common/Button";
import ChatGroup from "./ChatGroup";
import { useChatStore, useTravelStore } from "../../stores";
import { DURATIONS } from "../../constants";

const Duration = () => {
  const districts = useTravelStore((state) => state.districts);
  const setDuration = useTravelStore((state) => state.setDuration);

  const step = useChatStore((state) => state.step);
  const next = useChatStore((state) => state.next);

  const clickDuration = (duration: number) => () => {
    if (step !== 3) return;
    setDuration(duration);
    next();
  };

  return (
    <>
      <ChatGroup who="chet" groupKey="duration1">
        <p>{districts.join(", ")}로 떠나는 구나! 여행 기간은 어떻게 돼?</p>
      </ChatGroup>
      <ChatGroup who="user" groupKey="duration2">
        <>
          {DURATIONS.map((duration, index) => (
            <Button
              key={duration}
              design="secondary"
              onClick={clickDuration(index + 1)}
            >
              {duration}
            </Button>
          ))}
        </>
      </ChatGroup>
    </>
  );
};

export default Duration;
