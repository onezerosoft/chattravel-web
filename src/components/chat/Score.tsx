import styled from "styled-components";
import { ChetSVG } from "../../assets";
import useGetCurrentScore from "../../hooks/useGetCurrentScore";

const Score = () => {
  const { data: score, status } = useGetCurrentScore();

  if (status == "error" || status == "pending") return;

  return (
    <Wrapper>
      <ChetSVG width={50} height={50} />
      <BarWrapper>
        <Bar $score={50} />
      </BarWrapper>
      <p>
        현재 챗트의 똑똑지수 <br />
        <span>{score}˚</span>
      </p>
    </Wrapper>
  );
};

export default Score;

const Wrapper = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  right: 70px;
  top: 80px;
  align-items: center;

  & > p {
    text-align: center;
    font-size: 12px;
    font-weight: 550;
    margin-top: 10px;

    & > span {
      font-size: 18px;
    }
  }
`;

const BarWrapper = styled.div`
  width: 10px;
  height: 120px;

  background-color: #eee;
  border-radius: 5px;
  display: flex;
  justify-content: center;

  position: relative;
`;

const Bar = styled.div<{ $score: number }>`
  width: 7px;
  height: ${({ $score }) => $score}%;

  background: linear-gradient(to bottom, #deff97, #899952);

  align-self: flex-end;
  border-radius: 0 0 5px 5px;
`;
