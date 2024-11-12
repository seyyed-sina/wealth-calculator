import { ImageResponse } from 'next/og';

import { colorValue } from '@constants';

export const runtime = 'edge';

export const size = {
  width: 42,
  height: 42,
};

export const contentType = 'image/png';

const Icon = () => {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 28,
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: colorValue.primary[400],
        }}>
        KM
      </div>
    ),
    size,
  );
};

export default Icon;
