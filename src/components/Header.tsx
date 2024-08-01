import styled from "styled-components";
import { Link } from "@tanstack/react-router";
import Logo from "./Logo";
import Button from "./Button";

const Header = () => {
  return (
    <Wrapper>
      <Logo />
      <NavigationsContainer>
        <Link to={"/style"}>Login</Link>
        <Button type="primary">
          <Link to={"/chat"}>채팅 시작하기</Link>
        </Button>
      </NavigationsContainer>
    </Wrapper>
  );
};

export default Header;

const Wrapper = styled.header`
  padding: 0 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f0f0f0;
  border-radius: 30px;
  height: 50px;
  margin: 10px 20px;
  box-shadow: 4px 4px 8px 1px rgb(0 0 0 / 12%);
`;

const NavigationsContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  gap: 20px;
`;
