import styled from "styled-components";
import type { Course } from "../../types/domain";

interface TravelCourse {
  courses: Course[];
}

const TravelCourse = ({ courses }: TravelCourse) => {
  return courses.map((course) => (
    <Wrapper>
      <CourseName>Day{course.day}</CourseName>
      <PlacesContainer>
        <Place>
          <PlaceName>
            {course.places[0].placeName} <span>{course.places[0].type}</span>
          </PlaceName>
          <PlaceNumber placeType={course.places[0].type}>{1}</PlaceNumber>
          <img src={"https://picsum.photos/200/200"} />
        </Place>
        <RestaurantAndCafe>
          <PlaceName>
            {course.places[1].placeName}&{course.places[2].placeName}{" "}
            <span>
              {course.places[1].type}&{course.places[2].type}
            </span>
          </PlaceName>
          <PlaceNumber placeType={course.places[2].type}>{2}</PlaceNumber>
          <RestaurantAndCafeImage>
            <img src={"https://picsum.photos/200/200"} />
            <img src={"https://picsum.photos/200/200"} />
          </RestaurantAndCafeImage>
        </RestaurantAndCafe>
        <Place>
          <PlaceName>{course.places[3].placeName}</PlaceName>
          <PlaceNumber placeType={course.places[3].type}>{3}</PlaceNumber>
          <img src={"https://picsum.photos/200/200"} />
        </Place>
        <RestaurantAndCafe>
          <PlaceName>
            {course.places[4].placeName} / {course.places[5].placeName}
          </PlaceName>
          <PlaceNumber placeType={course.places[4].type}>{4}</PlaceNumber>
          <RestaurantAndCafeImage>
            <img src={"https://picsum.photos/200/200"} />
            <img src={"https://picsum.photos/200/200"} />
          </RestaurantAndCafeImage>
        </RestaurantAndCafe>
        <Place>
          <PlaceName>{course.places[6].placeName}</PlaceName>
          <PlaceNumber placeType={course.places[6].type}>{5}</PlaceNumber>
          <img src={"https://picsum.photos/200/200"} />
        </Place>
      </PlacesContainer>
    </Wrapper>
  ));
};

export default TravelCourse;

const Place = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;

  & > img {
    margin-top: 20px;
    border-radius: 50%;
  }
`;

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
const PlaceName = styled.h5`
  position: absolute;
  top: -55px;
  & > span {
    color: gray;
  }
`;

const RestaurantAndCafe = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const RestaurantAndCafeImage = styled.div`
  display: flex;

  & > img:nth-of-type(1) {
    transform: rotate(35deg);
    transform-origin: right center;
    margin-top: 20px;
    width: 100px;
    height: 200px;
    border-radius: 100px 0 0 100px;
    object-fit: cover;
  }

  & > img:nth-of-type(2) {
    transform: rotate(35deg);
    transform-origin: left center;

    margin-top: 20px;

    width: 100px;
    height: 200px;
    border-radius: 0 100px 100px 0;
    object-fit: cover;
  }
`;
