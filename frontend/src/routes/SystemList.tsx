import * as React from "react";
import HiringTask from "./HiringTask";
import { Applicant, Manipulation, VARIANTS } from "../types";
import Questionnaire from "../components/Questionnaire";
import SystemCard from "../components/SystemCard";
import { Button, Container, Stack } from "@mui/material";
import { systemThemes } from "../styling/SystemThemes";
import ScenarioExplanation from "./ScenarioExplanation";

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
    TASK, QUESTIONNAIRE, TRANSITION
}

type Props = {
  onFinish: Function;
  setTheme: Function;
}

export default function SystemList({onFinish, setTheme}: Props) {
  const [chosenSystem, setChosenSystem] = React.useState({} as Manipulation);
  const [index, setIndex] = React.useState(-1);
  const [completed, setCompleted] = React.useState([] as number[]);
  const [systems, setSystems] = React.useState([] as Completion[]);
  const [started, setStarted] = React.useState(false);
  const [visibleElement, setVisibleElement] = React.useState(ELEMENTS.TASK);
  const [penultimate, setPenultimate] = React.useState(false);

  const postQuestionnaireText = penultimate ? 'All finished.' : 'You have completed your evaluation. Ready for the next system?';

  const nextSystem = () => {
    let index;
    if (penultimate) {
      onFinish();
    } else {
      do {
        index = Math.floor(Math.random() * systems.length);
      } while (completed.includes(index));
      setIndex(index);
      setTheme(systemThemes[index]);
      setChosenSystem(systems[index].system);
    }
    if (completed.length + 1 === systems.length) {
      setPenultimate(true);
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
    setVisibleElement(ELEMENTS.TRANSITION);
  }

  const evaluateNext = () => {
    nextSystem();
    setVisibleElement(ELEMENTS.TASK);
  }

  const currentElement = () => {
    switch (visibleElement) {
      case (ELEMENTS.TASK): 
        return (<HiringTask system={chosenSystem} applicants={applicantList} finish={finishScenario} setTheme={setTheme}/>)
  
      case (ELEMENTS.QUESTIONNAIRE):
        return (
          <Container>
          <Stack alignItems='center'>
          <SystemCard system={chosenSystem}></SystemCard>
          <Questionnaire variant={VARIANTS.EVALUATION} finish={finishQuestionnaire} />
          </Stack>
          </Container>)

      default:    
        return (
          <Stack alignItems='center' spacing={2}>
            <div>{postQuestionnaireText}</div>
            <Button variant='contained' color='secondary' onClick={evaluateNext}>Next</Button>
          </Stack>
        )
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
    {!started ? <ScenarioExplanation next={start} /> :
    chosenSystem.id && 
    currentElement()} 
    </>);
}