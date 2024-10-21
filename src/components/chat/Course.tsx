import styled from "styled-components";
import type { Course, Place } from "../../types/domain";
import { useEffect, useState } from "react";
import Button from "../common/Button";
import usePostSaveTravel from "../../hooks/usePostSaveTravel";
import { useChatStore } from "../../stores/useChatStore";
import { useNavigate } from "react-router";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import Feedback from "./Feedback";
import useFeedback from "../../hooks/useFeedback";

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

  const { like, hate, handleClickThumbs } = useFeedback(messageId);

  const { mutateAsync } = usePostSaveTravel();

  const saveTravel = async () => {
    const res = await mutateAsync({
      body: {
        request: "Y",
        messageId,
      },
      params: {
        chatId: chatId,
      },
    });

    navigate(`/travel/travelId=${res.data.result.travelId}`);
  };

  const getCheckInfo = (place: Place, day: number) => {
    if (place.placeType != "숙소") return "";
    if (day == 1) return "체크인";
    return "체크아웃";
  };

  const makePlacesToHTML = (places: Place[], day: number) =>
    places
      .map((place) => {
        if (place.placeName == "") return "";
        return `<h4> ${PLACETYPE_IMOGI_MAP[place.placeType]} ${place.placeName} ${getCheckInfo(place, day)} <span>${place.placeType}<span> ${place.ratings && place.ratings != "" ? `추천 점수: ${place.ratings.split(".")[0]}점 ❤️` : ""}</span></span> </h4> 
    <p>${place.comment}</p> `;
      })
      .join("");

  useEffect(() => {
    if (courseIndex < courses.length) {
      const placesHTML = makePlacesToHTML(
        courses[courseIndex].places,
        courses[courseIndex].day
      );

      if (localStorage.getItem("activeMessageId") !== messageId.toString()) {
        const totalPlacesHTML = courses.map((course) =>
          makePlacesToHTML(course.places, course.day)
        );
        setDisplayedTexts(totalPlacesHTML);
        setCourseIndex(courses.length);
        return;
      }

      const interval = setInterval(() => {
        if (charIndex < placesHTML.length) {
          setDisplayedTexts((prev) => {
            const newTexts = [...prev];
            newTexts[courseIndex] =
              (newTexts[courseIndex] || "") + placesHTML[charIndex];
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

      return () => {
        clearInterval(interval);
      };
    } else {
      localStorage.setItem("activeMessageId", "done");
      scrollDown();
    }
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
      <BottomContainer>
        <Feedback
          like={like}
          hate={hate}
          handleClickThumbs={handleClickThumbs}
        />
        {courseIndex == courses.length && (
          <Button design="secondary" onClick={saveTravel}>
            이 코스 내보내기
          </Button>
        )}
      </BottomContainer>
    </Wrapper>
  );
};

export default Course;

const BottomContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  position: absolute;
  bottom: -50px;
  width: 100%;
  padding-right: 30px;
  box-sizing: border-box;
  height: fit-content;
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: #f5f5f5;
  border-radius: 20px;
  padding: 10px 15px;
  margin: -10px 0 60px 115px;
  font-weight: 500;
  text-align: start;

  width: max-content;
  min-width: 300px;
  max-width: 450px;

  gap: 10px;
  flex-grow: 1;
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
    & > span {
    }
  }

  & > p {
    font-size: 14px;
    margin-bottom: 5px;
  }
`;
