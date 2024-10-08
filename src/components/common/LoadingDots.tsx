import styled, { keyframes } from "styled-components";

const LoadingDots = () => {
  return (
    <Loader>
      <Dot />
      <Dot />
      <Dot />
    </Loader>
  );
};

export default LoadingDots;

const bounce = keyframes`
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-5px);
  }
`;

const Loader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5f5f5;
  border-radius: 20px;
  padding: 10px 15px;
  font-weight: 500;
  text-align: start;
  width: fit-content;
  height: fit-content;
`;

const Dot = styled.div`
  width: 5px;
  height: 5px;
  margin: 7px 3px 5px 3px;
  border-radius: 50%;
  background-color: #4f4f4f;
  animation: ${bounce} 0.6s infinite alternate;

  &:nth-child(1) {
    animation-delay: 0s;
  }

  &:nth-child(2) {
    animation-delay: 0.2s;
  }

  &:nth-child(3) {
    animation-delay: 0.4s;
  }
`;
