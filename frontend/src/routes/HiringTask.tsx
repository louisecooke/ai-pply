import * as React from "react";
import { Button, Container, Stack } from "@mui/material";
import Gallery from "../components/Gallery";
import ControlPanel from "../components/ControlPanel";
import ComparableCard from "../components/ApplicantCard";
import SystemCard from "../components/SystemCard";
import Spinner from "../components/Spinner";
import { Manipulation, FieldProperties, Applicant } from "../types";
import { pickApplicant, dimensions } from "../study-config/Configuration";
import { objectsEqual } from "../util/Functions";

import { defaultTheme } from "../styling/DefaultThemes.js";

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
  const [loadingTime, setLoadingTime] = React.useState(randomLoadingTime());
  const [preferences, setPreferences] = React.useState(initialPreferences);
  const isDefault = objectsEqual(preferences, initialPreferences);
  const [loading, setLoading] = React.useState(false);

  const systemCard = <SystemCard system={system} />; 

  const applyChanges = (controlPanel: FieldProperties) => {
    setLoading(true);
    setTimeout(() => setPreferences(controlPanel), loadingTime);
  }

  const resetPreferences = () => {
    setLoading(true);
    setTimeout(() => setPreferences(initialPreferences), loadingTime);
  }

  const setSpinner = () => {
    setLoading(false);
    setLoadingTime(randomLoadingTime());
  }

  var profiles: JSX.Element[] = [];
  applicants.map((a) => {
    profiles.push(<ComparableCard instance={a} key={a.id} scale={scale}/>)
  });

  const endGallery = () => {
    setTheme(defaultTheme);
    setFinished(true);
  }

  const chooseApplicant = (start: number, end: number) => {
    return pickApplicant(applicants.slice(start, end), preferences);
  }

  function randomLoadingTime() {
    return (((Math.round(Math.random() * 3) * 2) + 1) * 1000);
  }

  return (
    <div>
      <Container>
      <Stack direction='column' justifyContent='center' spacing={5} alignItems='center'>
        <Stack direction='row' marginTop='16px' spacing={2} alignItems= {finished ? 'center' : 'flex-end'}>
        {systemCard}
        {system.control && !finished && <ControlPanel preferences={preferences} setPreferences={applyChanges} defaultSaved={isDefault} revertToDefault={resetPreferences}/> }
        </Stack>
        {finished ? <Button variant='contained' onClick={() => {finish()}} color='secondary'>Evaluate system</Button> :  <Gallery dimensions={dimensions} content={profiles} onFinish={endGallery} singleton={true} receiveRecommendation={chooseApplicant} transparent={system.transparency}/>
}
      <Spinner displayImage={<img src={system.image} height='180' width='240'/>} displayText='Loading...' timePeriod={loadingTime} callback={setSpinner} visible={loading}/>
      </Stack>
      </Container>
    </div>
  );
}