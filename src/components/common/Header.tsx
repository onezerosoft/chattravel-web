import styled from "styled-components";
import Logo from "./Logo";
import Button from "./Button";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { useChatStore } from "../../stores";

const Header = () => {
  const location = useLocation();
  const reset = useChatStore((state) => state.reset);

  return (
    <Wrapper>
      <Link to={"/"}>
        <Logo />
      </Link>
      <NavigationsContainer>
        {/* <Link to={"/style"}>Login</Link> */}
        {location.pathname != "/chat" && (
          <Button design="primary" onClick={reset}>
            <Link to={"/chat"}>채팅 시작하기</Link>
          </Button>
        )}
      </NavigationsContainer>
    </Wrapper>
  );
};

export default Header;

const Wrapper = styled.header`
  padding: 0 15px;
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
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;
`;

const NavigationsContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  gap: 20px;
`;
