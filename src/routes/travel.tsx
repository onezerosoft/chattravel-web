import { createFileRoute, useLoaderData } from "@tanstack/react-router";
import PageTemplate from "../components/common/PageTemplate";
import useGetTravelCourse from "../hooks/useGetTravelCourse";
import styled from "styled-components";
import { getRegionThumbnail } from "../apis/get";
import { TourApiResponse } from "../types/api";
import { GalleryItems } from "../types/domain";
import { DownloadIconSVG, ShareIconSVG } from "../assets";

export const Route = createFileRoute("/travel")({
  loader: getRegionThumbnail,
  component: Travel,
});

function Travel() {
  const { data: travelCourse, status } = useGetTravelCourse();
  const regionThumbnailUrl = useLoaderData({
    from: "/travel",
    // FIXME
    select: (data: TourApiResponse<GalleryItems>) =>
      data.response.body.items.item[31].galWebImageUrl,
  });

  if (status == "pending" || !travelCourse)
    return (
      <PageTemplate pageName="Travel" badgeText="Enjoy the Travel!">
        로딩 중
      </PageTemplate>
    );

  return (
    <PageTemplate pageName="Travel" badgeText="Enjoy the Travel!">
      <TravelWrapper>
        <TravelTitle>
          <h2>{travelCourse.travelTitle}</h2>
          <Icons>
            <ShareIconSVG width={24} />
            <DownloadIconSVG width={34} />
          </Icons>
        </TravelTitle>
        {travelCourse.courses.map((course) => (
          <Course>
            <CourseName>
              Day {course.day} | {course.courseName}
            </CourseName>
            <PlacesContainer>
              <Place>
                <PlaceName>
                  {course.places[0].placeName}{" "}
                  <span>{course.places[0].type}</span>
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
          </Course>
        ))}
      </TravelWrapper>
      <RegionThumbnail src={regionThumbnailUrl} />
    </PageTemplate>
  );
}

const TravelTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  & > h2 {
    font-size: 28px;
  }
`;

const Icons = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;

  & > svg {
    cursor: pointer;
  }
`;

const RegionThumbnail = styled.img`
  position: fixed;
  top: 0;
  right: 0;
  width: 100vw;
  height: 100vh;
  z-index: -1;
  opacity: 20%;
`;

const TravelWrapper = styled.div`
  margin: 100px 85px;
`;

const Place = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;

  & > img {
    margin-top: 20px;
    border-radius: 50%;
  }
`;

const Course = styled.div`
  display: flex;

  & > h3 {
    color: #494949;
    margin: 10px 0 40px 0;
  }
  margin-bottom: 30px;
`;

const CourseName = styled.h3`
  width: 200px;
`;

const PlacesContainer = styled.ol`
  display: flex;
  border-top: 3px solid #838383;
  position: relative;
  list-style-type: none;
  padding: 0 20px 0 0;
  gap: 20px;
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
    margin-top: 20px;

    width: 100px;
    height: 200px;
    border-radius: 100px 0 0 100px;
    object-fit: cover;
  }

  & > img:nth-of-type(2) {
    margin-top: 20px;

    width: 100px;
    height: 200px;
    border-radius: 0 100px 100px 0;
    object-fit: cover;
  }
`;
