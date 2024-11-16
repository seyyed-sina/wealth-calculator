import { SupabaseUser } from '@supabase/supabase-js';
import { StateCreator } from 'zustand';

import { UserSlice, UserState } from './user.types';

const initialState: UserState = {
  isOpenDropdown: false,
  user: null,
};

export const createUserSlice: StateCreator<UserSlice> = (set) => ({
  ...initialState,
  setUser: (user: SupabaseUser | null) => set(() => ({ user })),
  toggleDropdown: () =>
    set((state) => ({ isOpenDropdown: !state.isOpenDropdown })),
});
