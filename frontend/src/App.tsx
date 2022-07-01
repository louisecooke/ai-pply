import "./styles.css";
import Homepage from "./routes/Homepage";
import Playground from "./routes/Playground";

import * as React from "react";
import { Link, Routes, Route } from "react-router-dom";
import { Stack, Typography } from "@mui/material";

import { ThemeProvider } from "@mui/material/styles";
import { defaultTheme } from "./styling/DefaultThemes.js";

import { CssBaseline } from "@mui/material";


export default function App() {
  const [theme, setTheme] = React.useState(defaultTheme);
  return (
    <ThemeProvider theme={theme}>
    <CssBaseline/>
    <div className="fill-window App">
      <Stack direction="row" justifyContent="flex-end" marginTop='14px' marginRight='20px' spacing='10px'>
      <Typography sx={{ minWidth: 100 }}>
            <Link to="/" style={{textDecoration: 'none'}}><Typography variant='overline'>Participate</Typography></Link>
          </Typography>

          <Typography sx={{ minWidth: 100 }}>
            <Link to="/playground" style={{textDecoration: 'none'}}><Typography variant='overline'>Playground</Typography></Link>
          </Typography>
      </Stack>
      <Routes>
        <Route path="*" element={
        <Homepage setTheme={setTheme} />}/>
        <Route path="playground" element={<Playground />} /> 
      </Routes>
    </div>
    </ThemeProvider>
  );
}
