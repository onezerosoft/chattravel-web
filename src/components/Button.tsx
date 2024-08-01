import { PropsWithChildren } from "react";
import styled from "styled-components";

interface ButtonProps {
  type: "primary" | "secondary";
}

const Button = ({ type, children }: ButtonProps & PropsWithChildren) => {
  return <Wrapper type={type}>{children}</Wrapper>;
};

export default Button;

const Wrapper = styled.div<{ type: ButtonProps["type"] }>`
  padding: 0 15px;
  height: 36px;
  background-color: ${({ type }) => (type == "primary" ? "#232323" : "white")};
  color: ${({ type }) => (type == "primary" ? "white" : "#232323")};
  text-align: center;
  line-height: 36px;
  border-radius: 30px;
  font-size: 16px;

  & > a {
    color: ${({ type }) => (type == "primary" ? "white" : "#232323")};

    &:hover {
      color: ${({ type }) =>
        type == "primary" ? "#ededed" : "#525252"} !important;
    }
  }
`;
