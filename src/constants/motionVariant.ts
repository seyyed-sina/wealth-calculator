import { Variants } from 'framer-motion';

export const stepVariant: { next: Variants; prev: Variants } = {
  next: {
    initial: { x: 8, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: -8, opacity: 0 },
  },
  prev: {
    initial: { x: -8, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: 8, opacity: 0 },
  },
};

export const userDropdownVariant: Variants = {
  initial: { y: 2, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  exit: { y: 2, opacity: 0 },
};

export const dropdownListVariant: Variants = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

export const userDropdownItemVariant: Variants = {
  visible: { y: 0, opacity: 1 },
  hidden: { y: 4, opacity: 0 },
};
