import { StateCreator } from 'zustand';

import { SidebarState, TSidebar } from './sidebar.type';

const initialState: SidebarState = { isOpenSidebar: false };

export const createSidebarSlice: StateCreator<TSidebar> = (set) => ({
  ...initialState,
  toggleSidebar: () =>
    set((state) => ({ isOpenSidebar: !state.isOpenSidebar })),
  closeSidebar: () => set({ isOpenSidebar: false }),
  openSidebar: () => set({ isOpenSidebar: true }),
});
