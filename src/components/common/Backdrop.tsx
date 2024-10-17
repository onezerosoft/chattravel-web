import styled from "styled-components";

const Backdrop = styled.div`
  width: 100%;
  height: 100vh;

  background-color: #222;

  position: fixed;
  top: 0;
  bottom: 0;
  left: 50%;
  z-index: 1;
  opacity: 0.2;

  transition: background-color 0.3s ease-out;
  transform: translateX(-50%);
`;

export default Backdrop;
