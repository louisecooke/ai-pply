import * as React from "react";
import HiringTask from "./HiringTask";
import { Manipulation, VARIANTS } from "../types";
import Questionnaire from "./Questionnaire";
import SystemCard from "../components/SystemCard";
import { Button, Container, Stack } from "@mui/material";
import { systemThemes } from "../styling/SystemThemes";
import { SystemContext } from "../App";
import Training from "../animations/Training";

enum ELEMENTS {
    TRAINING, TASK, QUESTIONNAIRE, TRANSITION
}

type Props = {
  next: () => void;
  setTheme: Function;
}

export default function SystemList({next, setTheme}: Props) {
  const [chosenSystem, setChosenSystem] = React.useState({} as Manipulation);
  const [index, setIndex] = React.useState(-1);
  const [completed, setCompleted] = React.useState([] as number[]);
  const [systems, setSystems] = React.useState(React.useContext(SystemContext));

  //switch back to TRAINING when finished debugging
  const [visibleElement, setVisibleElement] = React.useState(ELEMENTS.TASK);
  const [penultimate, setPenultimate] = React.useState(false);

  const systemContext = React.useContext(SystemContext);

  React.useEffect( () => {
      setSystems(systemContext);   
  }, [systemContext.length]);

  React.useEffect( () => {
    if (systems.length > 0) {
      nextSystem();
    }
  }, [systems.length]);

  const postQuestionnaireText = penultimate ? 'All finished.' : 'You have completed your evaluation. Ready for the next system?';

  const nextSystem = () => {
    let index;
    if (penultimate) {
      next();
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
    setVisibleElement(ELEMENTS.TRAINING);
  }

  const currentElement = () => {
    switch (visibleElement) {
     /*  case (ELEMENTS.TRAINING):
        return (<Training index={index} system={chosenSystem} onFinish={() => setVisibleElement(ELEMENTS.TASK)} />) */
      case (ELEMENTS.TASK): 
        return (<HiringTask system={chosenSystem} finish={finishScenario} setTheme={setTheme}/>)
  
      case (ELEMENTS.QUESTIONNAIRE):
        return (
          <Container>
          <Stack alignItems='center'>
          <SystemCard system={chosenSystem}></SystemCard>
          <Questionnaire variant={VARIANTS.EVALUATION} next={finishQuestionnaire} />
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