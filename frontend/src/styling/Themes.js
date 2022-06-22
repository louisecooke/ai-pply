import { createTheme } from "@mui/material";
import { orange } from "@mui/material/colors";

export const outerTheme = createTheme({
  palette: {
    primary: {
      main: '#b0d5de'
    },
    secondary: {
      main: orange[500]
    }
  },
  //this doesn't work
  components: {
    MuiButton: {
      color: 'palette.secondary'
      }
  }
});
