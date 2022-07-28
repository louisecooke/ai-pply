import "./styles.css";
import Homepage from "./study-elements/Homepage";
import ConsentForm from "./study-elements/ConsentForm";
import SystemList from "./study-elements/SystemList";
import Questionnaire from "./study-elements/Questionnaire";
import Demographic from "./study-elements/Demographic";
import Tutorial from "./study-elements/Tutorial";


import * as React from "react";
import { Link, Routes, Route, useNavigate } from "react-router-dom";
import { Stack, Typography } from "@mui/material";
import { Manipulation, VARIANTS, Completion } from "./types";

import { ThemeProvider } from "@mui/material/styles";
import { defaultTheme } from "./styling/DefaultThemes.js";
import { CssBaseline } from "@mui/material";

export const SystemContext = React.createContext([] as Completion[]);

export default function App() {
  const [theme, setTheme] = React.useState(defaultTheme);
  const [systems, setSystems] = React.useState([] as Completion[]);
  const [loaded, setLoaded] = React.useState(false);
  
  const getSystems = async () => {
    let response = await fetch("api/systems/");
    let data = await response.json();
    let sys = data.map( (s: Manipulation) => {
      return ({
        system: s,
        interacted: false
      } as Completion);
    });
    setSystems(sys);
    setLoaded(true);
  }

  React.useEffect( () => {
    getSystems();
  }, []);

  const navigate = useNavigate();

  function nextStep(nextUrl: string) {
    navigate(nextUrl, { replace: true });
  }


  return (
    <ThemeProvider theme={theme}>
    <CssBaseline />
    <SystemContext.Provider value={systems}>
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
        <Route path="/" element={<Homepage next={() => nextStep("../wellbeing")}/>} />,
        <Route path="/consent" element={<ConsentForm next={() => nextStep("../wellbeing")} />} />,
        <Route path="/wellbeing" element={<Questionnaire variant={VARIANTS.WELLBEING} next={() => nextStep("../tutorial")} />} />,
        <Route path="/tutorial" element={<Tutorial next={() => nextStep("../hiring")}/>} />,
        <Route path="/hiring" element={<SystemList setTheme={setTheme} next={() => nextStep("../demographic")}/>}/>,
        <Route path="/demographic" element={<Demographic />} />
      </Routes>
    </div>
    </SystemContext.Provider>
    </ThemeProvider>
  );
}