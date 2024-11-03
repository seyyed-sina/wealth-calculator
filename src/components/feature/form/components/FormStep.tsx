// 'use client';;
import { memo, PropsWithChildren } from 'react';

import { clx } from '@utils';

type FormStepProps = PropsWithChildren<{
  className?: string;
}>;

export const FormStep = memo(({ children, className }: FormStepProps) => {
  // const direction = useStore((state) => state.direction);

  // <motion.div
  //   initial="initial"
  //   animate="animate"
  //   variants={stepVariant[direction]}
  //   transition={{ duration: 0.35, easing: 'easeIn' }}
  //   className={clx('flex-1 flex flex-col h-full', className)}>
  //   {children}
  // </motion.div>
  return (
    <div
      className={clx(
        'relative overflow-y-auto h-[calc(100dvh-160px-128px-52px)] overflow-x-hidden scrollbar-none flex flex-col flex-1',
        className,
      )}>
      {children}
    </div>
  );
});

FormStep.displayName = 'FormStep';
