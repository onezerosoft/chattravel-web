import { useState } from "react";
import { HateTrackingJPG, LikeTrackingJPG } from "../../assets";
import Button from "../common/Button";
import { FunnelProps } from "../common/Funnel";
import StyleSlide from "./StyleSlide";
import styled from "styled-components";
import { useTravelStore, TravelStore } from "../../stores";

const 트래킹 = ({ onNext, onPrev }: FunnelProps) => {
  const [preference, setPreference] = useState(0);

  const preferences = useTravelStore((state: TravelStore) => state.preferences);
  const setLikeTracking = useTravelStore((state) => state.setLikeTracking);

  const changePreference = (newPreference: number) => () => {
    setPreference(newPreference);
  };

  const savePreferences = () => {
    if (
      !preferences.every((preference) => preference != 0) ||
      preference == 0
    ) {
      alert("선택하지 않은 슬라이드가 있어요!");
      return;
    }

    if (preference <= 3) setLikeTracking("Y");
    else setLikeTracking("N");

    localStorage.setItem("lastMessageId", "course");
    onNext();
  };

  return (
    <>
      <StyleSlide
        title="트래킹 선호 VS 선호하지 않음"
        preference={preference}
        images={[LikeTrackingJPG, HateTrackingJPG]}
        descriptions={[
          "걷기나 자전거로 \n트래킹하는 코스도 원해요",
          "트래킹을 선호하지 않고 \n 차로만 이동해요",
        ]}
        onChange={changePreference}
      />
      <ButtonWrapper>
        <Button onClick={onPrev}>이전</Button>
        <Button onClick={savePreferences}>다음</Button>
      </ButtonWrapper>
    </>
  );
};

export default 트래킹;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  position: fixed;
  bottom: 7%;
  width: 40%;
  right: 30%;
`;
