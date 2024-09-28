import styled from "styled-components";
import { ShareIconSVG, DownloadIconSVG } from "../assets";
import PageTemplate from "../components/common/PageTemplate";
import TravelCourse from "../components/travel/TravelCourse";
import useGetTravelCourse from "../hooks/useGetTravelCourse";
import useGetRegionThumbnail from "../hooks/useGetRegionThumbnail";

const Travel = () => {
  const { data: travelCourse, status: travelCourseStatus } =
    useGetTravelCourse();
  const { data: regionThumbnail, status: regionThumbnailStatus } =
    useGetRegionThumbnail();

  if (
    travelCourseStatus == "pending" ||
    regionThumbnailStatus == "pending" ||
    !travelCourse ||
    !regionThumbnail
  )
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
        <TravelCourse courses={travelCourse.courses} />
      </TravelWrapper>
      <RegionThumbnail src={regionThumbnail} />
    </PageTemplate>
  );
};

export default Travel;

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
