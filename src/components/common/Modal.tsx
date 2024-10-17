import styled from "styled-components";
import Backdrop from "./Backdrop";
import ModalPortal from "./ModalPortal";
import { useModalStore } from "../../stores/useModalStore";

const Modal = () => {
  const children = useModalStore((state) => state.children);
  const isOpen = useModalStore((state) => state.isOpen);
  const close = useModalStore((state) => state.close);

  if (!isOpen) return;

  return (
    <ModalPortal>
      <Backdrop onClick={close} />
      <Container>{children}</Container>
    </ModalPortal>
  );
};

export default Modal;

const Container = styled.div`
  display: flex;
  width: 50%;
  max-height: max-content;
  max-width: max-content;
  flex-direction: column;
  justify-content: space-between;
  padding: 17px 25px;

  background-color: white;
  border-radius: 10px;
  box-shadow: 4px 4px 10px 1px rgb(0 0 0 / 25%);

  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 2;
  transform: translate(-50%, -50%);
`;
