import { create } from 'zustand';
import { Chat } from '../types';

interface Store {
  chats: Chat[];
  currentChat: string | null;
  addChat: (chat: Chat) => void;
  setCurrentChat: (id: string) => void;
  updateChat: (id: string, chat: Partial<Chat>) => void;
}

export const useStore = create<Store>((set) => ({
  chats: [],
  currentChat: null,
  addChat: (chat) => set((state) => ({ chats: [...state.chats, chat] })),
  setCurrentChat: (id) => set({ currentChat: id }),
  updateChat: (id, chatUpdate) =>
    set((state) => ({
      chats: state.chats.map((chat) =>
        chat.id === id ? { ...chat, ...chatUpdate } : chat
      ),
    })),
}));