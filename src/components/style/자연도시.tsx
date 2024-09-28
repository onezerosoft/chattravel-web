import { useState } from "react";
import StyleSlide from "./StyleSlide";
import { CityJPG, NatureJPG } from "../../assets";
import { FunnelProps } from "../common/Funnel";
import Button from "../common/Button";
import { useTravelStore, TravelStore } from "../../stores";
import styled from "styled-components";

const 자연도시 = ({ onNext }: FunnelProps) => {
  const preferences = useTravelStore((state) => state.preferences);
  const [preference, setPreference] = useState(preferences[0]);

  const updatePreferences = useTravelStore(
    (state: TravelStore) => state.updatePreferences
  );

  const changePreference = (newPreference: number) => () => {
    setPreference(newPreference);
  };

  const savePreferences = () => {
    const newPreferences = [...preferences];
    newPreferences[0] = preference;
    updatePreferences(newPreferences);
  };

  return (
    <>
      <StyleSlide
        title="자연 vs 도시"
        preference={preference}
        images={[NatureJPG, CityJPG]}
        descriptions={[
          "자연 속에서 힐링하고 싶어요",
          "시끌벅적한 도심 속이 좋아요",
        ]}
        onChange={changePreference}
      />
      <ButtonWrapper>
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

export default 자연도시;

const ButtonWrapper = styled.div`
  position: fixed;
  bottom: 10%;
  right: 30%;
`;
