import { useNavigate } from "@tanstack/react-router";
import Button from "../common/Button";
import ChatGroup from "./ChatGroup";
import { useChatStore, useTravelStore } from "../../stores";
import { memo } from "react";

const STYLES = [
  ["자연", "자연", "자연/도시", "도시", "도시"],
  ["관광", "관광", "관광/휴식", "휴식", "휴식"],
  ["럭셔리숙소", "럭셔리숙소", "숙박종류", "가성비숙소", "가성비숙소"],
  [
    "사진촬영 매우 중요",
    "사진촬영 중요",
    "사진촬영 상관없음",
    "사진촬영을 딱히 중요하지 않음",
    "사진촬영 매우 중요하지 않음",
  ],
];

const STYLE_DESCRIPTIONS: Record<number, string> = {
  1: "매우 선호",
  2: "선호",
  3: "상관없음",
  4: "선호",
  5: "매우 선호",
};

const Preferences = memo(() => {
  const preferences = useTravelStore((store) => store.preferences);
  const updatePreferences = useTravelStore((store) => store.updatePreferences);

  const navigate = useNavigate();

  const step = useChatStore((state) => state.step);
  const next = useChatStore((state) => state.next);

  const resetStyle = () => {
    if (step !== 4) return;
    localStorage.removeItem("preferences");
    updatePreferences([0, 0, 0, 0]);
    navigate({ to: "/style" });
  };

  const getStyleDescriptions = () => {
    return preferences
      .map((preference, index) => {
        return index <= 2
          ? STYLES[index][preference - 1] + " " + STYLE_DESCRIPTIONS[preference]
          : STYLES[index][preference - 1];
      })
      .join(", ");
  };

  if (localStorage.getItem("preferences") && !localStorage.getItem("isFirst"))
    return (
      <>
        <ChatGroup who="chet" groupKey="preferences1">
          <p>여행 스타일은 그대로 할거야?</p>
          <p>현재 스타일: {getStyleDescriptions()}</p>
        </ChatGroup>
        <ChatGroup who="user" groupKey="preferences2">
          <>
            <Button design="secondary" onClick={resetStyle}>
              새로 고르기
            </Button>
            <Button
              design="secondary"
              onClick={() => {
                if (step !== 4) return;
                next();
              }}
            >
              그대로
            </Button>
          </>
        </ChatGroup>
      </>
    );

  return (
    <>
      <ChatGroup who="chet" groupKey="preferences3">
        <p>그렇구나! 이번 여행의 스타일을 알려줘!</p>
      </ChatGroup>
      <ChatGroup who="user" groupKey="preferences4">
        <Button
          design="secondary"
          onClick={() => {
            if (step !== 4) return;
            navigate({ to: "/style" });
            localStorage.setItem("isFirst", "true");
          }}
        >
          스타일 고르러 가기
        </Button>
      </ChatGroup>
    </>
  );
});

export default Preferences;
