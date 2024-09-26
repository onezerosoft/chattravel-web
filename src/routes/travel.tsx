import { createFileRoute } from "@tanstack/react-router";
import PageTemplate from "../components/common/PageTemplate";
import useGetTravelCourse from "../hooks/useGetTravelCourse";
import styled from "styled-components";

export const Route = createFileRoute("/travel")({
  component: Travel,
});

function Travel() {
  const { data: travelCourse, status } = useGetTravelCourse();

  if (status == "pending")
    return (
      <PageTemplate pageName="Travel" badgeText="Enjoy the Travel!">
        로딩 중
      </PageTemplate>
    );

  return (
    <PageTemplate pageName="Travel" badgeText="Enjoy the Travel!">
      <TravelWrapper>
        <h2>{travelCourse?.travelTitle}</h2>
      </TravelWrapper>
    </PageTemplate>
  );
}

const TravelWrapper = styled.div`
  margin: 100px 90px;
`;
