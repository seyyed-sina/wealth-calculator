import { memo } from 'react';

import { LucidIcon } from '@components';

import { SocialItem } from '../contact.types';

interface ContactSocialItemProps {
  social: SocialItem;
}

export const ContactSocialItem = memo(({ social }: ContactSocialItemProps) => {
  return (
    <a
      href={social.url}
      target="_blank"
      rel="noreferrer"
      title={social.social}
      className="flex items-center gap-2">
      <span className="size-8 flex items-center justify-center bg-primary-50 rounded-md">
        <LucidIcon
          name={social.icon}
          className="size-5"
          stroke={social.color}
        />
      </span>
      <span className="leading-none flex items-center gap-1 hover:underline hover:underline-offset-1">
        {social.title}
        <LucidIcon name="external-link" className="size-3" />
      </span>
    </a>
  );
});

ContactSocialItem.displayName = 'ContactSocialItem';
