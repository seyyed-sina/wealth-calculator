'use client';
import {
  FC,
  PropsWithChildren,
  memo,
  useCallback,
  useEffect,
  useState,
} from 'react';

import { createPortal } from 'react-dom';

import { BottomSheetHeader } from '@components';
import { clx } from '@utils';

export interface SheetProps {
  isOpen: boolean;
  onClose: () => void;
}

type Props = SheetProps &
  PropsWithChildren<{
    title?: string;
    className?: string;
    headerClassName?: string;
    backdrop?: boolean;
  }>;

export const BottomSheet: FC<Props> = memo(
  ({
    isOpen,
    title,
    onClose,
    children,
    className,
    headerClassName,
    backdrop = true,
  }) => {
    const [show, setShow] = useState(false);
    const [animate, setAnimate] = useState(false);
    const handleContainerClick = useCallback(() => onClose(), [onClose]);

    useEffect(() => {
      let timer: NodeJS.Timeout;
      if (isOpen) {
        setShow(true);
        setTimeout(() => setAnimate(true), 10); // Add a small delay to trigger the animation
      } else {
        setAnimate(false);
        // Delay the removal to allow animation to complete
        timer = setTimeout(() => setShow(false), 400);
        return () => clearTimeout(timer);
      }
    }, [isOpen]);

    if (!show && !isOpen) {
      return null;
    }

    return createPortal(
      <div className="fixed inset-0 z-50 flex items-end justify-center">
        <div
          className={clx(
            'relative z-50 w-full rounded-t-xl transition-transform !duration-[400ms] !ease-sheet overflow-hidden',
            !backdrop && 'shadow-sheet',
            animate ? 'translate-y-0' : 'translate-y-full',
            className,
          )}>
          {title && (
            <BottomSheetHeader
              title={title}
              className={headerClassName}
              onClose={handleContainerClick}
            />
          )}
          {children}
        </div>
        <div
          className={clx(
            'fixed inset-0 z-40 bg-black/50 transition-opacity duration-[400ms]',
            animate && backdrop ? 'opacity-100' : 'opacity-0',
          )}
          onKeyDown={handleContainerClick}
          onClick={handleContainerClick}
        />
      </div>,
      document.body,
    );
  },
);

BottomSheet.displayName = 'BottomSheet';
