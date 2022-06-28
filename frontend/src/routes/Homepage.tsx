import { Grid, Button, Container } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import * as React from "react";
import SystemList from "./SystemList";
import Questionnaire from "../components/Questionnaire";
import "../styles.css";

import { VARIANTS} from "../types";
import ConsentForm from "./ConsentForm";
import ScenarioExplanation from "./ScenarioExplanation";
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
function Opener() {
  return (
    <Grid container direction="column">
      <Grid item>
          Welcome, project description, etc.
      </Grid>
    </Grid>
  );
};



export default function Homepage() {
  
  const [page, setPage] = React.useState(0);

  const next = () => {
    if (page + 1 < workflow.length) {
      setPage(page + 1);
    }
  }

  const workflow = [
    Opener(),
    <ConsentForm />,
    <Questionnaire variant={VARIANTS.WELLBEING}/>,
    <ScenarioExplanation />,
    <SystemList onFinish={next}/>,
    <ConsentForm />
  ]

  return (
    <Container>

      <Routes>
        <Route path="*" element={workflow[page]} />
        <Route path="hiring" element={<SystemList onFinish={next}/>} />
      </Routes>
      <br />
      <br />
      
      <Button onClick={next} color='secondary'>Next in workflow</Button>
    </Container>
  );
}
