import styled from "styled-components";
import type { Document, Place } from "../../types/domain";

interface CafeProps {
  cafe: Place;
  cafeUrls: Document;
  placeNumber: number;
}

const Cafe = ({ cafe, cafeUrls, placeNumber }: CafeProps) => {
  return (
    <a href={cafe.url} target="_blank">
      <Wrapper>
        <PlaceComment>
          {cafe.placeName == ""
            ? "인근의 카페 정보를 찾지 못했어요. 🥲"
            : cafe.comment}
        </PlaceComment>
        <PlaceName>카페 ☕️</PlaceName>
        <PlaceNumber>{placeNumber}</PlaceNumber>
        <img src={cafeUrls.image_url} referrerPolicy="no-referrer" />
        <PlaceInfo>
          <h5>{cafe.placeName == "" ? "근처 카페" : cafe.placeName}</h5>
          <p>
            {cafe.address
              ? cafe.address.split(" ").slice(0, 2).join(" ")
              : cafe.address}
          </p>
        </PlaceInfo>
      </Wrapper>
    </a>
  );
};

export default Cafe;

const PlaceComment = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 40px;
  left: 10px;
  visibility: hidden;
  width: 110px;
  font-size: 14px;
  font-weight: 600;
  padding: 0 5px;
  transition: visibility 0.3s;
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
    width: 140px;
    height: 140px;
    object-fit: cover;
    transition: opacity 0.3s;
  }

  &:hover {
    & > img {
      opacity: 0.2;
    }

    & > div > p {
      opacity: 0.3;
    }

    & > div {
      visibility: visible;
      color: #222;
    }
  }
`;

const PlaceName = styled.h5`
  position: absolute;
  top: -65px;

  & > span {
    color: gray;
  }

  font-weight: 700;
  font-size: 16px;
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

  background-color: #ff6f93;
`;

const PlaceInfo = styled.p`
  transition: opacity 0.3s;
  background-color: white;
  width: 140px;
  height: 60px;
  padding: 5px 10px;
  box-sizing: border-box;
  border-radius: 0 0 20px 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 4px 4px 8px 1px rgb(0 0 0 / 12%);

  & > h5 {
    font-size: 14px;
    margin: 0;
    margin-bottom: 5px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  & > p {
    color: gray;
    font-size: 10px;
    text-align: end;
    width: 100%;
    align-self: end;
  }
`;
