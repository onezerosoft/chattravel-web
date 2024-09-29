import styled from "styled-components";
import type { Course } from "../../types/domain";
import useGetPlaceThumbnails from "../../hooks/useGetPlaceThumbnails";
import TravelPlace from "./TravelPlace";
import RestaurantAndCafe from "./RestaurantAndCafe";
import Accomodation from "./Accomodation";

interface TravelCourse {
  courses: Course[];
}

const TravelCourse = ({ courses }: TravelCourse) => {
  const places = courses
    .map((course) => course.places)
    .flat()
    .map((place) => place.placeName);
  const { placeThumbnails, isSuccess } = useGetPlaceThumbnails(places);

  const isAccomodationNeeded = (index: number) => {
    return courses.length > 1 && (index == 0 || index == courses.length);
  };

  if (!isSuccess) return <></>;

  return courses.map((course, index) => (
    <Wrapper>
      <CourseName>Day{course.day}</CourseName>
      <PlacesContainer>
        {isAccomodationNeeded(index) ? (
          <Accomodation
            accomodation={course.places[0]}
            urls={placeThumbnails[course.places[0].placeName]}
          />
        ) : (
          <TravelPlace
            place={course.places[0]}
            urls={placeThumbnails[course.places[0].placeName]}
            placeNumber={1}
          />
        )}
        <RestaurantAndCafe
          restaurant={course.places[1]}
          cafe={course.places[2]}
          restaurantUrls={placeThumbnails[course.places[1].placeName]}
          cafeUrls={placeThumbnails[course.places[2].placeName]}
          placeNumber={2}
        />
        <TravelPlace
          place={course.places[3]}
          urls={placeThumbnails[course.places[3].placeName]}
          placeNumber={3}
        />
        <RestaurantAndCafe
          restaurant={course.places[4]}
          cafe={course.places[5]}
          restaurantUrls={placeThumbnails[course.places[4].placeName]}
          cafeUrls={placeThumbnails[course.places[5].placeName]}
          placeNumber={4}
        />
        <TravelPlace
          place={course.places[6]}
          urls={placeThumbnails[course.places[6].placeName]}
          placeNumber={5}
        />
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
  width: 60px;
`;

const PlacesContainer = styled.ol`
  display: flex;
  border-top: 3px solid #838383;
  position: relative;
  list-style-type: none;

  gap: 40px;
  margin-left: 20px;
  margin-top: 23px;
`;
