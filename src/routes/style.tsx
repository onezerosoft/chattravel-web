import { createFileRoute, Link } from "@tanstack/react-router";
import styled from "styled-components";
import PageTemplate from "../components/common/PageTemplate";
import StyleSlide from "../components/style/StyleSlide";
import { useState } from "react";
import Slider from "react-slick";
import Button from "../components/common/Button";
import { TITLES, IMAGES, DESCRIPTIONS } from "../constants";

export const Route = createFileRoute("/style")({
  component: Style,
});

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
              preference={preferences[index]}
              images={IMAGES[index]}
              descriptions={DESCRIPTIONS[index]}
              changeHandler={changePreference}
            />
          ))}
        </Slider>
        <ButtonWrapper>
          {isDone() && (
            <Button>
              <Link to={"/chat"}>스타일 저장하기</Link>
            </Button>
          )}
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
