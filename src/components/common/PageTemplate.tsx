import { PropsWithChildren } from "react";
import Badge from "./Badge";
import styled from "styled-components";

interface PageTemplateProps {
  pageName: string;
  badgeText: string;
}

const PageTemplate = ({
  pageName,
  badgeText,
  children,
}: PageTemplateProps & PropsWithChildren) => {
  return (
    <Wrapper>
      <PageName>
        <Badge text={badgeText} />
        <h1>{pageName}</h1>
      </PageName>
      {children}
    </Wrapper>
  );
};

export default PageTemplate;

const Wrapper = styled.div`
  display: flex;
  position: relative;
  box-sizing: border-box;
  padding-top: 70px;
`;

const PageName = styled.div`
  position: absolute;
  top: 80px;
  left: 80px;

  & > h1 {
    font-weight: 600;
    margin-top: 10px;
  }

  @media screen and (width <= 500px) {
    left: 30px;
  }
`;
