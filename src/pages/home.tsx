import Badge from "../components/common/Badge";
import styled from "styled-components";
import Button from "../components/common/Button";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import useGetGalleryItems from "../hooks/useGetGalleryItems";
import { ChatPageWebp, TravelPageWebp } from "../assets";

const sliderSettings = {
  infinite: true,
  speed: 400,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2200,
  cssEase: "linear",
};

const Home = () => {
  const { data: galleryItems, status } = useGetGalleryItems();

  if (status == "pending" || !galleryItems)
    return (
      <Wrapper>
        <Badge text="Welcome to Chattravel!" />
        <h1>
          당신만을 위한 국내여행코스를 <br />단 1분만에 받아보세요
        </h1>
        <p>
          AI로 개인의 여행스타일에 맞는 최적의 맞춤 여행코스를 짜요.
          <br /> 지역, 기간, 여행 스타일만 입력하고 챗봇과 함께 대화하며
          간편하게 여행코스를 완성시키세요.
        </p>
        <ButtonsContainer>
          <Button>
            <Link to={"/chat"}>채팅 시작하기</Link>
          </Button>
          <Button design="secondary">
            <Link to={"/style"}>스타일 등록하기</Link>
          </Button>
        </ButtonsContainer>
        <ServiceIntroductions>
          <img src={ChatPageWebp} />
          <h2>채팅으로 간편하게</h2>
          <h2>완성된 코스는 친구에게 공유해보세요</h2>
          <img src={TravelPageWebp} />
        </ServiceIntroductions>
      </Wrapper>
    );

  return (
    <Wrapper>
      <Badge text="Welcome to Chattravel!" />
      <h1>
        당신만을 위한 국내여행코스를 <br />단 1분만에 받아보세요
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
      <ServiceIntroductions>
        <div>
          <img src={ChatPageWebp} />
          <h2>
            챗트에게 물어봐! <p>간편하게 여행을 떠나요</p>
          </h2>
        </div>
        <div>
          <h2>
            나만의 여행 계획 뚝딱 <p>링크로 친구에게 공유해보세요</p>
          </h2>
          <img src={TravelPageWebp} />
        </div>
      </ServiceIntroductions>
      <SliderWrapper>
        <h3>국내에 숨은 여행지를 발굴해보세요</h3>
        <Slider {...sliderSettings}>
          {galleryItems.map((item) => (
            <GalleryItem key={item.galContentId}>
              <p>#{item.galTitle}</p>
              <img src={item.galWebImageUrl} />
            </GalleryItem>
          ))}
        </Slider>
      </SliderWrapper>
      <Footer>
        <span>CONTACT 📨 kym6050@hanyang.ac.kr</span>
        <span>COPYRIGHT © 2024 ONEZEROSOFT ALL RIGHTS RESERVED</span>
      </Footer>
    </Wrapper>
  );
};

const Footer = styled.footer`
  height: 150px;
  width: 100vw;
  background-color: #eaeaea;
  display: flex;
  flex-direction: column;
  align-items: end;
  justify-content: end;
  padding: 10px 40px;
  box-sizing: border-box;
  color: #888;
  margin-top: 40px;
  & > span {
    font-size: 12px;
    font-weight: 500;
  }
`;

const ServiceIntroductions = styled.article`
  display: flex;
  flex-direction: column;

  width: 65vw;
  padding: 20px 50px;

  & > div {
    display: flex;
    justify-content: space-between;
    gap: 5%;
    margin-top: 12%;
  }

  & > div > img {
    width: 600px;
    box-shadow: 4px 4px 8px 1px rgb(0 0 0 / 12%);
    border-radius: 10px;
  }

  & > div > h2 {
    align-self: center;
    font-size: 32px;
    width: 100%;

    & > p {
      font-size: 18px;
      font-weight: 500;
      color: #474747;
      margin-top: 10px;
    }
  }
`;

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
  margin: 50px 0;
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
