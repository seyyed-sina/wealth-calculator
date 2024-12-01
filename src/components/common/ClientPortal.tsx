'use client';
import { PropsWithChildren, useEffect, useRef } from 'react';

import { createPortal } from 'react-dom';

interface ClientPortalProps extends PropsWithChildren {
  show?: boolean;
  onClose?: () => void;
}

export const ClientPortal = ({ children, show }: ClientPortalProps) => {
  const ref = useRef<Element | null>(null);
  useEffect(() => {
    ref.current = document.body;
  }, []);
  return show && ref.current ? createPortal(children, ref.current) : null;
};
