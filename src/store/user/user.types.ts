import { SupabaseUser } from '@supabase/supabase-js';

export interface UserState {
  user: SupabaseUser | null;
  isOpenDropdown: boolean;
}

export interface UserAction {
  setUser: (user: SupabaseUser | null) => void;
  toggleDropdown: () => void;
  closeDropdown: () => void;
}

export type UserSlice = UserState & UserAction;
