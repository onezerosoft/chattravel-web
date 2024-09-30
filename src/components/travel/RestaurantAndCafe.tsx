import styled from "styled-components";
import type { Document, Place } from "../../types/domain";
import { PlaceInfo } from "./TravelCourse";

interface RestaurantAndCafeProps {
  restaurant: Place;
  cafe: Place;
  restaurantUrls: Document;
  cafeUrls: Document;
  placeNumber: number;
}

const RestaurantAndCafe = ({
  restaurant,
  cafe,
  restaurantUrls,
  cafeUrls,
  placeNumber,
}: RestaurantAndCafeProps) => {
  return (
    <a href={restaurantUrls.doc_url} target="_blank">
      <Wrapper>
        <PlaceComment>{restaurant.comment}</PlaceComment>
        <PlaceName>금강산도 식후경 🍱 ☕️</PlaceName>
        <PlaceNumber>{placeNumber}</PlaceNumber>
        <RestaurantAndCafeImage>
          <img src={restaurantUrls.thumbnail_url} />
          <img src={cafeUrls.thumbnail_url} />
        </RestaurantAndCafeImage>
        <PlaceInfo>
          <h5>
            {restaurant.placeName}, <br />
            {cafe.placeName}
          </h5>
          <p>
            {restaurant.address
              ? restaurant.address.split(" ").slice(0, 2).join(" ")
              : restaurant.address}
          </p>
        </PlaceInfo>
      </Wrapper>
    </a>
  );
};

export default RestaurantAndCafe;

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
  transition: visibility 0.3s;
`;

const Wrapper = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;

  &:hover {
    & > div > img {
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

const RestaurantAndCafeImage = styled.div`
  display: flex;

  & > img:nth-of-type(1) {
    margin-top: 20px;
    width: 100px;
    height: 200px;
    border-radius: 20px 0 0 0;
    object-fit: cover;
    transition: opacity 0.3s;
  }

  & > img:nth-of-type(2) {
    margin-top: 20px;
    width: 100px;
    height: 200px;
    border-radius: 0 20px 0 0;
    object-fit: cover;
    transition: opacity 0.3s;
  }
`;
