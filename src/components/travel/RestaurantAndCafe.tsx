import styled from "styled-components";
import type { Document, Place } from "../../types/domain";

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
    <Wrapper>
      <PlaceName>
        🍱 {restaurant.placeName}, ☕️ {cafe.placeName}
      </PlaceName>
      <PlaceNumber placeType={cafe.type}>{placeNumber}</PlaceNumber>
      <RestaurantAndCafeImage>
        <img src={restaurantUrls.thumbnail_url} />
        <img src={cafeUrls.thumbnail_url} />
      </RestaurantAndCafeImage>
    </Wrapper>
  );
};

export default RestaurantAndCafe;

const Wrapper = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PlaceName = styled.h5`
  position: absolute;
  top: -55px;
  & > span {
    color: gray;
  }
`;

const PlaceNumber = styled.span<{
  placeType: "숙소" | "식당" | "카페" | "여행지";
}>`
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

  background-color: ${({ placeType }) => {
    switch (placeType) {
      case "숙소":
        return "#a455e4";
      case "식당":
        return "#ff6f93";
      case "카페":
        return "#ff6f93";
      case "여행지":
        return "#a6f301";
      default:
        return "#bc6aff";
    }
  }};
`;

const RestaurantAndCafeImage = styled.div`
  display: flex;

  & > img:nth-of-type(1) {
    /* transform: rotate(35deg);
    transform-origin: right center; */
    margin-top: 20px;
    width: 100px;
    height: 200px;
    border-radius: 100px 0 0 100px;
    object-fit: cover;
  }

  & > img:nth-of-type(2) {
    /* transform: rotate(35deg);
    transform-origin: left center; */

    margin-top: 20px;

    width: 100px;
    height: 200px;
    border-radius: 0 100px 100px 0;
    object-fit: cover;
  }
`;
