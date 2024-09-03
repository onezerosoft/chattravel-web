import { createFileRoute } from "@tanstack/react-router";
import styled from "styled-components";
import PageTemplate from "../components/common/PageTemplate";
import StyleSlide from "../components/style/StyleSlide";
import { useState } from "react";
import Slider from "react-slick";
import { CityJPG, NatureJPG } from "../assets";
import Button from "../components/common/Button";

export const Route = createFileRoute("/style")({
  component: Style,
});

const TITLES = [
  "자연 vs 도시",
  "관광 vs 휴식",
  "편하지만 비싼 숙소 vs 불편하지만 저렴한 숙소",
  "사진촬영 중요 vs 안 중요",
];

const IMAGES = [
  [NatureJPG, CityJPG],
  [NatureJPG, CityJPG],
  [NatureJPG, CityJPG],
  [NatureJPG, CityJPG],
];

const DESCRIPTIONS = [
  ["자연 속에서 힐링하고 싶어요", "시끌벅적한 도심 속이 좋아요"],
  ["관광이 목적이에요", "휴식을 취하러 가요"],
  ["숙소 값은 비싸도 상관없어요", "숙소 값은 쌀수록 좋아요"],
  ["사진 찍는 것에 관심없어요", "포토스팟을 원해요"],
];

function Style() {
  const [preferences, setPreferences] = useState([0, 0, 0, 0]);
  const [slideIndex, setSlideIndex] = useState(0);

  const sliderSettings = {
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    cssEase: "linear",
    afterChange: (index: number) => setSlideIndex(index),
  };

  const changePreference = (newPreference: number) => () => {
    preferences[slideIndex] = newPreference;
    setPreferences([...preferences]);
  };

  const isDone = () => preferences.every((x) => x != 0);

  return (
    <PageTemplate pageName="Style" badgeText="Choose your style!">
      <SliderWrapper>
        <Slider {...sliderSettings}>
          {preferences.map((_, index) => (
            <StyleSlide
              title={TITLES[index]}
              images={IMAGES[index]}
              descriptions={DESCRIPTIONS[index]}
              changeHandler={changePreference}
            />
          ))}
        </Slider>
        <ButtonWrapper>
          {isDone() && <Button>스타일 저장하기</Button>}
        </ButtonWrapper>
      </SliderWrapper>
    </PageTemplate>
  );
}

export default Style;

const ButtonWrapper = styled.div`
  position: absolute;
  right: 0;
  bottom: 30px;
`;

const SliderWrapper = styled.div`
  margin-left: auto;
  margin-right: auto;
  margin-top: 60px;
  position: relative;

  width: 60%;
  height: 50%;
`;
