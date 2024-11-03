export const colorValue = {
  // primary: {
  //   DEFAULT: '#38B2AC', // Teal base
  //   100: '#E6FFFA', // Light teal
  //   200: '#B2F5EA', // Lighter teal
  //   300: '#81E6D9', // Light cyan
  //   400: '#4FD1C5', // Medium teal
  //   500: '#319795',
  // },
  // primary: {
  //   DEFAULT: '#7B68EE', // Your base color
  //   100: '#E6E8FF', // Lightest shade
  //   200: '#C4C8FF', // Lighter
  //   300: '#A3A7FF', // Light
  //   400: '#7B68EE', // Medium
  //   500: '#6A5ACD', // Base color
  //   600: '#5D5FEF', // Darker
  //   700: '#4B4CC4', // Deeper
  //   800: '#3A3A99', // Dark
  //   900: '#29296F', // Darkest
  // },
  primary: {
    DEFAULT: '#6371D6', // Primary color with more blue
    100: '#E8EBFA', // Lightest shade
    200: '#C3CCF2', // Lighter
    300: '#9FADF1', // Light
    400: '#7D8DE8', // Medium
    500: '#6371D6', // Base color
    600: '#505CB1', // Darker
    700: '#3D4792', // Deeper
    800: '#2B3472', // Dark
    900: '#1A2351', // Darkest
  },
  secondary: {
    DEFAULT: '#F43F5E',
    100: '#FFE4E9',
    200: '#FFB8C5',
    300: '#FF8CA1',
    400: '#F43F5E',
    500: '#E11D48',
  },
  green: {
    DEFAULT: '#38A169',
    100: '#D4EDDA',
    200: '#A9DCC3',
    300: '#7CCBAA',
    400: '#38A169',
    500: '#2F855A',
  },
  red: {
    DEFAULT: '#D66767', // Base red color
    100: '#FBE6E6', // Lightest red
    200: '#F4B8B8', // Lighter red
    300: '#ED8A8A', // Light red
    400: '#E66666', // Medium red
    500: '#D66767', // Base red (main)
    600: '#B15353', // Darker red
    700: '#8D3F3F', // Deeper red
    800: '#6A2C2C', // Dark red
    900: '#471A1A', // Darkest red
  },
  // gray: {
  //   DEFAULT: '#A5A5A5',
  //   100: '#F5F5F5',
  //   200: '#E1E1E1',
  //   300: '#C7C7C7',
  //   400: '#A5A5A5',
  //   500: '#6B6B6B',
  //   600: '#1E1F29',
  // },
  gray: {
    DEFAULT: '#A3A8B8', // Neutral gray with primary undertone
    100: '#F2F3F6', // Lightest
    200: '#D8DAE1', // Lighter
    300: '#BEC2CC', // Light
    400: '#A3A8B8', // Medium (base)
    500: '#888DA0', // Darker
    600: '#6C7083', // Deep
    700: '#515364', // Dark
    800: '#363846', // Darker
    900: '#1B1C24', // Darkest
  },
  text: {
    DEFAULT: '#2B2D3C', // Deep neutral with a subtle undertone from primary
    light: '#E8EBFA', // Light text for dark backgrounds
    muted: '#6C7083', // Muted for secondary text (matches gray)
    dark: '#1C1D29', // Darker, richer shade for titles
  },
} as const;
