import { createFileRoute } from "@tanstack/react-router";
import Badge from "../components/Badge";
import styled from "styled-components";
import Button from "../components/Button";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
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
        <Button>채팅 시작하기</Button>
        <Button type="secondary">스타일 등록하기</Button>
      </ButtonsContainer>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
  padding: 90px 10px 0 10px;
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
