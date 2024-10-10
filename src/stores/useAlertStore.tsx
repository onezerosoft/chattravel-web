import { create } from "zustand";

interface AlertStore {
  close: any;
  isOpen: boolean;
  title: string;
  content: string;
  topOption: string;
  bottomOption: string;
  topOptionHandler: void | undefined;
  bottomOptionHandler: void | undefined;
  makeAlert: (
    title: string,
    content: string,
    topOption: string,
    bottomOption: string
  ) => void;
  onClickTopOption: () => void;
  onClickBottomOption: () => void;
}

export const useAlertStore = create<AlertStore>((set) => ({
  isOpen: false,
  title: "",
  content: "",
  topOption: "",
  bottomOption: "",
  topOptionHandler: undefined,
  bottomOptionHandler: undefined,
  onClickTopOption: () => {},
  onClickBottomOption: () => {},
  makeAlert: (
    title: string,
    content: string,
    topOption: string,
    bottomOption: string
  ) => {
    set({ isOpen: true, title, content, topOption, bottomOption });
  },
  open: () => {
    set({ isOpen: true });
  },
  close: () => {
    set({ isOpen: false });
  },
}));
