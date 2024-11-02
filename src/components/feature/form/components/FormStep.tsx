'use client';
import { memo, PropsWithChildren } from 'react';

import { motion } from 'framer-motion';

import { stepVariant } from '@constants';
import { clx } from '@utils';

type FormStepProps = PropsWithChildren<{
  direction: 'next' | 'prev';
  className?: string;
}>;

export const FormStep = memo(
  ({ children, direction, className }: FormStepProps) => {
    return (
      <motion.div
        initial="initial"
        animate="animate"
        variants={stepVariant[direction]}
        transition={{ duration: 0.35, easing: 'easeIn' }}
        className={clx('flex-1 flex flex-col h-full', className)}>
        {children}
      </motion.div>
    );
  },
);

FormStep.displayName = 'FormStep';
