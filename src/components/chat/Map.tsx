import styled from "styled-components";
import { PinSVG } from "../../assets";
import { useEffect, useRef, useState } from "react";
import { REGION_MAP } from "../../constants";
import { Region } from "../../types/domain";
import { isRegionType } from "../../utils";

interface MapProps {
  handleClick: (event: React.SyntheticEvent<SVGPathElement>) => void;
}

const Map = ({ handleClick }: MapProps) => {
  const [hoveredRegion, setHoveredRegion] = useState<Region | null>(null);

  const handleMouseOver = (event: React.SyntheticEvent<SVGPathElement>) => {
    if (isRegionType(event.currentTarget.id)) {
      setHoveredRegion(event.currentTarget.id);
    }
  };

  const handleMouseLeave = () => {
    setHoveredRegion(null);
  };

  return (
    <Wrapper>
      <MapSVG
        handleClick={handleClick}
        handleMouseOver={handleMouseOver}
        handleMouseLeave={handleMouseLeave}
      />
      <PinFollowingCursor region={hoveredRegion} />
    </Wrapper>
  );
};

export default Map;

interface PinFollowingCursorProps {
  region: Region | null;
}

const PinFollowingCursor = ({ region }: PinFollowingCursorProps) => {
  const cursorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${event.clientX - 590}px, ${event.clientY - 690}px)`;
        cursorRef.current.style.display = "flex";
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  if (!region) return <></>;

  return (
    <PinWrapper ref={cursorRef} className="pin">
      <span>{REGION_MAP[region]}</span>
      <PinSVG width="20px" height="20px" />
    </PinWrapper>
  );
};

interface MapSvgProps {
  handleClick: (event: React.SyntheticEvent<SVGPathElement>) => void;
  handleMouseOver: (event: React.SyntheticEvent<SVGPathElement>) => void;
  handleMouseLeave: () => void;
}

const MapSVG = ({
  handleClick,
  handleMouseOver,
  handleMouseLeave,
}: MapSvgProps) => (
  <svg
    width="229"
    height="405"
    viewBox="0 0 229 405"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      id="capital"
      onClick={handleClick}
      onMouseOver={handleMouseOver}
      onMouseLeave={handleMouseLeave}
      d="M68.0386 39.045L47.1654 35.4249V57.7917L44.4399 81.1929L59.4633 110.864L100.146 116.101L130.658 93.7338L142.424 69.7509L130.658 47.3841L107.591 14.0924L85.6546 25.0172L68.0386 39.045Z"
      fill="#ff6060"
    />
    <path
      id="gangwon"
      onClick={handleClick}
      onMouseOver={handleMouseOver}
      onMouseLeave={handleMouseLeave}
      d="M139.167 20.8154L107.591 14.0924L130.658 47.3841L142.424 69.7509L130.658 93.7338L173.468 102.525H200.191V86.9462V51.5213L193.81 25.0172L180.382 0L166.488 14.0924L139.167 20.8154Z"
      fill="#f8ca49"
    />
    <path
      id="gyeongsangbuk"
      onClick={handleClick}
      onMouseOver={handleMouseOver}
      onMouseLeave={handleMouseLeave}
      d="M200.191 102.525H173.468L153.659 129.611L142.424 161.869L139.167 184.3L151 209.253L166.488 209.77L176.659 218.626L200.191 223.28L218.406 233.688V218.626L228.045 179.581L224.322 143.122L210.894 116.101L200.191 102.525Z"
      fill="#f89a52"
    />
    <path
      id="gyeongsangnam"
      onClick={handleClick}
      onMouseOver={handleMouseOver}
      onMouseLeave={handleMouseLeave}
      d="M218.406 233.688L200.191 223.28L176.659 218.626L166.488 209.77L151 209.253L135.046 237.373L116.167 279L121 302.5L100.146 323.285L180.382 312.748L205.111 292.514L218.406 274.672V233.688Z"
      fill="#f35e5e"
    />
    <path
      id="chungcheongbuk"
      onClick={handleClick}
      onMouseOver={handleMouseOver}
      onMouseLeave={handleMouseLeave}
      d="M173.468 102.525L130.658 93.7338L100.146 116.101L107.591 133.813L119.424 152.495L111.38 167.622L116.167 187.403L139.167 184.3L142.424 161.869L153.659 129.611L173.468 102.525Z"
      fill="#92f55c"
    />
    <path
      id="chungcheongnam"
      onClick={handleClick}
      onMouseOver={handleMouseOver}
      onMouseLeave={handleMouseLeave}
      d="M100.146 116.101L59.4633 110.864L44.4399 122.306L28.4194 143.122L44.4399 164.519L39.6537 179.581L62.6541 195.742L81.9319 184.3L116.167 187.403L111.38 167.622L119.424 152.495L107.591 133.813L100.146 116.101Z"
      fill="#ff67ca"
    />
    <path
      id="jeollabuk"
      onClick={handleClick}
      onMouseOver={handleMouseOver}
      onMouseLeave={handleMouseLeave}
      d="M81.9319 184.3L62.6541 195.742L47.1654 218.626L28.4194 233.688L62.6541 249.526L81.9319 238.213L111.38 249.526L135.046 237.373L151 209.253L139.167 184.3L116.167 187.403L81.9319 184.3Z"
      fill="#58edfa"
    />
    <path
      id="jeollanam"
      onClick={handleClick}
      onMouseOver={handleMouseOver}
      onMouseLeave={handleMouseLeave}
      d="M62.6541 249.526L28.4194 233.688L11.6676 256.831V286.825L0.0344419 312.748L11.6676 337.054L68.0386 342.742L100.146 323.285L121 302.5L116.167 279L135.046 237.373L111.38 249.526L81.9319 238.213L62.6541 249.526Z"
      fill="#da61fc"
    />
    <path
      id="jeju"
      onClick={handleClick}
      onMouseOver={handleMouseOver}
      onMouseLeave={handleMouseLeave}
      d="M4.48802 367.823L0.0341797 392L33.7371 404.088L58.2 392L50.6883 367.823H4.48802Z"
      fill="#5688f5"
    />
  </svg>
);

const PinWrapper = styled.div`
  display: none;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  position: absolute;
  pointer-events: none;
  gap: 5px;

  transition: transform 0.1s ease;

  & > span {
    color: black;
  }
`;

const Wrapper = styled.div`
  background-color: #f5f5f5;
  border-radius: 20px;

  padding: 10px 15px;
  font-weight: 500;
  width: max-content;
  margin-left: 115px;
  margin-top: -15px;

  max-width: 450px;

  & > svg {
    width: 100%;
    cursor: pointer;

    & > path {
      transform-origin: right bottom;
      transition: transform 0.2s ease;
      opacity: 20%;

      &:hover {
        transform: scale(1.02);
        opacity: 100%;
      }
    }
  }
`;
