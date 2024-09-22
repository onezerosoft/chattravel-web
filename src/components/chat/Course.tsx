import styled from "styled-components";
import type { Course } from "../../types/domain";

interface CourseProps {
  messageId: number;
  courses: Course[];
}

const Course = ({ messageId, courses }: CourseProps) => {
  return (
    <div key={messageId}>
      {courses.map((course) => (
        <>
          <CourseName key={course.courseId}>
            🗓 Day {course.day} | {course.courseName}
          </CourseName>
          {course.places.map((place) => (
            <div key={place.placeId}>
              <>
                {place.placeId}. {place.type} [ {place.placeName} ] -{" "}
                {place.comment}
                <br />
              </>
            </div>
          ))}
          <br />
        </>
      ))}
    </div>
  );
};

const CourseName = styled.h3`
  margin: 0;
`;

export default Course;
