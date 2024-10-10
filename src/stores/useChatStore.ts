import { create } from "zustand";

interface ChatStore {
  id: number;
  step: number;
  next: () => void;
  reset: () => void;
  createChat: (chatId: number) => void;
}

export const useChatStore = create<ChatStore>((set) => ({
  id: JSON.parse(localStorage.getItem("chatId") || "0"),
  step: JSON.parse(localStorage.getItem("step") || "1"),
  next: () => {
    set((state) => {
      const newStep = state.step + 1;
      localStorage.setItem("step", JSON.stringify(newStep));
      return { step: newStep };
    });
  },
  reset: () => {
    set({ step: 1, id: 0 });

    localStorage.setItem("step", JSON.stringify(1));
    localStorage.setItem("chatId", JSON.stringify(0));
    localStorage.removeItem("region");
    localStorage.removeItem("duration");
    localStorage.removeItem("districts");
  },
  createChat: (chatId: number) => {
    set({ id: chatId });

    localStorage.setItem("chatId", JSON.stringify(chatId));
  },
}));
