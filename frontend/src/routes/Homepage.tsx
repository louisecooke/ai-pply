import { Grid, Button, Container, Stack, Card, CardContent } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import * as React from "react";
import SystemList from "./SystemList";
import Questionnaire from "../components/Questionnaire";
import "../styles.css";

import { VARIANTS } from "../types";
import ConsentForm from "./ConsentForm";
import Playground from "./Playground";
import Demographic from './Demographic';
const resume = require("../imgs/andrea-piacquadio-resume.jpg");

/* const hiringManager: Scenario = {
  name: "Hiring Manager",
  description: "Vet applicants for your recent job openings.",
  image: resume.default,
  link: "/hiring"
}; */

/* const scenarioList = [hiringManager]; */

/* const scenarios = () => {
  return (
    <Grid container spacing={10} justifyContent="space-evenly">
        {scenarioList.map((s: Scenario) => (
          <Grid item key={s.name}>
            <ScenarioCard scenario={s} />
          </Grid>
        ))}
    </Grid>);
}
 */


type Props = {
  setTheme: Function;
}

export default function Homepage({setTheme}: Props) {
  
  const [page, setPage] = React.useState(0);

  const next = () => {
    if (page + 1 < workflow.length) {
      setPage(page + 1);
    }
  }

  function Opener() {
    return (
      <Stack>
            <div>
      <Card sx={{padding: 5}}>
      <CardContent>
      Welcome, project description, etc.
      </CardContent> 
      <Button variant='contained' color='secondary' onClick={next}>Start study</Button>
      </Card>
      <br />
      <br />
    </div>
      </Stack>
    );
  };

  const workflow = [
    Opener(),
    <ConsentForm next={next}/>,
    <Questionnaire variant={VARIANTS.WELLBEING} finish={next}/>,
    <SystemList setTheme={setTheme} onFinish={next}/>,
    <Demographic />
  ]

  return (
    <Container>

      <Routes>
        <Route path="*" element={workflow[page]} />
        <Route path="hiring" element={<Playground />} />
      </Routes>
      <br />
      <br />
      
    </Container>
  );
}
