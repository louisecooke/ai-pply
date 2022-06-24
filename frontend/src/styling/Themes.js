import { createTheme } from "@mui/material";
import { orange, grey } from "@mui/material/colors";
import { palette } from "@mui/system";

export const outerTheme = createTheme({
  
  palette: {
    primary: {
      main: '#b0d5de'
    },
    secondary: {
      main: orange[500]
    },
    greyText: {
      main: 'rgba(0, 0, 0, 0.6)'
    }
  },

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
