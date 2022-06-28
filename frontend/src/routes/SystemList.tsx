import * as React from "react";
import HiringTask from "./HiringTask";
import { Applicant, Manipulation, Q_TYPE } from "../types";
import Questionnaire from "../components/Questionnaire";
import SystemCard from "../components/SystemCard";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

const { randomApplicant } = require("../util/DummyData");
const { numApplicants } = require("../study-config/Configuration");

const applicantList: Applicant[] = [];
for (var i = 0; i < numApplicants; i++) {
  applicantList.push({id: i, fields: randomApplicant()} as Applicant);
} 

interface Completion {
  system: Manipulation;
  interacted: boolean;
}

enum ELEMENTS {
    TASK, QUESTIONNAIRE
}

type Props = {
  onFinish: Function;
}

export default function SystemList({onFinish}: Props) {
  const [chosenSystem, setChosenSystem] = React.useState({} as Manipulation);
  const [index, setIndex] = React.useState(-1);
  const [completed, setCompleted] = React.useState([] as number[]);
  const [systems, setSystems] = React.useState([] as Completion[]);
  const [started, setStarted] = React.useState(false);
  const [visibleElement, setVisibleElement] = React.useState(ELEMENTS.TASK);

  const nextSystem = () => {
    let index;
    if (completed.length === systems.length) {
      onFinish();
    } else {
    do {
      index = Math.floor(Math.random() * systems.length);
    } while (completed.includes(index));
    setIndex(index);
    setChosenSystem(systems[index].system);
    }
  }

  const start = () => {
    nextSystem();
    setStarted(true);
  }

  const finishScenario = () => {
    setVisibleElement(ELEMENTS.QUESTIONNAIRE);
    setCompleted([index, ...completed]);
  }

  const finishQuestionnaire = () => {
    nextSystem();
    setVisibleElement(ELEMENTS.TASK);
  }

  const currentElement = () => {
    if (visibleElement === ELEMENTS.TASK) {
      return (<HiringTask system={chosenSystem} applicants={applicantList} finish={finishScenario}/>)
    } else {
      return (
      <Stack alignItems='center'>
      <SystemCard system={chosenSystem}></SystemCard>
      <Questionnaire variant={Q_TYPE.EVALUATION} finish={finishQuestionnaire} />
      </Stack>);
    }
  }

  const getSystems = async () => {
    let response = await fetch("api/systems/");
    let data = await response.json();
    setSystems(data.map( (s: Manipulation) => {
      return {
        system: s,
        interacted: false
      } as Completion;
    }
    ));
  }

  React.useEffect( () => {
    getSystems();
  }, []);

  //in SYSTEMLIST, there are 'finish scenario' and 'finish evaluation' states and functions. the scenario is displayed and 1. passed down. when it is finished, 
  // the evaluation questionnaire is displayed. when the questionnaire is finished, 2. is called with a payload (where should the POST be?), and the state is reset.
  // this should mark the scenario as 'complete' in the list of completions, and the function to randomize and display the next scenario is called. when all are complete,
  // 
  // TODO: this works well as an SPA to prevent users from jumping around. however, what happens when they need to reload the page? should all data be POSTED at the end,
  // or would it be better to route and 'save your place' in a sense?
  return (
    <>
    <br/>
    <br/>
    {!started ? <Button color='secondary' onClick={start}>Start</Button> :
    chosenSystem.id && 
    currentElement()} 
    </>);
}