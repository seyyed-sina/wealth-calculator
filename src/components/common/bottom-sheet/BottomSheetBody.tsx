import { ComponentPropsWithoutRef, HTMLAttributes } from 'react';

import { clx } from '@utils';

// All valid HTML tags like 'div' | 'form' | 'a' | ...
type ValidTags = keyof JSX.IntrinsicElements;

// Generic type to generate HTML props based on its tag
type Props<T extends ValidTags> = {
  tag?: T | ValidTags;
} & (ComponentPropsWithoutRef<T> & HTMLAttributes<HTMLOrSVGElement>);

/**
 * Make the default tag a constant to make it easy to infer both the default
 * generic parameter and the `tag` prop
 */
const DEFAULT_TAG = 'div';

// Use the default `div` tag for both the generic parameter and `tag` prop
export function BottomSheetBody<T extends ValidTags = typeof DEFAULT_TAG>({
  tag = DEFAULT_TAG,
  className,
  children,
  ...props
}: Props<T>) {
  const Element: ValidTags = tag;

  return (
    //@ts-expect-error: it should warn because the tag is not a valid HTML tag
    <Element
      className={clx(
        'p-4 dark:bg-black dark:text-white bg-gray-100 text-black',
        className,
      )}
      {...props}>
      {children}
    </Element>
  );
}

BottomSheetBody.displayName = 'BottomSheetBody';
