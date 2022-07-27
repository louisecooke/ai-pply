import { Button, Container, Stack, Card, CardContent } from "@mui/material";
import { Route, Routes, Link, useNavigate } from "react-router-dom";
import * as React from "react";
import SystemList from "./SystemList";
import Questionnaire from "./Questionnaire";
import "../styles.css";
import { Manipulation, Completion } from "../types";

import { VARIANTS } from "../types";
import ConsentForm from "./ConsentForm";
import TaskExplanation from "./TaskExplanation";
import Demographic from './Demographic';
const resume = require("../imgs/andrea-piacquadio-resume.jpg");

type Props = {
  setTheme: Function;
}

export default function Homepage({setTheme}: Props) {
  const [systems, setSystems] = React.useState([] as Manipulation[]);
  let navigate = useNavigate();

  const getSystems = async () => {
    let response = await fetch("api/systems/");
    let data = await response.json();
    setSystems(data as Manipulation[]);
  }

  React.useEffect( () => {
    getSystems();
  }, []);

  function LandingPage() {
    return (
      <Container>
      <Stack>
            <div>
      <Card sx={{padding: 5}}>
      <CardContent>
      Welcome, and we're happy you're here! If you're ready to get started, click the button below. 
      </CardContent> 
      <Link to="/consent" style={{textDecoration: 'none'}}>
      <Button variant='contained' color='secondary'>Start study</Button></Link>
      </Card>
      <br />
      <br />
    </div>
      </Stack>
      </Container>
    );
  };

  function nextStep(nextUrl: string) {
    navigate(nextUrl, { replace: true });
  }

  return (
  <Routes>
    <Route path="*" element={LandingPage()} />,
    <Route path="/consent" element={<ConsentForm next={() => nextStep("../wellbeing")} />} />,
    <Route path="/wellbeing" element={<Questionnaire variant={VARIANTS.WELLBEING} next={() => nextStep("../explanation")} />} />,
    <Route path="/explanation" element={<TaskExplanation systemList={systems} next={() => nextStep("../hiring")}/>} />,
    <Route path="/hiring" element={<SystemList setTheme={setTheme} systemList={systems} next={() => nextStep("../demographic")}/>}/>,
    <Route path="/demographic" element={<Demographic />} />
  </Routes>
  );
}
