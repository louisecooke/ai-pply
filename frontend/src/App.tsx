import "./styles.css";
import Homepage from "./routes/Homepage";

import Questionnaire from "./components/Questionnaire";
import Team from "./routes/Team";

import * as React from "react";
import { Routes, Route, Link } from "react-router-dom";
import { Button, Grid, Stack, Typography } from "@mui/material";

export default function App() {
  return (
    <div className="fill-window App">
      <Stack direction="row" justifyContent="flex-end" marginTop='14px'>
      <Typography sx={{ minWidth: 100 }}>
            <Link to="/" style={{textDecoration: 'none'}}><Typography variant='overline'>Try us out</Typography></Link>
          </Typography>

          <Typography sx={{ minWidth: 100 }}>
            <Link to="/questionnaire" style={{textDecoration: 'none'}}><Typography variant='overline'>Questionnaire</Typography></Link>
          </Typography>

          <Typography sx={{ minWidth: 100 }}>
            <Link to="/team" style={{textDecoration: 'none'}}><Typography variant='overline'>Team</Typography></Link>
          </Typography>
      </Stack>
      <Routes>
        <Route path="/*" element={<Homepage />} />
        <Route path="questionnaire" element={<Questionnaire />} />
        <Route path="team" element={<Team />} />
      </Routes>
    </div>
  );
}
