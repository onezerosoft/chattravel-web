import { create } from "zustand";

interface ModalStore {
  isOpen: boolean;
  children: JSX.Element;
  setModalContent: (children: JSX.Element) => void;
  close: () => void;
  open: () => void;
}

export const useModalStore = create<ModalStore>((set) => ({
  isOpen: false,
  children: <></>,
  open: () => {
    set({ isOpen: true });
  },
  close: () => {
    set({ isOpen: false });
  },
  setModalContent: (children: JSX.Element) => {
    set({ children });
  },
}));
