import * as React from "react";
import { Button, Container, Stack } from "@mui/material";
import Gallery from "../components/Gallery";
import ControlPanel from "../components/ControlPanel";
import ComparableCard from "../components/ApplicantCard";
import SystemCard from "../components/SystemCard";
import Timer from "../components/Timer";
import { Manipulation, FieldProperties, Applicant } from "../types";
import { pickApplicant } from "../study-config/Configuration";

const { sumValues } = require("../util/Functions");

const { defaultPreferences } = require("../util/DummyData");

type TaskProps = {
  system: Manipulation;
  applicants: Applicant[];
  finish: Function;
};

export default function HiringTask({system, applicants, finish} : TaskProps) {
  const [finished, setFinished] = React.useState(false);
  const [totalTime, setTotalTime] = React.useState(0);
  const numColumns = 2;
  const initialPreferences = defaultPreferences() as FieldProperties;
  const scale = system.transparency === system.control;

  const [key, setKey] = React.useState(0);
  const [preferences, setPreferences] = React.useState(initialPreferences);

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

  const onFinish = () => {
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
      <Stack direction='row' justifyContent='center' spacing={5} alignItems='flex-start'>
        <Stack direction='column' marginTop='16px' spacing={2} alignItems='flex-end'>
        <SystemCard system={system} />
        {!finished && system.control && <ControlPanel key={key} preferences={preferences} setPreferences={applyChanges} revertToDefault={resetPreferences} /> }
        
        </Stack>
        {finished ? 
        <div>
          <div>
          Finished. Time: {totalTime}</div>
          <div><Button onClick={() => {finish()}} color='secondary'>Evaluate system.</Button></div>
        </div> :
        <Gallery columns={numColumns} content={profiles} onFinish={onFinish} singleton={true} receiveRecommendation={chooseApplicant} transparent={system.transparency}/>
}
      </Stack>
      </Container>
    </div>
  );
}