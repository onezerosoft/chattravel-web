import styled from "styled-components";
import type { Course, Place } from "../../types/domain";
import useGetPlaceThumbnails from "../../hooks/useGetPlaceThumbnails";
import TravelPlace from "./TravelPlace";
import Accomodation from "./Accomodation";
import React from "react";
import Restaurant from "./Restaurant";
import Cafe from "./Cafe";

interface TravelCourse {
  courses: Course[];
}

const TravelCourse = ({ courses }: TravelCourse) => {
  const places = courses
    .map((course) => course.places)
    .flat()
    .map((place) => place.placeName);
  const { placeThumbnails, isSuccess } = useGetPlaceThumbnails(places);

  if (!isSuccess) return <></>;

  const renderPlace = (place: Place, index: number) => {
    switch (place.type) {
      case "숙소":
        return (
          <Accomodation
            accomodation={place}
            urls={placeThumbnails[place.placeName]}
            check={index === 0 ? "Check-in" : "Check-out"}
          />
        );
      case "식당":
        return (
          <Restaurant
            restaurant={place}
            restaurantUrls={placeThumbnails[place.placeName]}
            placeNumber={index}
          />
        );
      case "카페":
        return (
          <Cafe
            cafe={place}
            cafeUrls={placeThumbnails[place.placeName]}
            placeNumber={index}
          />
        );
      case "여행지":
      default:
        return (
          <TravelPlace
            place={place}
            urls={placeThumbnails[place.placeName]}
            placeNumber={index}
          />
        );
    }
  };

  return courses.map((course, _) => (
    <Wrapper>
      <CourseName>Day{course.day}</CourseName>
      <PlacesContainer>
        {course.places.map((place, index) => (
          <React.Fragment key={index}>
            {renderPlace(place, index + 1)}
          </React.Fragment>
        ))}
      </PlacesContainer>
    </Wrapper>
  ));
};

export default TravelCourse;

const Wrapper = styled.div`
  display: flex;
  padding: 0 20px;

  & > h3 {
    color: #494949;
    margin: 10px 0 40px 0;
  }
  margin-bottom: 30px;
`;

const CourseName = styled.h3`
  width: 50px;
`;

const PlacesContainer = styled.ol`
  display: flex;
  border-top: 3px solid #838383;
  position: relative;
  list-style-type: none;

  gap: 10px;
  margin-left: 0;
  margin-top: 23px;
`;

export const PlaceInfo = styled.p`
  transition: opacity 0.3s;
  background-color: white;
  width: 190px;
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
  }

  & > p {
    color: gray;
    font-size: 10px;
    text-align: end;
    width: 150px;
    align-self: end;
  }
`;
