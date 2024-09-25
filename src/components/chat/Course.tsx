import styled from "styled-components";
import type { Course } from "../../types/domain";
import React, { useEffect, useState } from "react";

interface CourseProps {
  messageId: number;
  courses: Course[];
}

const Course = React.memo(({ messageId, courses }: CourseProps) => {
  const [displayedTexts, setDisplayedTexts] = useState<string[]>([]);
  const [courseIndex, setCourseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    if (courseIndex < courses.length) {
      const fullText = courses[courseIndex].places
        .map(
          (place) =>
            place.placeId +
            ". " +
            place.type +
            "[" +
            place.placeName +
            "] " +
            place.comment
        )
        .join("\n");

      const interval = setInterval(() => {
        if (charIndex < fullText.length) {
          setDisplayedTexts((prev) => {
            const newTexts = [...prev];
            newTexts[courseIndex] =
              (newTexts[courseIndex] || "") + fullText[charIndex];
            return newTexts;
          });
          setCharIndex((prev) => prev + 1);
        } else {
          clearInterval(interval);
          setCourseIndex((prev) => prev + 1);
          setCharIndex(0);
        }
      }, 50);

      return () => clearInterval(interval);
    }
  }, [courseIndex, charIndex, courses]);

  return (
    <Wrapper key={messageId}>
      {courses.map(
        (course, index) =>
          index <= courseIndex && (
            <CourseContent>
              <h3 key={course.courseId}>
                🗓 Day {course.day} | {course.courseName}
              </h3>
              <p>{displayedTexts[index]}</p>
            </CourseContent>
          )
      )}
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

const CourseContent = styled.article`
  & > h3 {
    margin: 5px 0;
  }
  & > p {
    white-space: pre-wrap;
    word-wrap: break-word;
  }
`;

export default Course;
