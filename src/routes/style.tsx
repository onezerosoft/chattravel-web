import { createFileRoute } from "@tanstack/react-router";
import styled from "styled-components";
import PageTemplate from "../components/common/PageTemplate";
import StyleSlide from "../components/style/StyleSlide";
import { useState } from "react";
import Slider from "react-slick";
import { ArrowSVG, CityJPG, NatureJPG } from "../assets";

export const Route = createFileRoute("/style")({
  // loader: fetchPosts,
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
  ["자연 속에서 힐링하고 싶어요", "휘향찬란한 도심 속이 좋아요"],
  ["자연 속에서 힐링하고 싶어요", "휘향찬란한 도심이 좋아요"],
  ["자연 속에서 힐링하고 싶어요", "휘향찬란한 도심이 좋아요"],
  ["자연 속에서 힐링하고 싶어요", "휘향찬란한 도심이 좋아요"],
];

function Style() {
  const [preferences, setPreferences] = useState([0, 0, 0, 0]);
  const [slideIndex, setSlideIndex] = useState(0);

  const sliderSettings = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    cssEase: "linear",
    arrows: true,
    nextArrow: <ArrowSVG />,
    afterChange: (index: number) => setSlideIndex(index),
  };

  const changePreference = (newPreference: number) => () => {
    preferences[slideIndex] = newPreference;
    setPreferences([...preferences]);
  };

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
      </SliderWrapper>
    </PageTemplate>
  );
}

export default Style;

const SliderWrapper = styled.div`
  margin-left: auto;
  margin-right: auto;
  margin-top: 60px;

  width: 60%;
  height: 50%;
`;
