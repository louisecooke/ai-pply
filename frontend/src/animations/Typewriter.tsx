import { Typography } from '@mui/material';
import Typed from "react-typed";


import * as React from 'react';

type Props = {
  text: string;
  frequency: number;
  speed?: number;
  duration?: number;
  callback?: Function;
}


export function TypeAnimation({text = '', frequency, speed = 500, duration, callback = () => {}}: Props) {
  const [active, setActive] = React.useState(true);
  //const [time, setTime] = React.useState(duration);
  const starterText = ['', 'Give me a second...', 'Let me check again...', 'Remember?'];

  React.useEffect(() => {
    setActive(true);
    //setTime(duration);
  }, [text]);

/*   React.useEffect(() => {
    let interval;
    if (!active || time === 0) {
      clearInterval(interval);
      setActive(false);
      callback();
    } else if (active) {
      interval = setInterval(() => {
        setTime((time) => time - 1);
      }, 1000);}
    return () => clearInterval(interval as NodeJS.Timer);
  }, [active, time]); */

  return (active ?
  <Typography sx={{width: 400, textAlign: 'left'}} variant='subtitle2'>
  <Typed strings={[starterText[frequency], text]} typeSpeed={speed} backSpeed={100} onComplete={callback}/>
  </Typography>
  : <></>
  );

}

