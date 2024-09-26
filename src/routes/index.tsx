import { createFileRoute, Link, useLoaderData } from "@tanstack/react-router";
import Badge from "../components/common/Badge";
import styled from "styled-components";
import Button from "../components/common/Button";
import { getTourPhotos } from "../apis/get";
import Slider from "react-slick";
import { TourApiResponse } from "../types/api";
import { GalleryItems } from "../types/domain";

export const Route = createFileRoute("/")({
  loader: getTourPhotos,
  shouldReload: false,
  component: Home,
});

function Home() {
  const sliderSettings = {
    infinite: true,
    speed: 400,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2200,
    cssEase: "linear",
  };

  const galleryItems = useLoaderData({
    from: "/",
    // FIXME
    select: (data: TourApiResponse<GalleryItems>) =>
      data.response.body.items.item,
  });

  return (
    <Wrapper>
      <Badge text="Welcome to Chattravel!" />
      <h1>
        당신만을 위한 국내여행코스를 <br />단 10초만에 받아보세요
      </h1>
      <p>
        AI로 개인의 여행스타일에 맞는 최적의 맞춤 여행코스를 짜요.
        <br /> 지역, 기간, 여행 스타일만 입력하고 챗봇과 함께 대화하며 간편하게
        여행코스를 완성시키세요.
      </p>
      <ButtonsContainer>
        <Button>
          <Link to={"/chat"}>채팅 시작하기</Link>
        </Button>
        <Button design="secondary">
          <Link to={"/style"}>스타일 등록하기</Link>
        </Button>
      </ButtonsContainer>
      <SliderWrapper>
        <h3>국내에 숨은 여행지를 발굴해보세요</h3>
        <Slider {...sliderSettings}>
          {galleryItems.map((item) => (
            <GalleryItem>
              <p>#{item.galTitle}</p>
              <img src={item.galWebImageUrl} />
            </GalleryItem>
          ))}
        </Slider>
      </SliderWrapper>
      <footer></footer>
    </Wrapper>
  );
}

const GalleryItem = styled.div`
  margin-left: 20px;
  & > p {
    width: 100%;
    text-align: left;
    height: 16px;
    margin-left: 15px;
    margin-bottom: 10px;
    font-weight: 600;
  }

  & > img {
    border-radius: 30px;
    width: 370px;
    height: 300px;
    object-fit: cover;
  }
`;

const SliderWrapper = styled.div`
  margin: 100px 0;
  width: 80%;
  height: 50%;

  & > h3 {
    font-size: 32px;
    margin: 40px 5px;
  }
`;

const Wrapper = styled.div`
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
  padding: 140px 10px 0 10px;
  align-items: center;
  text-align: center;

  & > h1 {
    font-weight: 800;
    margin: 40px 0 10px 0;
  }
  & > p {
    font-size: 14px;
    color: #717171;
    margin-bottom: 40px;
    margin-top: 10px;
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
  gap: 15px;
`;

export default Home;
