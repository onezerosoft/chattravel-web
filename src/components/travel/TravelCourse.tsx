import styled from "styled-components";
import type { Course, Place, Document } from "../../types/domain";
import useGetPlaceThumbnails from "../../hooks/useGetPlaceThumbnails";
import TravelPlace from "./TravelPlace";
import Accomodation from "./Accomodation";
import React from "react";
import Restaurant from "./Restaurant";
import Cafe from "./Cafe";
import {
  CafeDefaultThumbnail,
  ExpensiveWEBP,
  RestaurantDefaultThumbnail,
} from "../../assets";

interface TravelCourse {
  courses: Course[];
}

const TravelCourse = ({ courses }: TravelCourse) => {
  const places = courses
    .map((course) => course.places)
    .flat()
    .map((place) => place.placeName);
  const { placeThumbnails } = useGetPlaceThumbnails(places);

  const getUrls = (place: Place): Document => {
    if (place.placeName in placeThumbnails)
      return placeThumbnails[place.placeName];

    if (place.placeType == "숙소")
      return {
        thumbnail_url: ExpensiveWEBP,
        doc_url: "",
        image_url: "",
      };

    if (place.placeType == "식당")
      return {
        thumbnail_url: RestaurantDefaultThumbnail,
        doc_url: "",
        image_url: "",
      };

    return {
      thumbnail_url: CafeDefaultThumbnail,
      doc_url: "",
      image_url: "",
    };
  };

  const renderPlace = (place: Place, index: number, day: number) => {
    switch (place.placeType) {
      case "숙소":
        return (
          <Accomodation
            key={place.placeId}
            accomodation={place}
            urls={getUrls(place)}
            check={day === 1 ? "Check-in" : "Check-out"}
          />
        );
      case "식당":
        return (
          <Restaurant
            key={place.placeId}
            restaurant={place}
            restaurantUrls={getUrls(place)}
            placeNumber={index}
          />
        );
      case "카페":
        return (
          <Cafe
            key={place.placeId}
            cafe={place}
            cafeUrls={getUrls(place)}
            placeNumber={index}
          />
        );
      case "여행지":
      default:
        return (
          <TravelPlace
            key={place.placeId}
            place={place}
            urls={getUrls(place)}
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
            {renderPlace(place, index + 1, course.day)}
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
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  & > p {
    color: gray;
    font-size: 10px;
    text-align: end;
    width: 150px;
    align-self: end;
  }
`;
