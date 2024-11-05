import scrollbar from 'tailwind-scrollbar';
import type { Config } from 'tailwindcss';

import { colorValue } from './src/constants/colorValue';

const scrollbarPlugin = scrollbar({
  nocompatible: true,
});

const config: Config = {
  content: [
    './Components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
        },
        screens: {
          xs: '30rem',
          sm: '36rem',
          md: '48rem',
          lg: '60rem',
          tall: { raw: '(min-height: 680px)' },
        },
      },
      colors: colorValue,
      fontFamily: {
        vazir: ['var(--font-vazir)'],
      },
      screens: {
        xs: '30rem',
      },
      spacing: {
        13: '3.25rem',
        15: '3.75rem',
        17: '4.25rem',
        18: '4.5rem',
        19: '4.75rem',
        22: '5.5rem',
        23: '5.75rem',
        25: '6.25rem',
        26: '6.5rem',
        27: '6.75rem',
        30: '7.5rem',
        34: '8.5rem',
        42: '10.5rem',
        46: '11.5rem',
        120: '30rem',
        180: '45rem',
      },
      zIndex: {
        1: '1',
        2: '2',
        3: '3',
        4: '4',
        5: '5',
        6: '6',
        7: '7',
        8: '8',
        9: '9',
      },
    },
  },
  plugins: [scrollbarPlugin],
};
export default config;
