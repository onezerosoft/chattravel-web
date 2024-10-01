import styled from "styled-components";
import type { Course } from "../../types/domain";
import { useEffect, useState } from "react";
import Button from "../common/Button";
import usePostSaveTravel from "../../hooks/usePostSaveTravel";
import { useChatStore } from "../../stores";
import { useNavigate } from "react-router";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

interface CourseProps {
  messageId: number;
  courses: Course[];
  scrollDown: () => void;
}

const PLACETYPE_IMOGI_MAP = {
  숙소: "🛏",
  식당: "🍱",
  카페: "☕️",
  여행지: "📌",
};

const Course = ({ scrollDown, messageId, courses }: CourseProps) => {
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
            `<h4> ${PLACETYPE_IMOGI_MAP[place.type]} ${place.placeName} <span>${place.type}</span></h4> 
            <p>${place.comment}</p> `
        )
        .join("");

      if (localStorage.getItem("lastMessageId") !== messageId.toString()) {
        const fullTexts = courses.map((course) =>
          course.places
            .map(
              (place) =>
                `<h4> ${PLACETYPE_IMOGI_MAP[place.type]} ${place.placeName} <span>${place.type}</span></h4> 
            <p>${place.comment}</p> `
            )
            .join("")
        );
        setDisplayedTexts(fullTexts);
        setCourseIndex(courses.length);
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
      }, 10);

      return () => clearInterval(interval);
    }
    scrollDown();
  }, [courseIndex, charIndex, courses, scrollDown]);

  return (
    <Wrapper key={messageId}>
      {courses.map(
        (course, index) =>
          index <= courseIndex && (
            <CourseContent>
              <Day key={course.day}>Day {course.day}</Day>
              <ReactMarkdown rehypePlugins={[rehypeRaw]}>
                {displayedTexts[index]}
              </ReactMarkdown>
            </CourseContent>
          )
      )}
      {courseIndex == courses.length && (
        <Button onClick={saveTravel}>코스 내보내기</Button>
      )}
    </Wrapper>
  );
};

export default Course;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #f5f5f5;
  border-radius: 20px;
  padding: 10px 15px;
  margin: -15px 0 30px 115px;
  font-weight: 500;
  text-align: start;

  width: max-content;
  min-width: 300px;
  max-width: 450px;

  gap: 10px;
  flex-grow: 1;

  & > button {
    align-self: flex-end;
  }
`;

const Day = styled.h2`
  margin: 0 0 10px 0;
  background-color: #fcfdf6;
  border-radius: 10px;
  padding: 2px 7px;
  width: fit-content;
  font-size: 20px;
  box-shadow: 4px 4px 8px 1px rgb(0 0 0 / 6%);
  border: 1px solid black;
`;

const CourseContent = styled.article`
  &:not(:first-of-type) {
    padding-top: 20px;
  }

  & > h4 {
    font-size: 18px;
    margin: 0;
  }

  & > * > span {
    color: #8a8a8a;
    font-weight: 400;
    font-size: 12px;
  }

  & > p {
    font-size: 12px;
    margin-bottom: 5px;
  }
`;
