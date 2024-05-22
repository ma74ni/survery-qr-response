import { createTheme, responsiveFontSizes  } from '@mui/material/styles';

let theme = createTheme({
  palette: {
    primary: {
      main: '#AE9F6B',
    },
    secondary: {
      main: '#ff4081',
    },
  },
  typography: {
    fontSize: 16,
    htmlFontSize: 16,
    h1: {
      fontSize: '2.5rem',
    },
    h2: {
      fontSize: '2rem',
    },
    h3: {
      fontSize: '1.75rem',
    },
  
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: '1rem',
          textTransform: 'none',
        },
        contained: {
          color: '#fff',
        },
        
      },
    },
    
  }
});
theme = responsiveFontSizes(theme);
export default theme;