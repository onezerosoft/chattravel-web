import { create } from "zustand";

interface AlertStore {
  isOpen: boolean;
  title: string;
  content: string;
  topOption: string;
  bottomOption: string;
  makeAlert: (
    title: string,
    content: string,
    topOption: string,
    bottomOption: string,
    onClickTopOption: () => void,
    onClickBottomOption: () => void
  ) => void;
  onClickTopOption: () => void;
  onClickBottomOption: () => void;
  close: () => void;
  open: () => void;
}

export const useAlertStore = create<AlertStore>((set) => ({
  isOpen: false,
  title: "",
  content: "",
  topOption: "",
  bottomOption: "",
  onClickTopOption: () => {},
  onClickBottomOption: () => {},
  makeAlert: (
    title: string,
    content: string,
    topOption: string,
    bottomOption: string,
    onClickTopOption: () => void,
    onClickBottomOption: () => void
  ) => {
    set({
      isOpen: true,
      title,
      content,
      topOption,
      bottomOption,
      onClickTopOption,
      onClickBottomOption,
    });
  },
  open: () => {
    set({ isOpen: true });
  },
  close: () => {
    set({ isOpen: false });
  },
}));
