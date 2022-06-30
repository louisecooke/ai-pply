import * as React from "react";
import { Button, Container, Stack } from "@mui/material";
import Gallery from "../components/Gallery";
import ControlPanel from "../components/ControlPanel";
import ComparableCard from "../components/ApplicantCard";
import SystemCard from "../components/SystemCard";
import Timer from "../components/Timer";
import { Manipulation, FieldProperties, Applicant } from "../types";
import { pickApplicant, dimensions } from "../study-config/Configuration";
import { objectsEqual } from "../util/Functions";

import { defaultTheme } from "../styling/DefaultThemes";

const { defaultPreferences } = require("../util/DummyData");

type TaskProps = {
  system: Manipulation;
  applicants: Applicant[];
  finish: Function;
  setTheme: Function;
};

export default function HiringTask({system, applicants, finish, setTheme} : TaskProps) {
  const [finished, setFinished] = React.useState(false);
  const [totalTime, setTotalTime] = React.useState(0);
  const initialPreferences = defaultPreferences() as FieldProperties;
  const scale = system.transparency === system.control;

  const [key, setKey] = React.useState(0);
  const [preferences, setPreferences] = React.useState(initialPreferences);
  const isDefault = objectsEqual(preferences, initialPreferences);

  const changeKey = () => setKey(key + 1);

  const applyChanges = (controlPanel: FieldProperties) => {
    setPreferences(controlPanel);
    changeKey(); 
  }

  const resetPreferences = () => {
    setPreferences(initialPreferences);
    changeKey();
  }

  var profiles: JSX.Element[] = [];
  applicants.map((a) => {
    profiles.push(<ComparableCard instance={a} key={a.id} scale={scale}/>)
  });

  const endGallery = () => {
    
    setTheme(defaultTheme);
    setFinished(true);
  }
  const logTime = (time: number) => setTotalTime(time);

  const chooseApplicant = (start: number, end: number) => {
    return pickApplicant(applicants.slice(start, end), preferences);
  }

  return (
    <div>{/* 
      <Timer finished={finished} onFinish={logTime}/> */}
      <Container>
      <Stack direction='column' justifyContent='center' spacing={5} alignItems='center'>
        <Stack direction='row' marginTop='16px' spacing={2} alignItems= {finished ? 'center' : 'flex-end'}>
        <SystemCard system={system} />
        {finished ? <Button variant='contained' onClick={() => {finish()}} color='secondary'>Evaluate system</Button> : 
        system.control && <ControlPanel key={key} preferences={preferences} setPreferences={applyChanges} defaultSaved={isDefault} revertToDefault={resetPreferences} /> }

        </Stack>
        {!finished && <Gallery dimensions={dimensions} content={profiles} onFinish={endGallery} singleton={true} receiveRecommendation={chooseApplicant} transparent={system.transparency}/>
}
      </Stack>
      </Container>
    </div>
  );
}