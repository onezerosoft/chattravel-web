import styled from "styled-components";
import type { Course } from "../../types/domain";
import React from "react";

interface CourseProps {
  messageId: number;
  courses: Course[];
}

const Course = React.memo(({ messageId, courses }: CourseProps) => {
  return (
    <Wrapper key={messageId}>
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
        </>
      ))}
    </Wrapper>
  );
});

const Wrapper = styled.div`
  background-color: #f5f5f5;
  border-radius: 20px;

  padding: 10px 15px;
  font-weight: 500;
  text-align: start;
  width: max-content;
  margin-left: 115px;
  margin-top: -15px;

  gap: 10px;
  max-width: 450px;
`;

const CourseName = styled.h3`
  margin: 5px 0;
`;

export default Course;
