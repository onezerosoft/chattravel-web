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
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: center;
  background-color: #f0f0f0;
  border-radius: 30px;
  width: 90vw;
  height: 50px;
  margin: 10px 0;
  box-shadow: 4px 4px 8px 1px rgb(0 0 0 / 12%);
  position: fixed;
  left: 50%; /* 부모 요소의 50% 위치 */
  transform: translateX(-50%); /* 요소의 폭의 반만큼 왼쪽으로 이동 */
  z-index: 1;
`;

const NavigationsContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  gap: 20px;
`;
