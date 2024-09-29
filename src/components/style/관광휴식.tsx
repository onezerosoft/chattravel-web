import { useState } from "react";
import StyleSlide from "./StyleSlide";
import { ResortJPG, TourJPG } from "../../assets";
import { FunnelProps } from "../common/Funnel";
import Button from "../common/Button";
import styled from "styled-components";
import { useTravelStore, TravelStore } from "../../stores";

const 관광휴식 = ({ onNext, onPrev }: FunnelProps) => {
  const preferences = useTravelStore((state) => state.preferences);
  const updatePreferences = useTravelStore(
    (state: TravelStore) => state.updatePreferences
  );

  const [preference, setPreference] = useState(preferences[1]);

  const changePreference = (newPreference: number) => () => {
    setPreference(newPreference);
  };

  const savePreferences = () => {
    const newPreferences = [...preferences];
    newPreferences[1] = preference;

    updatePreferences(newPreferences);
  };

  return (
    <>
      <StyleSlide
        title="관광 vs 휴식"
        preference={preference}
        images={[TourJPG, ResortJPG]}
        descriptions={["관광이 목적이에요", "휴식을 취하러 가요"]}
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

export default 관광휴식;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  position: fixed;
  bottom: 7%;
  width: 40%;
  right: 30%;
`;
