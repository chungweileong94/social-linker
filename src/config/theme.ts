import {createMuiTheme, responsiveFontSizes} from '@material-ui/core';

export const theme = responsiveFontSizes(
  createMuiTheme({
    palette: {
      primary: {
        main: '#ab47bc',
        light: '#df78ef',
        dark: '#790e8b',
        contrastText: '#ffffff',
      },
    },
    typography: {
      allVariants: {
        fontFamily: 'Comfortaa, cursive',
      },
    },
  }),
);
