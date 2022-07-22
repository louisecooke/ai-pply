import * as React from "react";
import HiringTask from "./HiringTask";
import { Applicant, Manipulation, VARIANTS, Completion } from "../types";
import Questionnaire from "../components/Questionnaire";
import SystemCard from "../components/SystemCard";
import { Button, Container, Stack } from "@mui/material";
import { systemThemes } from "../styling/SystemThemes";
import ScenarioExplanation from "./ScenarioExplanation";

enum ELEMENTS {
    TASK, QUESTIONNAIRE, TRANSITION
}

type Props = {
  onFinish: Function;
  setTheme: Function;
  systemList: Manipulation[];
}

export default function SystemList({onFinish, setTheme, systemList}: Props) {
  const [chosenSystem, setChosenSystem] = React.useState({} as Manipulation);
  const [index, setIndex] = React.useState(-1);
  const [completed, setCompleted] = React.useState([] as number[]);
  const [systems, setSystems] = React.useState(extendSystems(systemList) as Completion[]);
  const [started, setStarted] = React.useState(false);
  const [visibleElement, setVisibleElement] = React.useState(ELEMENTS.TASK);
  const [penultimate, setPenultimate] = React.useState(false);

  function extendSystems(systems: Manipulation[]) {
    let manips = systems.map( (s: Manipulation) => {
      return ({
        system: s,
        interacted: false
      } as Completion);
    });
    return manips; 
  }

  React.useEffect( () => {
    setSystems(extendSystems(systemList));
    nextSystem();
    setStarted(true);
  }, []);

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
        return (<HiringTask system={chosenSystem} finish={finishScenario} setTheme={setTheme}/>)
  
      case (ELEMENTS.QUESTIONNAIRE):
        return (
          <Container>
          <Stack alignItems='center'>
          <SystemCard system={chosenSystem}></SystemCard>
          <Questionnaire variant={VARIANTS.EVALUATION} onFinish={finishQuestionnaire} />
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
  return (
    <>
    <br/>
    <br/>
    {
    chosenSystem.id && 
    currentElement()} 
    </>);
}