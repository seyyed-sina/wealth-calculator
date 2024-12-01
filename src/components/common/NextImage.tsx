'use client';
import { memo } from 'react';

import Image, { ImageProps } from 'next/image';

import { ImageError } from '@components';
import { useToggle } from '@hooks';
import { clx } from '@utils';

type NextImageProps = ImageProps;

export const NextImage = memo((props: NextImageProps) => {
  const [isError, toggleError] = useToggle();
  const [isLoaded, toggleLoaded] = useToggle();

  return !isError ? (
    <Image
      onError={toggleError}
      onLoad={toggleLoaded}
      onLoadingComplete={toggleLoaded}
      quality={100}
      {...props}
      className={clx(
        'size-full opacity-0',
        isLoaded && '!opacity-100 transition-opacity !duration-700',
        props.className,
      )}
    />
  ) : (
    <ImageError className={props.className} />
  );
});

NextImage.displayName = 'NextImage';
