import { Grid, Button } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import * as React from "react";
import ScenarioCard from "../components/ScenarioCard";
import SystemList from "./SystemList";
import "../styles.css";

import { Scenario } from "../types";
const resume = require("../imgs/andrea-piacquadio-resume.jpg");

/* const imageID: Scenario = {
  name: "Image ID",
  description: "Help Audrey identify birds.",
  image: birds,
  link: "/image"
}; */

const hiringManager: Scenario = {
  name: "Hiring Manager",
  description: "Vet applicants for your recent job openings.",
  image: resume,
  link: "/hiring"
};

const scenarioList = [hiringManager];

const scenarios = () => {
  return (
    <Grid container spacing={10} justifyContent="space-evenly">
        {scenarioList.map((s: Scenario) => (
          <Grid item key={s.name}>
            <ScenarioCard scenario={s} />
          </Grid>
        ))}
    </Grid>);
}

function Opener() {
  const [visibleScenarios, setVisibleScenarios] = React.useState(true);
  return (
    <Grid container direction="column">
      {/* <Grid container direction="row" alignItems="center">
        <Grid item><Grid container direction="row" alignItems="flex-end">
        <Grid item>
          <Audrey />
        </Grid>
        <Grid item sx={{ margin: "0px 60px 80px -30px" }}>
          <h1 className="white">Meet Audrey...</h1>
          <h2>ready to get started?</h2>
          {!visibleScenarios && <Button
          variant="contained"
          color="secondary"
          onClick={() => {
            setVisibleScenarios(true);
          }}
          >LET'S GO</Button>}
        </Grid>
      </Grid>
      </Grid> */}
      <Grid item>
          {visibleScenarios && scenarios()}
      </Grid>
      {/* </Grid> */}
    </Grid>
  );
};

export default function Homepage() {
  return (
    <div className="fill-window App">
      <Routes>
        <Route path="*" element={<Opener />} />
        <Route path="hiring" element={<SystemList />} />
      </Routes>
      <br />
      <br />
    </div>
  );
}
