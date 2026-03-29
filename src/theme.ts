import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: '#f0f2f5',
      paper: '#ffffff',
    },
    primary: {
      main: '#4361ee',
    },
    text: {
      primary: '#1a1a2e',
      secondary: '#6b7280',
    },
  },
  typography: {
    fontFamily: `'Inter', -apple-system, BlinkMacSystemFont, sans-serif`,
    h6: { fontWeight: 700 },
    subtitle2: { fontWeight: 600 },
    body2: { color: '#6b7280' },
  },
  shape: {
    borderRadius: 10,
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
          border: '1px solid #f0f0f0',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 600,
          fontSize: '0.68rem',
          height: 22,
          borderRadius: 6,
        },
      },
    },
  },
});
