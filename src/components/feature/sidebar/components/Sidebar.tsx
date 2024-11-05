import { SidebarItem } from '@components';

import { SidebarItems } from '../sidebar.data';

export const Sidebar = () => {
  return (
    <div className="flex flex-col h-full">
      <div className="h-64 bg-primary-400 w-full flex items-end px-5 py-3">
        <h1 className="text-lg font-medium text-white"> خمس من</h1>
      </div>
      <nav className="h-full mt-4">
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
