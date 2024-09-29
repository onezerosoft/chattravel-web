import styled from "styled-components";
import { Document, Place } from "../../types/domain";

interface PlaceProps {
  place: Place;
  urls: Document;
  placeNumber: number;
}

const TravelPlace = ({ place, urls, placeNumber }: PlaceProps) => {
  return (
    <Wrapper>
      <PlaceName>
        <a href={urls.doc_url} target="_blank">
          📸 {place.placeName}
        </a>
      </PlaceName>
      <PlaceNumber>{placeNumber}</PlaceNumber>
      <img src={urls.thumbnail_url} />
    </Wrapper>
  );
};

export default TravelPlace;

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
  background-color: #a455e4;
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
