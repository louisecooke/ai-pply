import * as React from "react";
import { Button, Container, Stack } from "@mui/material";
import Gallery from "../components/Gallery";
import ControlPanel from "../components/ControlPanel";
import ComparableCard from "../components/ApplicantCard";
import SystemCard from "../components/SystemCard";
import Spinner from "../components/Spinner";
import { Manipulation, FieldProperties, Applicant, Recommendation } from "../types";
import { pickApplicants, dimensions } from "../study-config/Configuration";
import { objectsEqual, randomBetween } from "../util/Functions";

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
  const initialPreferences = defaultPreferences() as FieldProperties;
  const scale = system.transparency === system.control;
  const [loadingTime, setLoadingTime] = React.useState(randomLoadingTime());
  const [preferences, setPreferences] = React.useState(initialPreferences);
  const isDefault = objectsEqual(preferences, initialPreferences);
  const [loading, setLoading] = React.useState(false);
  const [changes, setChanges] = React.useState(0);

  // in 1/100 seconds
  const hoverTime = React.useRef(0);

  function runTimer() {
    hoverTime.current += 1;
  }

  const systemCard = <SystemCard system={system} />; 

  const applyChanges = (givenPreferences?: FieldProperties) => {
    let preferences = givenPreferences ? givenPreferences : initialPreferences;
    setLoading(true);
    setTimeout(() => {
      setPreferences(preferences);
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

  //TODO refactor to include reason at choice level, not afterward. it is too complicated at the mo.
  const chooseApplicants = (start: number, end: number, control: boolean) => {
    let choices: Recommendation[] = pickApplicants(applicants.slice(start, end), preferences, control);
    return choices;
  }

  //returns an odd number between _ and 7, multiplied by 1000. this lines up with the animation design
  //TODO (maybe): parameterize by the amount factors change to simulate a more realistic reevaluation
  function randomLoadingTime() {
    return (((Math.round(Math.random() * 3) * 2) + 1) * 1000);
  }

  return (
      <Stack direction='column' justifyContent='center' spacing={5} alignItems='center'>
        <Stack direction='row' marginTop='16px' spacing={2} alignItems= {finished ? 'center' : 'flex-end'}>
        {systemCard}
        {system.control && !finished && <ControlPanel preferences={preferences} setPreferences={applyChanges} defaultSaved={isDefault}/> }
        </Stack>
        {finished ? <Button variant='contained' onClick={() => {finish()}} color='secondary'>Evaluate system</Button> : 
        <Gallery key={changes} dimensions={dimensions} content={profiles} onFinish={endGallery} receiveRecommendation={chooseApplicants} transparent={system.transparency} control={system.control} changes={changes}
        runTimer={runTimer}/>
}
      <Spinner displayImage={<img src={system.image} height='180' width='240'/>} displayText='Loading...' timePeriod={loadingTime} callback={setSpinner} visible={loading}/>
      </Stack>
  );

  


}


