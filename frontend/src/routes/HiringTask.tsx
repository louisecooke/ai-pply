import * as React from "react";
import { Button, Container, Stack } from "@mui/material";
import Gallery from "../components/Gallery";
import ControlPanel from "../components/ControlPanel";
import ComparableCard from "../components/ApplicantCard";
import SystemCard from "../components/SystemCard";
import Spinner from "../components/Spinner";
import { Manipulation, FieldProperties, Applicant, Recommendation } from "../types";
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
  const [changes, setChanges] = React.useState(0);
  const [hoverTime, setHoverTime] = React.useState(0);

  const systemCard = <SystemCard system={system} />; 

  const applyChanges = (controlPanel: FieldProperties) => {
    setLoading(true);
    setTimeout(() => {
      setPreferences(controlPanel);
      setChanges(changes + 1);
    }, loadingTime);
  }

  const resetPreferences = () => {
    setLoading(true);
    setTimeout(() => {
      setPreferences(initialPreferences);
      setChanges(changes + 1);
    }, loadingTime);
  }

  const setSpinner = () => {
    setLoading(false);
    setLoadingTime(randomLoadingTime());
  }

  React.useEffect( () => {
    setChanges(0);
  }, [system]);

  var profiles: JSX.Element[] = [];
  applicants.map((a) => {
    profiles.push(<ComparableCard instance={a} key={a.id} scale={scale}/>)
  });

  const endGallery = () => {
    setTheme(defaultTheme);
    setFinished(true);
  }

  const chooseApplicant = (start: number, end: number) => {
    let applicant = pickApplicant(applicants.slice(start, end), preferences);
    let reason =  generateReason(applicant.maxKey, start, system.control);
    return { index: applicant.chosenId, reason: reason} as Recommendation;
  }

  //returns an odd number between _ and 7, multiplied by 1000. this lines up with the animation design
  //TODO (maybe): parameterize by the amount factors change to simulate a more realistic reevaluation
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
        {finished ? <Button variant='contained' onClick={() => {finish()}} color='secondary'>Evaluate system</Button> : 
        <Gallery key={changes} dimensions={dimensions} content={profiles} onFinish={endGallery} receiveRecommendation={chooseApplicant} transparent={system.transparency} changes={changes}
        totalHoverTime={hoverTime} setTotalHoverTime={setHoverTime}/>
}
      <div>total time: {hoverTime}</div>
      <Spinner displayImage={<img src={system.image} height='180' width='240'/>} displayText='Loading...' timePeriod={loadingTime} callback={setSpinner} visible={loading}/>
      </Stack>
      </Container>
    </div>
  );

  

function generateReason(maxKey: string, start: number, control: boolean) {
  if (control && isDefault) return `This decision was made based on our existing user data.`;
  if (control && maxKey) {
    return `This decision was made based on our existing user data, plus your recent input. I've just considered that you see ${maxKey} as a valuable factor.`
  }
    let degrees = randomBetween(2, 6);
    let percent = randomBetween(81, 95);
    return `When presented with a comparison between similar applicants (within ${degrees} degrees of latitude), ${percent}% of users made an equivalent decision.`
  }
}


function randomBetween(low: number, high: number) {
  return Math.round(Math.random() * (high - low)) + low;
}