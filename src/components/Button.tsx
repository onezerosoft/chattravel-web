import { PropsWithChildren } from "react";
import styled from "styled-components";

interface ButtonProps {
  type?: "primary" | "secondary";
}

const Button = ({
  type = "primary",
  children,
}: ButtonProps & PropsWithChildren) => {
  return <Wrapper type={type}>{children}</Wrapper>;
};

export default Button;

const Wrapper = styled.button<{ type: ButtonProps["type"] }>`
  padding: 0 15px;
  height: 36px;
  background-color: ${({ type }) => (type == "primary" ? "#232323" : "white")};
  color: ${({ type }) => (type == "primary" ? "white" : "#232323")};
  border: ${({ type }) => type == "secondary" && "1px solid #232323"};
  text-align: center;
  line-height: 34px;
  border-radius: 30px;
  font-size: 16px;
  font-weight: 500;

  & > a {
    color: ${({ type }) => (type == "primary" ? "white" : "#232323")};

    &:hover {
      color: ${({ type }) =>
        type == "primary" ? "#ededed" : "#525252"} !important;
    }
  }
`;
