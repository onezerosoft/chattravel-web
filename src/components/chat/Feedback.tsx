import styled from "styled-components";
import { ThumbsUpSVG, ThumbsDownSVG } from "../../assets";

interface FeedbackProps {
  like: boolean;
  hate: boolean;
  handleClickThumbs: (thumb: "like" | "hate") => () => void;
}

const Feedback = ({ like, hate, handleClickThumbs }: FeedbackProps) => {
  return (
    <>
      <IconsContainer like={like} hate={hate}>
        <ThumbsUpSVG width={25} onClick={handleClickThumbs("like")} />
        <ThumbsDownSVG width={25} onClick={handleClickThumbs("hate")} />
        <LikeDescription>답변이 맘에 들면 클릭!</LikeDescription>
        <HateDescription>답변이 맘에 들지 않으면 클릭!</HateDescription>
      </IconsContainer>
    </>
  );
};

export default Feedback;

const LikeDescription = styled.p`
  opacity: 0;
  transition: opacity 0.3s;
  position: absolute;
  top: -20px;
  left: -45px;

  background-color: #c8e8ff;
  border-radius: 5px;
  white-space: nowrap;
  font-size: 12px;
  padding: 5px;
`;

const HateDescription = styled.p`
  opacity: 0;
  transition: opacity 0.3s;
  position: absolute;
  top: -20px;
  left: -30px;

  background-color: #ffc8f4;
  border-radius: 5px;
  white-space: nowrap;
  font-size: 12px;
  padding: 5px;
`;

const IconsContainer = styled.div<{ like: boolean; hate: boolean }>`
  display: flex;
  gap: 5px;
  position: relative;

  & > svg {
    cursor: pointer;
    fill: #0f0f0f;

    & > path {
      stroke: #484848;
    }

    &:nth-of-type(1) {
      fill: ${({ like }) => (like ? "#222" : "none")};

      &:hover ~ ${LikeDescription} {
        opacity: 1;
      }
    }
    &:nth-of-type(2) {
      fill: ${({ hate }) => (hate ? "#222" : "none")};

      &:hover ~ ${HateDescription} {
        opacity: 1;
      }
    }

    &:hover {
      transform: scale(1.02);
    }
  }
`;
