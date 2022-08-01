import * as React from "react";
import { Button, Stack } from "@mui/material";
import SystemRank from "../components/SystemRank"; 
import ControlPanel from "../components/ControlPanel";
import SystemCard from "../components/SystemCard";
import Spinner from "../components/Spinner";
import Shortlist from "../components/Shortlist";
import { Manipulation, FieldProperties, Applicant, Interaction } from "../types";
import { numApplicants, shortlistLength } from "../study-config/Configuration";
import { objectsEqual, randomBetween, customSort, sumValues } from "../util/Functions";
import Timer from "../components/Timer";
import { postInteraction } from "../actions/actions";

import { defaultTheme } from "../styling/DefaultThemes.js"
import ReasonDialog from "../components/ReasonDialog";

const { defaultPreferences } = require("../util/DummyData");
const studyApplicants = require("../study-config/Applicants.json");

type TaskProps = {
  system: Manipulation;
  finish: Function;
  setTheme: Function;
};

type Counter = {
  [key: number]: number;
}

export default function HiringTask({system, finish, setTheme} : TaskProps) {
  const initialPreferences = defaultPreferences(system.id) as FieldProperties;
  const [shortlisted, setShortlisted] = React.useState(false);
  const [ranked, setRanked] = React.useState(false);
  const [applicants, setApplicants] = React.useState(customSort(studyApplicants.slice(0, numApplicants), initialPreferences, system.control, system.transparency, true));
  const [loadingTime, setLoadingTime] = React.useState(randomLoadingTime());
  const [preferences, setPreferences] = React.useState(initialPreferences);
  const isDefault = objectsEqual(preferences, initialPreferences);
  const [loading, setLoading] = React.useState(false);
  const [text, setText] = React.useState('');
  const [frequency, setFrequency] = React.useState(0);
  const transparencyMetrics = React.useRef({} as Counter);

  const totalTime = React.useRef(0);
  const panelChanges = React.useRef(-1);
  const transparencyChanges = sumValues(transparencyMetrics.current);
  const reorderChanges = React.useRef(0);

  const [scale, setScale] = React.useState(randomBetween(0, 1) === 1);
  const [loaded, setLoaded] = React.useState(false);

  const systemCard = system && <SystemCard system={system} />; 

  function logData() {
    console.log(postInteraction({
      system: system.id,
      total_time: totalTime.current,
      a_changes: reorderChanges.current,
      c_changes: panelChanges.current,
      t_clicks: transparencyChanges
    } as Interaction));
  }

  React.useEffect(() => {
    setLoaded(true);
  }, []);

  React.useEffect( () => {
  }, [text]);

  React.useEffect( () => {
    panelChanges.current = 0;
    totalTime.current = 0;
    transparencyMetrics.current = {};
  }, [system]);

  React.useEffect( () => {
    if (loaded) {
    reorderChanges.current += 1;
    }
  }, applicants);

  React.useEffect( () => {
    setApplicants(customSort(applicants, preferences, system.control, system.transparency, isDefault));
    updateMetric(applicants.slice(0, shortlistLength));
    if (loaded) {
    panelChanges.current += 1;
    }
  }, [preferences]);

  return (
    system ?
      <Stack direction='row' justifyContent='center' spacing={8} alignItems='flex-start' margin={5}>
        {!ranked &&
        (shortlisted ? <Shortlist shortlist={applicants.slice(0, shortlistLength)} rank={endRanking} scale={scale}/>
        : <SystemRank applicants={applicants} scale={scale} setApplicants={setApplicants} transparent={system.transparency} writeExplanation={writeExplanation}
        />)}
        <Stack direction='column' paddingTop={2} spacing={1} alignItems={ranked ? 'center' : 'flex-start'}>
        {systemCard}
        {system.control && !shortlisted && <ControlPanel preferences={preferences} setPreferences={applyChanges} defaultSaved={isDefault}/> }
        <br />
        {ranked ? <Button variant='contained' onClick={() => {finish()}} color='secondary'>Evaluate system</Button> :
        shortlisted ? <> </> : <Button variant='contained' onClick={toShortlist} color='secondary'>choose these applicants</Button>
        }
          <ReasonDialog displayImage={<img src={system.image} height='180' />} text={text} frequency={frequency} callback={() => setText('')} />
          <Spinner displayImage={<img src={system.image} height='180' width='240'/>} displayText='Loading...' timePeriod={loadingTime} callback={setSpinner} visible={loading}/>
          <Timer callback={ () => totalTime.current += 1} duration={1} delay={0}/>
            <>
            <div>
            Panel changes: {panelChanges.current}
            </div>
            <div>
            Transparency changes: {transparencyChanges}
            </div>
            <div>
            Timer: {totalTime.current}
            </div>
            <div>
              Reorders: {reorderChanges.current}
            </div>
            </>
        </Stack>
      </Stack> : <></>
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
    setRanked(true);
    logData();
    //TODO post completion, sum the changes per id, refresh stats
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
    }, loadingTime);
  }

  function setSpinner() {
    setLoading(false);
    setLoadingTime(randomLoadingTime());
  }

}


