import { ButtonHTMLAttributes, PropsWithChildren } from "react";
import styled from "styled-components";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  design?: "primary" | "secondary";
}

const Button = ({
  design = "primary",
  children,
  ...props
}: ButtonProps & PropsWithChildren) => {
  return (
    <Wrapper {...props} $design={design}>
      {children}
    </Wrapper>
  );
};

export default Button;

const Wrapper = styled.button<{ $design: ButtonProps["design"] }>`
  padding: 0 15px;
  box-sizing: border-box;
  width: fit-content;
  white-space: nowrap;
  height: 36px;
  background-color: ${({ $design }) =>
    $design == "primary" ? "#232323" : "white"};
  color: ${({ $design }) => ($design == "primary" ? "white" : "#232323")};
  border: ${({ $design }) => $design == "secondary" && "1px solid #232323"};
  text-align: center;
  line-height: 34px;
  border-radius: 30px;
  font-size: 16px;
  font-weight: 550;
  &:hover {
    transform: scale(1.02);
  }

  & > a {
    color: ${({ $design }) => ($design == "primary" ? "white" : "#232323")};

    &:hover {
      color: ${({ $design }) =>
        $design == "primary" ? "#ededed" : "#525252"} !important;
    }
  }
`;
