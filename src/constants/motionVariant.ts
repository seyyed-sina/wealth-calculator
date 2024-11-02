export const stepVariant = {
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
