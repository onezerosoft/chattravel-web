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
  background-color: #f5f5f5;
  border-radius: 20px;
  padding: 10px 15px;
  font-weight: 500;
  text-align: start;
  width: fit-content;
  height: fit-content;
  gap: 10px;
  margin-top: 25px;
`;
