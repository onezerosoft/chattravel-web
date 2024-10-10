import { useState } from "react";
import { ExpensiveWEBP, CheapWEBP } from "../../assets";
import Button from "../common/Button";
import { FunnelProps } from "../common/Funnel";
import StyleSlide from "./StyleSlide";
import styled from "styled-components";
import { useTravelStore, TravelStore } from "../../stores";

const 숙박 = ({ onNext, onPrev }: FunnelProps) => {
  const preferences = useTravelStore((state) => state.preferences);
  const updatePreferences = useTravelStore(
    (state: TravelStore) => state.updatePreferences
  );

  const [preference, setPreference] = useState(preferences[2]);

  const changePreference = (newPreference: number) => () => {
    setPreference(newPreference);
  };

  const savePreferences = () => {
    const newPreferences = [...preferences];
    newPreferences[2] = preference;
    updatePreferences(newPreferences);
  };

  return (
    <>
      <StyleSlide
        title="럭셔리숙소 vs 가성비숙소"
        preference={preference}
        images={[ExpensiveWEBP, CheapWEBP]}
        descriptions={["호캉스가 좋아요", "잠만 자도 괜찮아요"]}
        onChange={changePreference}
      />
      <ButtonWrapper>
        <Button onClick={onPrev}>이전</Button>
        <Button
          onClick={() => {
            savePreferences();
            onNext();
          }}
        >
          다음
        </Button>
      </ButtonWrapper>
    </>
  );
};

export default 숙박;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  position: fixed;
  bottom: 7%;
  width: 40%;
  right: 30%;
`;
