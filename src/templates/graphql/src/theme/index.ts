// 1. Import `extendTheme`
import { extendTheme } from '@chakra-ui/react';

const primary = '#078080';
// 2. Call `extendTheme` and pass your custom values
const theme = extendTheme({
  styles: {
    global: () => ({

    }),
  },
  colors: {
    primary,
    gray: {
      200: '#DFE5EC',
      600: '#636972',
      800: '#343C46',
    },
  },
  fonts: {
    body: 'Inter, sans-serif',
    heading: 'Inter, serif',
    mono: 'Inter, monospace',
  },

  fontSizes: {
    xs: '12px',
    sm: '14px',
    md: '14px',
    lg: '18px',
  },
});
export default theme;
