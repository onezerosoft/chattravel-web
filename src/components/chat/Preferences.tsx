import Button from "../common/Button";
import ChatGroup from "./ChatGroup";
import { useChatStore, useTravelStore } from "../../stores";
import { memo } from "react";
import { useNavigate } from "react-router";
import { PREFERENCE_DESCRIPTIONS_MAP, STYLE_CATEGORIES } from "../../constants";

const Preferences = memo(() => {
  const navigate = useNavigate();

  const preferences = useTravelStore((store) => store.preferences);
  const updatePreferences = useTravelStore((store) => store.updatePreferences);

  const step = useChatStore((state) => state.step);
  const next = useChatStore((state) => state.next);

  const resetStyle = () => {
    if (step !== 4) return;
    localStorage.removeItem("preferences");
    updatePreferences([0, 0, 0, 0]);
    navigate("/style");
  };

  const getStyleDescriptions = () => {
    return preferences
      .map((preference, index) => {
        return index <= 2
          ? STYLE_CATEGORIES[index][preference - 1] +
              " " +
              PREFERENCE_DESCRIPTIONS_MAP[preference]
          : STYLE_CATEGORIES[index][preference - 1];
      })
      .join(", ");
  };

  if (localStorage.getItem("preferences") && !localStorage.getItem("isFirst"))
    return (
      <>
        <ChatGroup
          who="chet"
          groupKey="preferences1"
          texts={[
            `여행 스타일은 그대로 할거야?`,
            `현재 스타일: ${getStyleDescriptions()}`,
          ]}
        />
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
      <ChatGroup
        who="chet"
        groupKey="preferences3"
        texts={["그렇구나! 이번 여행의 스타일을 알려줘!"]}
      />
      <ChatGroup who="user" groupKey="preferences4">
        <Button
          design="secondary"
          onClick={() => {
            if (step !== 4) return;
            navigate("/style");
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
