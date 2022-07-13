import * as React from "react";
import { Button, Container, Stack, Typography } from "@mui/material";
import Gallery from "../components/Gallery";
import SystemRank from "../components/SystemRank"; 
import ControlPanel from "../components/ControlPanel";
import ComparableCard from "../components/ApplicantCard";
import SystemCard from "../components/SystemCard";
import Spinner from "../components/Spinner";
import Ranking from "../components/Ranking";
import { Manipulation, FieldProperties, Applicant, Recommendation } from "../types";
import { numApplicants } from "../study-config/Configuration";
import { objectsEqual, randomBetween, customSort, pickApplicants } from "../util/Functions";

import { defaultTheme } from "../styling/DefaultThemes.js";

const { defaultPreferences, randomApplicant } = require("../util/DummyData");

type TaskProps = {
  system: Manipulation;
  finish: Function;
  setTheme: Function;
};


function newApplicants() {
let applicantList = [] as Applicant[];
for (var i = 0; i < numApplicants; i++) {
  applicantList.push({id: i, fields: randomApplicant()} as Applicant);
} 
return applicantList;
}

export default function HiringTask({system, finish, setTheme} : TaskProps) {
  const [shortlisted, setShortlisted] = React.useState(false);
  const [ranked, setRanked] = React.useState(false);
  const initialPreferences = defaultPreferences() as FieldProperties;
  const [applicants, setApplicants] = React.useState(customSort(newApplicants(), initialPreferences));
  const [loadingTime, setLoadingTime] = React.useState(randomLoadingTime());
  const [preferences, setPreferences] = React.useState(initialPreferences);
  const isDefault = objectsEqual(preferences, initialPreferences);
  const [loading, setLoading] = React.useState(false);
  const [changes, setChanges] = React.useState(0);
  
  // in 1/100 seconds
  const hoverTime = React.useRef(0);
  const shortlist = React.useRef<number[]>([]);
  
  const [scale, setScale] = React.useState(randomBetween(0, 1) === 1);

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

  React.useEffect( () => {
    //this function will apply filter based on the preferences given
    setApplicants(customSort(applicants, preferences));
  }, [preferences]);

/*   var profiles: JSX.Element[] = [];
  applicants.map((a) => { 
    profiles.push(<ComparableCard instance={a} key={a.id} scale={scale}/>)
  }); */

  const endGallery = () => {
    setShortlisted(true);
  }

  const endRanking = () => {
    setTheme(defaultTheme);
    setApplicants(newApplicants());
    setRanked(true);
  }

  const chooseApplicants = (start: number, end: number, control: boolean) => {
    let choices: Recommendation[] = pickApplicants(applicants.slice(start, end), preferences, control, isDefault);
    return choices;
  }

  //returns an odd number between _ and 7, multiplied by 1000. this lines up with the animation design
  //TODO (maybe): parameterize by the amount factors change to simulate a more realistic reevaluation
  function randomLoadingTime() {
    return (((Math.round(Math.random() * 3) * 2) + 1) * 1000);
  }

  function addChosen(id: number) {
    !shortlist.current.includes(id) && shortlist.current.push(id);
    console.log(shortlist.current);
  }
  
  function removeChosen(id: number) {
    shortlist.current = shortlist.current.filter(i => i !== id);
  }

  function cards() {
    return applicants.filter(a => (shortlist.current.includes(a.id))) as Applicant[];
  }

  return (
      <Stack direction='row' justifyContent='center' spacing={20} alignItems='flex-start'>
         {ranked ? <Button variant='contained' onClick={() => {finish()}} color='secondary'>Evaluate system</Button> :
        shortlisted ? <Ranking shortlist={cards()} rank={endRanking} scale={scale}/>
        : <SystemRank applicants={applicants} setApplicants={setApplicants}/>}
        <Stack direction='column' marginTop='16px' spacing={3} alignItems='flex-start'>
        {systemCard}
        {system.control && !shortlisted && <ControlPanel preferences={preferences} setPreferences={applyChanges} defaultSaved={isDefault}/> }
        </Stack>
        
       
        {/* <Gallery key={changes} dimensions={dimensions} content={profiles} onFinish={endGallery} receiveRecommendation={chooseApplicants} transparent={system.transparency} control={system.control} changes={changes}
        runTimer={runTimer} remainingApplicants={5} addChosen={addChosen} removeChosen={removeChosen} page={page} setPage={setPage}/> */}
        
      <Spinner displayImage={<img src={system.image} height='180' width='240'/>} displayText='Loading...' timePeriod={loadingTime} callback={setSpinner} visible={loading}/>
      </Stack>
  );
}


