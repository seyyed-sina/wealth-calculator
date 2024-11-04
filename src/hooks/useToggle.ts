import { useCallback, useMemo, useState } from 'react';

/**
 * A hook to manage a boolean toggle state.
 *
 * @param {boolean} [isOpen=false] - The initial state of the toggle.
 * @returns {[boolean, () => void]} - A tuple containing the current state and a function to toggle the state.
 */
export const useToggle = (isOpen = false): [boolean, () => void] => {
  const [open, setOpen] = useState(isOpen);
  const toggle = useCallback(() => setOpen((prev) => !prev), []);

  return useMemo(() => [open, toggle], [open, toggle]);
};
