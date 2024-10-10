import styled from "styled-components";
import { ChetSVG } from "../../assets";
import LoadingDots from "../common/LoadingDots";

const LoadingChet = () => {
  return (
    <Wrapper>
      <ChetSVG height={100} />
      <ChatBox>
        <LoadingDots />
      </ChatBox>
    </Wrapper>
  );
};

export default LoadingChet;

const Wrapper = styled.li`
  display: flex;
`;

const ChatBox = styled.div`
  gap: 10px;
  margin-top: 25px;
`;
