import styled from "styled-components";
import { Document, Place } from "../../types/domain";
import { PlaceInfo } from "./TravelCourse";

interface PlaceProps {
  place: Place;
  urls: Document;
  placeNumber: number;
}

const TravelPlace = ({ place, urls, placeNumber }: PlaceProps) => {
  const getDayPart = () => {
    switch (placeNumber) {
      case 1:
        return "오전";
      case 3:
        return "오후";
      case 5:
        return "저녁";
      default:
        return "";
    }
  };

  return (
    <a href={urls.doc_url} target="_blank">
      <Wrapper>
        <PlaceComment>{place.comment}</PlaceComment>
        <PlaceName>{getDayPart()} 여행지 📸</PlaceName>
        <PlaceNumber>{placeNumber}</PlaceNumber>
        <img src={urls.thumbnail_url} />
        <PlaceInfo>
          <h5>{place.placeName}</h5>
          <p>
            {place.address
              ? place.address.split(" ").slice(0, 2).join(" ")
              : place.address}
          </p>
        </PlaceInfo>
      </Wrapper>
    </a>
  );
};

export default TravelPlace;

const PlaceComment = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 40px;
  left: 10px;
  visibility: hidden;
  width: 160px;
  font-size: 14px;
  font-weight: 600;
  padding: 0 10px;
`;

const Wrapper = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  height: fit-content;
  border-radius: 20px;

  & > img {
    margin-top: 20px;
    border-radius: 20px 20px 0 0;
    width: 200px;
    height: 200px;
    object-fit: cover;
    transition: opacity 0.3s;
  }

  &:hover {
    & > img {
      opacity: 0.2;
    }

    & > p {
      opacity: 0.3;
    }

    & > div {
      visibility: visible;
      color: #222;
    }
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
  top: -65px;

  font-weight: 700;
  font-size: 16px;
`;
