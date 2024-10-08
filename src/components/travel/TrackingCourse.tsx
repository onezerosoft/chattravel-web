import styled from "styled-components";
import type { TrackingCourse } from "../../types/domain";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

interface TrackingCourseProps {
  courses: TrackingCourse[];
}

const LEVEL_MAP: Record<number, string> = {
  1: "하",
  2: "중",
  3: "상",
};

const IMOJI_MAP: Record<string, string> = {
  해파랑길: "🌄",
  남파랑길: "🌅",
  서해랑길: "🏞",
  DMZ: "🪖",
};

const getEmojiFromCourseName = (courseName: string) => {
  for (const course in IMOJI_MAP) {
    if (courseName.startsWith(course)) {
      return IMOJI_MAP[course];
    }
  }
  return "🌄";
};

const TrackingCourse = ({ courses }: TrackingCourseProps) => {
  if (courses.length == 0) return <></>;

  return (
    <>
      <TravelTitle>
        <h2>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;🚵🏻‍♀️ 트래킹을 선호하는 당신을 위해
          준비했어요
        </h2>
      </TravelTitle>
      <Wrapper>
        {courses.map((course) => (
          <CourseContainer>
            <CourseTitle>
              <h3>
                {course.crsKorNm.split(" ").splice(0, 3).join(" ")}{" "}
                {getEmojiFromCourseName(course.crsKorNm)}
              </h3>
              <span>난이도 {LEVEL_MAP[Number(course.crsLevel)]}</span>
            </CourseTitle>
            <CourseContents>
              <ReactMarkdown rehypePlugins={[rehypeRaw]}>
                {course.crsSummary}
              </ReactMarkdown>
              <p>{course.sigun}</p>
            </CourseContents>
          </CourseContainer>
        ))}
      </Wrapper>
    </>
  );
};

export default TrackingCourse;

const TravelTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  & > h2 {
    font-size: 28px;
  }
`;

const CourseTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  & > h3 {
    margin: 0;
    padding: 0;
  }

  & > span {
    font-size: 12px;
    color: #4a4a4a;
    margin-left: 10px;
    font-weight: 500;
  }
`;

const Wrapper = styled.ul`
  display: flex;
  overflow-x: scroll;
  max-width: 90vw;
  height: 400px;
  gap: 22px;
`;

const CourseContainer = styled.li`
  display: flex;
  flex-direction: column;

  min-width: 300px;
  height: 300px;
  background-color: #ebebeb;
  border-radius: 20px;
  box-shadow: 4px 4px 8px 1px rgb(0 0 0 / 12%);
  margin: 0;
  padding: 15px 20px;
`;

const CourseContents = styled.div`
  overflow: scroll;
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  & > * {
    list-style-type: none;
    padding: 15px 10px;
    font-weight: 500;
  }

  & > p {
    align-self: flex-end;
    color: #4a4a4a;
    font-size: 12px;
  }
`;
