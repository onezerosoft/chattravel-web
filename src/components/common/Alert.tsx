import styled from "styled-components";
import ModalPortal from "./ModalPortal";
import { useNavigate } from "react-router";
import { useAlertStore } from "../../stores/useAlertStore";

const Alert = () => {
  const isOpen = useAlertStore((state) => state.isOpen);
  const title = useAlertStore((state) => state.title);
  const content = useAlertStore((state) => state.content);
  const topOption = useAlertStore((state) => state.topOption);
  const bottomOption = useAlertStore((state) => state.bottomOption);
  const close = useAlertStore((state) => state.close);

  const onClickTopOtion = useAlertStore((state) => state.onClickTopOption);
  const onClickBottomOtion = useAlertStore(
    (state) => state.onClickBottomOption
  );

  const navigate = useNavigate();

  if (!isOpen) return;

  return (
    <ModalPortal>
      <Backdrop $isVisible={isOpen} />
      <AlertContainer role="dialog">
        <h1>{title}</h1>
        <p>{content}</p>
        <OptionContainer>
          <OptionWrapper $option={"top"} onClick={onClickTopOtion}>
            {topOption}
          </OptionWrapper>
          <OptionWrapper $option={"bottom"} onClick={onClickBottomOtion}>
            {bottomOption}
          </OptionWrapper>
        </OptionContainer>
      </AlertContainer>
    </ModalPortal>
  );
};

export default Alert;

const AlertContainer = styled.div`
  display: flex;
  width: 50%;
  height: 261px;
  max-width: 297px;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  background-color: white;
  border-radius: 10px;
  box-shadow: 4px 4px 10px 1px rgb(0 0 0 / 25%);

  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 2;
  transform: translate(-50%, -50%);

  & > h1 {
    margin-top: 40px;

    font-size: 18px;
    text-align: center;
  }

  & > p {
    padding: 0 20px;

    color: #ababab;
    text-align: center;
    white-space: pre-wrap;
  }
`;

const OptionContainer = styled.div`
  display: flex;
  margin-bottom: 20px;
  overflow: hidden;
  flex-direction: column;

  background: white;
  border-radius: 0 0 10px 10px;
`;

const OptionWrapper = styled.button<{ $option: string }>`
  width: 268px;
  height: 50px;

  background-color: ${(props) =>
    props.$option === "top" ? "#deff97" : "transparent"};
  border-radius: 10px;

  color: ${(props) => (props.$option === "top" ? "#6a6a6a" : "#ababab")};
  font-size: 16px;
  font-weight: 600;

  &:hover {
    transform: scale(1.02);
    opacity: 80%;
  }
`;

const Backdrop = styled.div<{ $isVisible: boolean }>`
  width: 100%;
  height: 100vh;

  background-color: ${({ $isVisible }) =>
    $isVisible ? "#222" : "transparent"};

  position: fixed;
  top: 0;
  bottom: 0;
  left: 50%;
  z-index: 1;
  opacity: 0.2;

  transition: background-color 0.3s ease-out;
  transform: translateX(-50%);
`;
