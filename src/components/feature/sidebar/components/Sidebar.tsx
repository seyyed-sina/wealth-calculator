import { SidebarClose, SidebarItem } from '@components';

import { SidebarItems } from '../sidebar.data';

export const Sidebar = () => {
  return (
    <div className="flex flex-col h-full relative">
      <div className="flex flex-col justify-between gap-2 h-48 bg-primary-400 px-5 py-3">
        <SidebarClose />
        <div className="flex items-end">
          <h1 className="text-lg font-medium text-white">خمس من</h1>
        </div>
      </div>
      <nav className="grow mt-4">
        <ul className="flex flex-col">
          {SidebarItems.map((item) => (
            <SidebarItem key={item.title} item={item} />
          ))}
        </ul>
      </nav>
    </div>
  );
};

Sidebar.displayName = 'Sidebar';
