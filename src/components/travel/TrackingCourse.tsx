import styled from "styled-components";
import type { TrackingCourse } from "../../types/domain";

interface TrackingCourseProps {
  courses: TrackingCourse[];
}

const TrackingCourse = ({ courses }: TrackingCourseProps) => {
  return (
    <Wrapper>
      {courses.map((courses) => (
        <CourseContainer>
          <h3>{courses.crsKorNm}</h3>
          <p>{courses.crsSummary}</p>
        </CourseContainer>
      ))}
    </Wrapper>
  );
};

export default TrackingCourse;

const Wrapper = styled.ul`
  display: flex;
  overflow-x: scroll;
  max-width: 90vw;
  height: 410px;
  gap: 22px;
`;

const CourseContainer = styled.li`
  display: flex;
  flex-direction: column;
  min-width: 300px;
  height: 350px;
  background-color: #95c580;
  border-radius: 20px;
  box-shadow: 4px 4px 8px 1px rgb(0 0 0 / 12%);

  list-style-type: none;
  margin: 0;
  padding: 20px;

  & > h3 {
    margin: 0;
  }

  & > p {
  }
`;
