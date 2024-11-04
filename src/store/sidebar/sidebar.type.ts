export interface SidebarState {
  isOpenSidebar: boolean;
}

export interface SidebarAction {
  closeSidebar: () => void;
  openSidebar: () => void;
  toggleSidebar: () => void;
}

export type TSidebar = SidebarState & SidebarAction;
