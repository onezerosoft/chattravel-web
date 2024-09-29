import styled from "styled-components";
import type { Place, Document } from "../../types/domain";

interface AccomodationProps {
  accomodation: Place;
  urls: Document;
}

const Accomodation = ({ accomodation, urls }: AccomodationProps) => {
  return (
    <Wrapper>
      <PlaceName>
        <a href={urls.doc_url} target="_blank">
          🛏 {accomodation.placeName}
        </a>
      </PlaceName>
      <PlaceNumber>{1}</PlaceNumber>
      <img src={urls.thumbnail_url} />
    </Wrapper>
  );
};

export default Accomodation;

const Wrapper = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;

  & > img {
    margin-top: 20px;
    border-radius: 50%;
    width: 200px;
    height: 200px;
    object-fit: cover;
  }
`;

const PlaceNumber = styled.span`
  width: 20px;
  height: 20px;
  position: absolute;
  top: -11px;
  color: white;
  font-size: 12px;
  font-weight: 600;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #55e47e;
`;

const PlaceName = styled.h5`
  position: absolute;
  top: -55px;

  & > span {
    color: gray;
  }

  & > a {
    font-weight: 700;
    font-size: 14px;
  }
`;
