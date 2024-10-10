import { useState } from "react";
import { HatePhotoWEBP, LikePhotoWEBP } from "../../assets";
import Button from "../common/Button";
import { FunnelProps } from "../common/Funnel";
import StyleSlide from "./StyleSlide";
import styled from "styled-components";
import { useTravelStore, TravelStore } from "../../stores/useTravelStore";

const 사진 = ({ onNext, onPrev }: FunnelProps) => {
  const preferences = useTravelStore((state) => state.preferences);
  const [preference, setPreference] = useState(preferences[3]);

  const updatePreferences = useTravelStore(
    (state: TravelStore) => state.updatePreferences
  );

  const changePreference = (newPreference: number) => () => {
    setPreference(newPreference);
  };

  const savePreferences = () => {
    const newPreferences = [...preferences];
    newPreferences[3] = preference;
    updatePreferences(newPreferences);
  };

  return (
    <>
      <StyleSlide
        title="사진촬영 중요 vs 안 중요"
        preference={preference}
        images={[LikePhotoWEBP, HatePhotoWEBP]}
        descriptions={["포토스팟을 원해요", "사진에 관심없어요"]}
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

export default 사진;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  position: fixed;
  bottom: 7%;
  width: 40%;
  right: 30%;
`;
