import styled from "styled-components";
import { ThumbsUpSVG, ThumbsDownSVG } from "../../assets";

interface FeedbackProps {
  like: boolean;
  hate: boolean;
  handleClickThumbs: (thumb: "like" | "hate") => () => void;
}

const Feedback = ({ like, hate, handleClickThumbs }: FeedbackProps) => {
  return (
    <IconsContainer like={like} hate={hate}>
      <ThumbsUpSVG width={25} onClick={handleClickThumbs("like")} />
      <ThumbsDownSVG width={25} onClick={handleClickThumbs("hate")} />
    </IconsContainer>
  );
};

export default Feedback;

const IconsContainer = styled.div<{ like: boolean; hate: boolean }>`
  display: flex;
  gap: 5px;

  & > svg {
    cursor: pointer;
    fill: #0f0f0f;

    & > path {
      stroke: #484848;
    }

    &:nth-of-type(1) {
      fill: ${({ like }) => (like ? "#222" : "none")};
    }
    &:nth-of-type(2) {
      fill: ${({ hate }) => (hate ? "#222" : "none")};
    }
  }
`;
