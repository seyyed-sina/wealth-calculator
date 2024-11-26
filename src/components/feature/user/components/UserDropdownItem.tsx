import { memo, PropsWithChildren } from 'react';

type UserDropdownItemProps = PropsWithChildren;

export const UserDropdownItem = memo(({ children }: UserDropdownItemProps) => {
  return (
    <li
      className="flex items-center gap-2 text-sm min-h-12
    border-b border-solid border-b-gray-100 last:border-0">
      {children}
    </li>
  );
});

UserDropdownItem.displayName = 'UserDropdownItem';
