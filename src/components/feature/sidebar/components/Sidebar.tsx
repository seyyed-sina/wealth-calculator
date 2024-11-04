import { SidebarItem } from '@components';

import { SidebarItems } from '../sidebar.data';

export const Sidebar = () => {
  return (
    <nav>
      <ul className="flex flex-col">
        {SidebarItems.map((item) => (
          <SidebarItem key={item.title} item={item} />
        ))}
      </ul>
    </nav>
  );
};

Sidebar.displayName = 'Sidebar';
