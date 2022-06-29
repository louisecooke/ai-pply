import "./styles.css";
import Homepage from "./routes/Homepage";

import * as React from "react";
import {Link } from "react-router-dom";
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
            <Link to="/" style={{textDecoration: 'none'}}><Typography variant='overline'>Try us out</Typography></Link>
          </Typography>

          <Typography sx={{ minWidth: 100 }}>
            <Link to="/team" style={{textDecoration: 'none'}}><Typography variant='overline'>Playground</Typography></Link>
          </Typography>
      </Stack>
        <Homepage setTheme={setTheme}/>
{/*       <Routes>
        <Route path="
        <Route path="team" element={<SystemList onFinish={console.log('done')}/>} /> 
      </Routes> */}
    </div>
    </ThemeProvider>
  );
}
