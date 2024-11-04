'use client'
import { RefObject, useEffect } from 'react';

/**
 * Hook that handles outside click events.
 * @param ref - Reference to the HTMLElement
 * @param handler - Function to be called on outside click
 */

export const useOutsideClick = (
  ref: RefObject<HTMLElement>,
  handler: () => void,
) => {
  useEffect(() => {
    const handleClick = (event: MouseEvent | TouchEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handler();
      }
    };

    document.addEventListener('click', handleClick, { passive: true });
    // document.addEventListener('touchstart', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
      // document.removeEventListener('touchstart', handleClick);
    };
  }, [ref, handler]);
};
