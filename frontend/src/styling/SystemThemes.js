import { createTheme } from "@mui/material";
import { outerTheme } from "./DefaultThemes.js";

const threePartTheme = (one, two, three) => {
  return createTheme({
    ...outerTheme,
    palette: {
      background: {
        default: one
      },
      primary: {
        main: one
      },
      secondary: {
        main: two
      },
      info: {
        main: three
      },
    },
    typography: {
      overline: {
        color: two
      },
    }
  });
}

// https://colors.muz.li/palette/ffa822/134e6f/ff6150/1ac0c6/dee0e6
const themeOne = threePartTheme('#dee0e6', '#134e6f', '#ff6150');

// https://colors.muz.li/palette/bbd4ce/839492/bbc3d4/bdd4bb/849483
const themeTwo = threePartTheme('#bbd4ce', '#839492', '#bbc3d4');

// https://colors.muz.li/palette/454d66/309975/58b368/dad873/efeeb4 green theme
const themeThree = threePartTheme('#efeeb4', '#454d66', '#dad873');

// https://colors.muz.li/palette/a862ea/6545a4/e7daff/ead062/a49245
const themeFour = threePartTheme('#e7daff', '#6545a4', '#ead062');


export const systemThemes = [themeOne, themeTwo, themeThree, themeFour];