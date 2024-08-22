import styled from "styled-components";
import { MapSVG } from "../../assets";

type region = "capital";

const Map = () => {
  return (
    <Wrapper hoveredRegion="capital">
      <MapSVG />
    </Wrapper>
  );
};

const Wrapper = styled.div<{ hoveredRegion: region }>`
  & > svg {
    width: 100%;
    cursor: pointer;

    & > path {
      transform-origin: right bottom;
      transition: transform 0.2s ease;

      &:hover {
        transform: scale(1.02);
        border: 1px solid red;
      }
    }
  }
`;
export default Map;
