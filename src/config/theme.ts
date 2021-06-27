import {createMuiTheme, responsiveFontSizes} from '@material-ui/core';

export const theme = responsiveFontSizes(
  createMuiTheme({
    typography: {
      allVariants: {
        fontFamily: 'Comfortaa, cursive',
      },
    },
  }),
);
