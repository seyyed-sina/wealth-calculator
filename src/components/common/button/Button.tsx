import { ButtonHTMLAttributes, memo, ReactNode, useMemo } from 'react';

import { cva, VariantProps } from 'cva';
import Link, { LinkProps } from 'next/link';

import { XOR } from '@types';
import { clx } from '@utils';

export const buttonVariants = cva({
  base: 'flex items-center justify-center text-center select-none rounded-lg relative group overflow-hidden transition-all duration-300 border-none shrink-0 outline-0 focus:outline-0',
  variants: {
    variant: {
      empty: 'bg-transparent !p-0',
      white: 'bg-white hover:bg-gray-50',
      primary: 'bg-primary text-white hover:bg-primary-500',
      'gray-100': 'bg-gray-50 hover:bg-gray-100 text-gray-700',
      green: 'bg-green text-white hover:bg-green-500',
      red: 'bg-red-400 text-white hover:bg-red-300',
      'border-primary':
        'border-2 border-solid border-primary text-primary hover:bg-primary hover:text-white',
      'border-gray-100':
        'border-2 border-solid border-gray-100 text-gray-700 hover:border-primary',
    },
    size: {
      empty: 'p-0',
      small: 'text-sm py-1 px-3 h-10',
      medium: 'text-base py-2 px-4 h-11',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'medium',
  },
});

export type ButtonBaseProps = VariantProps<typeof buttonVariants> &
  XOR<{ children: ReactNode }, { label: string }> & {
    className?: string;
  };

export type TButtonProps = {
  tag?: 'button';
} & ButtonBaseProps &
  ButtonHTMLAttributes<HTMLButtonElement>;

export type TLinkProps = {
  tag: 'a';
} & ButtonBaseProps &
  LinkProps;

export type ButtonProps = TButtonProps | TLinkProps;

export const Button = memo(
  ({ children, label, size, variant, className, ...props }: ButtonProps) => {
    const baseClass = useMemo(
      () => clx(buttonVariants({ variant, size, className })),
      [className, size, variant],
    );

    if (props.tag === 'a') {
      const { ...rest } = props;
      return (
        <Link className={baseClass} aria-label={label} {...rest}>
          {label ?? children}
        </Link>
      );
    }

    const { ...rest } = props;
    const buttonClass = clx(
      baseClass,
      rest.disabled && 'cursor-not-allowed opacity-70 pointer-events-none',
      className,
    );

    return (
      <button
        type="button"
        className={buttonClass}
        aria-label={label}
        disabled={rest.disabled}
        aria-disabled={rest.disabled}
        {...rest}>
        {label ?? children}
      </button>
    );
  },
);

Button.displayName = 'Button';
