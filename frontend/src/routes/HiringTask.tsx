import * as React from "react";
import { Button, Stack } from "@mui/material";
import SystemRank from "../components/SystemRank"; 
import ControlPanel from "../components/ControlPanel";
import SystemCard from "../components/SystemCard";
import Spinner from "../components/Spinner";
import Shortlist from "../components/Shortlist";
import { Manipulation, FieldProperties, Applicant } from "../types";
import { numApplicants } from "../study-config/Configuration";
import { objectsEqual, randomBetween, customSort } from "../util/Functions";
import { TypeAnimation } from "../animations/Typewriter";

import { defaultTheme } from "../styling/DefaultThemes.js"

const { defaultPreferences, randomApplicant } = require("../util/DummyData");

type TaskProps = {
  system: Manipulation;
  finish: Function;
  setTheme: Function;
};


function newApplicants() {
  let applicantList = [] as Applicant[];
  for (var i = 0; i < numApplicants; i++) {
    applicantList.push({id: i + 1, fields: randomApplicant(), reason: ''} as Applicant);
  } 
  return applicantList;
}

type Counter = {
  [key: number]: number;
}

export default function HiringTask({system, finish, setTheme} : TaskProps) {
  const initialPreferences = defaultPreferences() as FieldProperties;
  const [shortlisted, setShortlisted] = React.useState(false);
  const [ranked, setRanked] = React.useState(false);
  const [applicants, setApplicants] = React.useState(customSort(newApplicants(), initialPreferences, system.control, true));
  const [loadingTime, setLoadingTime] = React.useState(randomLoadingTime());
  const [preferences, setPreferences] = React.useState(initialPreferences);
  const isDefault = objectsEqual(preferences, initialPreferences);
  const [loading, setLoading] = React.useState(false);
  const [changes, setChanges] = React.useState(0);
  const [text, setText] = React.useState('');
  const [frequency, setFrequency] = React.useState(0);
  const transparencyMetrics = React.useRef({} as Counter);
  
  // in 1/100 seconds
  const hoverTime = React.useRef(0);
  const [scale, setScale] = React.useState(randomBetween(0, 1) === 1);

  function runTimer() {
    hoverTime.current += 1;
  }

  const systemCard = <SystemCard system={system} />; 

  React.useEffect( () => {
    setChanges(0);
  }, [system]);

  React.useEffect( () => {
    setApplicants(customSort(applicants, preferences, system.control, isDefault));
    updateMetric(applicants.slice(0, 5));
  }, [preferences]);

  return (
      <Stack direction='row' justifyContent='center' spacing={20} alignItems='flex-start'>
        {!ranked &&
        (shortlisted ? <Shortlist shortlist={applicants.slice(0,5)} rank={endRanking} scale={scale}/>
        : <SystemRank applicants={applicants} setApplicants={setApplicants} transparent={system.transparency} writeExplanation={writeExplanation}/>)}
        <Stack direction='column' marginTop='16px' spacing={2} alignItems={ranked ? 'center' : 'flex-start'}>
        <Stack direction='row' spacing={3} sx={shortlisted ? {} : {minWidth: 600}}>
        {systemCard}
        {text !== '' && <TypeAnimation text={text} frequency={frequency} speed={10} duration={10} callback={() => setText('')}/>}
        </Stack>
        {system.control && !shortlisted && <ControlPanel preferences={preferences} setPreferences={applyChanges} defaultSaved={isDefault}/> }
        <br />
        {ranked ? <Button variant='contained' onClick={() => {finish()}} color='secondary'>Evaluate system</Button> :
        shortlisted ? <> </> : <Button variant='contained' onClick={toShortlist} color='secondary'>choose these applicants</Button>
        }
        </Stack>
        
      <Spinner displayImage={<img src={system.image} height='180' width='240'/>} displayText='Loading...' timePeriod={loadingTime} callback={setSpinner} visible={loading}/>
      </Stack>
  );

  function logInquiry(id: number) {
    return transparencyMetrics.current[id] += 1;
  }

  function writeExplanation(a: Applicant) {
    let num = logInquiry(a.id);
    setText(a.reason);
    setFrequency(num);
  }

  function updateMetric(shortlist: Applicant[]) {
    shortlist.forEach( (a) => {
    if (!transparencyMetrics.current[a.id]) {
      transparencyMetrics.current = {
        ...transparencyMetrics.current,
        [a.id]: 0
      }
    }
    });
  }

  function endRanking () {
    setTheme(defaultTheme);
    setApplicants(newApplicants());
    setRanked(true);
  }
  
  //returns an odd number between _ and 7, multiplied by 1000. this lines up with the animation design
  //TODO (maybe): parameterize by the amount factors change to simulate a more realistic reevaluation
  function randomLoadingTime() {
    return (((Math.round(Math.random() * 3) * 2) + 1) * 1000);
  }

  function toShortlist() {
    setShortlisted(true);
  }
  
  function applyChanges(givenPreferences?: FieldProperties) {
    let preferences = givenPreferences ? givenPreferences : initialPreferences;
    setLoading(true);
    setTimeout(() => {
      setPreferences(preferences);
      setChanges(changes + 1);
    }, loadingTime);
  }

  function setSpinner() {
    setLoading(false);
    setLoadingTime(randomLoadingTime());
  }
/* 
  const emptyMetric = () => {
    let i = 0;
    let metric = {} as Counter;
    while (i < 5) {
      metric = {...metric, [applicants[i].id]: 0};
      i++;
    }
    return metric;
  } */
}


