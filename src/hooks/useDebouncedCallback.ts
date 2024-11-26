import { useCallback, useRef } from 'react';

type CallbackFunction = (...args: any[]) => void;
/**
 * Returns a memoized function that will only call the passed function when it hasn't been 
 * called for the wait period.
 *
 * @param {CallbackFunction} func - The function to be debounced.
 * @param {number} wait - The amount of time in milliseconds to wait before invoking the 
 * debounced function.
 * @return A memoized function that is debounced
 */
export const useDebouncedCallback = (
  func: CallbackFunction,
  wait: number,
): CallbackFunction => {
  // Use a ref to store the timeout between renders
  // and prevent changes to it from causing re-renders
  const timeout = useRef<NodeJS.Timeout>();

  return useCallback<CallbackFunction>(
    (...args) => {
      const later = () => {
        clearTimeout(timeout.current);
        func(...args);
      };

      clearTimeout(timeout.current);
      timeout.current = setTimeout(later, wait);
    },
    [func, wait],
  );
};
