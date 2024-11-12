export const colorValue = {
  primary: {
    50: '#E4F4EF', // Very light primary for backgrounds
    100: '#BCE4D6', // Light primary shade
    200: '#94D4BD', // Lighter primary for subtle accents
    300: '#6DC4A4', // Mid-light primary
    400: '#4CB68E', // Medium primary
    DEFAULT: '#3FAF8B', // Primary base (slightly sharpened)
    500: '#379B7D', // Darker than base primary
    600: '#2C7A65', // Darker primary for buttons or icons
    700: '#21664E', // Even darker for text
    800: '#154339', // Near-dark for contrast
    900: '#0A231E', // Deepest primary shade
  },
  secondary: {
    50: '#E8F2FF',
    100: '#C7DFFF',
    200: '#A5CBFF',
    300: '#84B8FF',
    400: '#62A4FF',
    DEFAULT: '#5083E0',
    500: '#4673C4',
    600: '#3A5DA3',
    700: '#2F477D',
    800: '#243157',
    900: '#1A1E30',
  },
  green: {
    50: '#EAF9F1',
    100: '#C9F2DC',
    200: '#A6EAC6',
    300: '#83E1B1',
    400: '#60D89B',
    DEFAULT: '#4ABF5B',
    500: '#44A751',
    600: '#388645',
    700: '#2C6535',
    800: '#204425',
    900: '#132315',
  },
  red: {
    50: '#FCEAE9',
    100: '#F9C8C5',
    200: '#F4A29E',
    300: '#EF7D77',
    400: '#EA5750',
    DEFAULT: '#D9544F',
    500: '#BF4A45',
    600: '#9E3C38',
    700: '#7A2E2A',
    800: '#571F1C',
    900: '#2D0F0E',
  },
  // gray: {
  //   50: '#F4F8F7', // Very light gray for backgrounds
  //   100: '#E1E8E7', // Light gray for backgrounds or dividers
  //   200: '#CBD4D2', // Mid-light gray for form inputs or dividers
  //   300: '#B1BCBA', // Neutral gray
  //   400: '#8E9E9C', // Gray for secondary text or subtle icons
  //   500: '#6B7E7B', // Mid-gray for body text
  //   600: '#566563', // Slightly darker gray
  //   700: '#414F4D', // Dark gray for high-contrast text
  //   800: '#2B3937', // Very dark gray for main headings or footer text
  //   900: '#15211F', // Near-black for primary text or headers
  // },
  gray: {
    50: '#F9F9F9', // Very light gray
    100: '#E6E6E6', // Light gray
    200: '#CCCCCC', // Mid-light gray for form inputs or dividers
    300: '#B3B3B3', // Medium gray
    400: '#999999', // Gray for secondary text or subtle icons
    500: '#808080', // Dark gray
    600: '#666666', // Slightly darker gray
    700: '#4D4D4D', // Almost black
    800: '#333333', // Very dark gray for main headings or footer text
    900: '#1A1A1A', // Near-black for primary text or headers
    DEFAULT: '#808080',
  },
  text: {
    DEFAULT: '#4D4D4D', // Base text color with a cool undertone
    light: '#4F6561', // Lighter text for secondary elements
    dark: '#1D2925', // Darker text for headers
  },
  error: '#D9544F',
  success: '#4ABF5B',
  telegram: '#0088cc',
  linkedin: '#0a66c2',
  gmail: '#ea4335',
  whatsapp: '#25D366',
  facebook: '#4267B2',
  twitter: '#1DA1F2',
  phone: '#0088cc',
} as const;
