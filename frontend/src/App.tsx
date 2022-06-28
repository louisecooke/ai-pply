import "./styles.css";
import Homepage from "./routes/Homepage";

import Questionnaire from "./components/Questionnaire";
import SystemList from "./routes/SystemList";

import * as React from "react";
import { Routes, Route, Link } from "react-router-dom";
import { Button, Grid, Stack, Typography, Container } from "@mui/material";

export default function App() {
  return (
    <div className="fill-window App">
      <Stack direction="row" justifyContent="flex-end" marginTop='14px' marginRight='20px' spacing='10px'>
      <Typography sx={{ minWidth: 100 }}>
            <Link to="/" style={{textDecoration: 'none'}}><Typography variant='overline'>Try us out</Typography></Link>
          </Typography>

          <Typography sx={{ minWidth: 100 }}>
            <Link to="/team" style={{textDecoration: 'none'}}><Typography variant='overline'>Playground</Typography></Link>
          </Typography>
      </Stack>
        <Homepage />
{/*       <Routes>
        <Route path="
        <Route path="team" element={<SystemList onFinish={console.log('done')}/>} /> 
      </Routes> */}
    </div>
  );
}
