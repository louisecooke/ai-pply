import { Stack, Typography } from '@mui/material';
import { Manipulation } from '../data-types/interfaces';
import Typed from "react-typed";
import SystemCard from '../components/SystemCard';
import * as React from "react";

type Props = {
  system: Manipulation;
  processed: boolean;
  responses: string[];
  callback: Function;
}

export default function LearningSystem({system, processed, responses, callback}: Props) {
  const [textIndex, setTextIndex] = React.useState(0);
  const [triggerTyping, setTrigger] = React.useState(false);
  const backDelay = 1000;
  processed && setEnd();

  React.useEffect( () => {
    setTimeout( () => {
      setTrigger(true);
    }, 3000);
  }, []);

  return (
    <>
    <Stack direction='row' spacing={4}>
      <SystemCard system={system} />
      <Typography sx={{width: 400, textAlign: 'left'}} variant='subtitle2'>
      {processed ? 
        <div>All good, I'm ready!</div>
       :
      (triggerTyping &&
       <Typed strings={[responses[textIndex]]} typeSpeed={30} backSpeed={50} loop={true} startDelay={2000} backDelay={backDelay} onLastStringBackspaced={changeMessage}
        />
       )}
       </Typography>
    </Stack>
    </>
  );

  function changeMessage() {
    setTimeout( () => {
    setTextIndex(textIndex + 1);
    setTrigger(true);
  }, 700);
  }

  function setEnd() {
    setTimeout(() => callback(), 4000);
  }

}