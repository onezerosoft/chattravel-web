import styled from "styled-components";
import type { Course } from "../../types/domain";
import React, { useEffect, useState } from "react";
import Button from "../common/Button";
import usePostSaveTravel from "../../hooks/usePostSaveTravel";
import { useChatStore } from "../../stores";
import { useNavigate } from "react-router";

interface CourseProps {
  messageId: number;
  courses: Course[];
  scrollDown: () => void;
}

const Course = React.memo(({ scrollDown, messageId, courses }: CourseProps) => {
  const navigate = useNavigate();

  const [displayedTexts, setDisplayedTexts] = useState<string[]>([]);
  const [courseIndex, setCourseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  const chatId = useChatStore((state) => state.id);

  const { mutateAsync } = usePostSaveTravel();

  const saveTravel = async () => {
    const res = await mutateAsync({
      body: {
        request: "Y",
        messageId,
      },
      params: {
        chatId: chatId!,
      },
    });

    navigate(`/travel/travelId=${res.data.result.travelId}`);
  };

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

      if (localStorage.getItem("lastMessageId") == messageId.toString()) {
        setDisplayedTexts((prev) => [...prev, fullText]);
        setCourseIndex((prev) => prev + 1);
        return;
      }

      const interval = setInterval(() => {
        if (charIndex < fullText.length) {
          setDisplayedTexts((prev) => {
            const newTexts = [...prev];
            newTexts[courseIndex] =
              (newTexts[courseIndex] || "") + fullText[charIndex];
            return newTexts;
          });
          setCharIndex((prev) => prev + 1);
          scrollDown();
        } else {
          clearInterval(interval);
          setCourseIndex((prev) => prev + 1);
          setCharIndex(0);
        }
      }, 30);

      return () => clearInterval(interval);
    }

    localStorage.setItem("lastMessageId", messageId.toString());
    scrollDown();
  }, [courseIndex, charIndex, courses, scrollDown]);

  return (
    <Wrapper key={messageId}>
      {courses.map(
        (course, index) =>
          index <= courseIndex && (
            <CourseContent>
              <h3 key={course.day}>🗓 Day {course.day}</h3>
              <p>{displayedTexts[index]}</p>
            </CourseContent>
          )
      )}
      {courseIndex == courses.length && (
        <Button onClick={saveTravel}>코스 내보내기</Button>
      )}
    </Wrapper>
  );
});

export default Course;

const Wrapper = styled.div`
  background-color: #f5f5f5;
  border-radius: 20px;

  padding: 10px 15px;
  font-weight: 500;
  text-align: start;
  width: max-content;
  margin-left: 115px;
  margin-top: -15px;
  margin-bottom: 15px;

  gap: 10px;
  max-width: 450px;

  & > button {
    margin: 20px 0 10px 10px;
  }
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
