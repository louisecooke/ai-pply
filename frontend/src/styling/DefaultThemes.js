import { createTheme } from "@mui/material";
import { grey } from "@mui/material/colors";
import { palette } from "@mui/system";

export const outerTheme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          color: palette.secondary
      }}
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
         "&.Mui-focused": {
            color: grey[700]
          }
        }
      }
    },
    Card: {
      root: {
        padding: 10
      }
    }
  },
});

// https://colors.muz.li/palette/361d32/543c52/f55951/edd2cb/f1e8e6
export const defaultTheme = createTheme({
  ...outerTheme,
  palette: {
    background: {
      default: '#edd2cb'
    },
    primary: {
      main: '#edd2cb'
    },
    secondary: {
      main: '#f55951'
    },
    info: {
      main: '#fdebd3'
    },
    greyText: {
      main: 'rgba(0, 0, 0, 0.6)'
    }
  },
  typography: {
    overline: {
      color: '#f55951'
    },
  }
});