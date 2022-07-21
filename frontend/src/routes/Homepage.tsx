import { Grid, Button, Container, Stack, Card, CardContent } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import * as React from "react";
import SystemList from "./SystemList";
import Questionnaire from "../components/Questionnaire";
import "../styles.css";
import { Manipulation, Completion } from "../types";

import { VARIANTS } from "../types";
import ConsentForm from "./ConsentForm";
import TaskExplanation from "./TaskExplanation";
import Playground from "./Playground";
import Demographic from './Demographic';
const resume = require("../imgs/andrea-piacquadio-resume.jpg");

type Props = {
  setTheme: Function;
}

export default function Homepage({setTheme}: Props) {
  const [systems, setSystems] = React.useState([] as Manipulation[]);
  const [page, setPage] = React.useState(0);

  const getSystems = async () => {
    let response = await fetch("api/systems/");
    let data = await response.json();
    setSystems(data as Manipulation[]);
  }

  React.useEffect( () => {
    getSystems();
  }, []);

  const next = () => {
    if (page + 1 < workflow.length) {
      setPage(page + 1);
    }
  }

  function Opener() {
    return (
      <Container>
      <Stack>
            <div>
      <Card sx={{padding: 5}}>
      <CardContent>
      Welcome, and we're happy you're here! If you're ready to get started, click the button below. 
      </CardContent> 
      <Button variant='contained' color='secondary' onClick={next}>Start study</Button>
      </Card>
      <br />
      <br />
    </div>
      </Stack>
      </Container>
    );
  };

  const workflow = [
    Opener(),
    <ConsentForm onFinish={next}/>,
    <Questionnaire variant={VARIANTS.WELLBEING} onFinish={next}/>,
    <TaskExplanation onFinish={next} systemList={systems}/>,
    <SystemList setTheme={setTheme} onFinish={next} systemList={systems}/>,

    <Demographic />
  ]

  return (
    <Container maxWidth={false}>
      <Routes>
        <Route path="*" element={workflow[page]} />
        <Route path="hiring" element={<Playground />} />
      </Routes>
      <br />
      <br />
      
    </Container>
  );
}
