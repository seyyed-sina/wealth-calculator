import { memo, PropsWithChildren } from 'react';

import { LucidIcon } from '@components';
import { clx } from '@utils';

interface StepSectionProps extends PropsWithChildren {
  title: string;
  className?: string;
  icon?: string;
}

export const StepSection = memo(
  ({ title, icon, children, className }: StepSectionProps) => {
    return (
      <section className={clx('absolute inset-0 flex flex-col', className)}>
        <h2 className="text-xl font-medium mb-6 flex items-center gap-2">
          {icon && <LucidIcon name={icon} size={22} strokeWidth={2} />}
          {title}
        </h2>
        {children}
      </section>
    );
  },
);

StepSection.displayName = 'StepSection';
