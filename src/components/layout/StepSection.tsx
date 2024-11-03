import { memo, PropsWithChildren } from 'react';

import { LucidIcon } from '@components';
import { clx } from '@utils';

interface StepSectionProps extends PropsWithChildren {
  title: string;
  className?: string;
  icon?: string;
  description?: string;
}

export const StepSection = memo(
  ({ title, icon, description, children, className }: StepSectionProps) => {
    return (
      <section className={clx('flex flex-col', className)}>
        <h2 className="text-xl font-medium mb-6 flex items-center gap-2">
          {icon && <LucidIcon name={icon} size={22} strokeWidth={2} />}
          {title}
        </h2>
        {description && (
          <p className="text-sm text-gray-500 mb-6 leading-6">{description}</p>
        )}
        {children}
      </section>
    );
  },
);

StepSection.displayName = 'StepSection';
