import { createFileRoute, Link, useLoaderData } from "@tanstack/react-router";
import Badge from "../components/common/Badge";
import styled from "styled-components";
import Button from "../components/common/Button";
import { getTourPhotos } from "../apis/get";
import { TourApiResponse } from "../types";
import Slider from "react-slick";

export const Route = createFileRoute("/")({
  loader: getTourPhotos,
  shouldReload: false,
  component: Home,
});

interface ItemType {
  galTitle: string;
  galWebImageUrl: string;
}

interface GalleryItemsType {
  items: {
    item: ItemType[];
  };
}

function Home() {
  const sliderSettings = {
    infinite: true,
    speed: 400,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2200,
    cssEase: "linear",
  };

  const galleryItems = useLoaderData({
    from: "/",
    // FIXME
    select: (data: TourApiResponse<GalleryItemsType>) =>
      data.response.body.items.item,
  });

  return (
    <Wrapper>
      <Badge text="Welcome to Chattravel!" />
      <h1>
        국내여행을 떠나는 당신만을 위한 <br />
        맞춤형 여행코스를 받아보세요.
      </h1>
      <p>
        국내여행 코스 추천 챗봇 서비스 AI를 기반으로 당신의 성별, 연령대,
        여행스타일에 맞는 최적의 맞춤 여행코스를 짜요.
        <br /> AI를 기반으로 당신의 성별, 연령대, 여행스타일에 맞는 최적의 맞춤
        여행코스를 짜요.
        <br /> 기반으로 당신의 성별, 연령대, 여행스타일에 맞는 최적의 맞춤
        여행코스를 짜요.
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
        <Slider {...sliderSettings}>
          {galleryItems.map((item) => (
            <GalleryItem>
              <p>#{item.galTitle}</p>
              <img src={item.galWebImageUrl} />
            </GalleryItem>
          ))}
        </Slider>
      </SliderWrapper>
      <footer>기업: 공일즈</footer>
    </Wrapper>
  );
}

const GalleryItem = styled.div`
  & > p {
    width: 100%;
    text-align: left;
    height: 16px;
    margin-left: 20px;
    font-weight: 600;
  }
  & > img {
    border-radius: 30px;
    width: 100%;
    height: 100%;
  }
`;

const SliderWrapper = styled.div`
  margin: 50px;
  width: 80%;
  height: 50%;
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
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
  gap: 15px;
`;

export default Home;
