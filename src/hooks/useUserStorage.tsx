import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { User } from '../types/User.types.ts';

interface UserStorage {
  currentUser?: User;
  setCurrentUser: (user: User) => void;
  initCurrentUser: () => void;
}

export const useUserStorage = create<UserStorage>()(
  persist(
    (setState) => ({
      currentUser: undefined,
      setCurrentUser: (currentUser) => setState({ currentUser }),
      initCurrentUser: () => setState({ currentUser: undefined }),
    }),
    {
      name: 'userStorage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
