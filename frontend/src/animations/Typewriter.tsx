import { ImageList, ImageListItem, Container} from '@mui/material';
import Typed from "react-typed";


import * as React from 'react';

type Props = {
  text: string;
  speed?: number;
  duration: number;
}


export function TypeAnimation({text = '', speed = 500, duration}: Props) {
  const [active, setActive] = React.useState(true);
  const [time, setTime] = React.useState(duration);

  React.useEffect(() => {
    setActive(true);
    setTime(duration);
  }, [text]);

  React.useEffect(() => {
    let interval;
    if (!active || time === 0) {
      clearInterval(interval);
      setActive(false);
    } else if (active) {
      interval = setInterval(() => {
        setTime((time) => time - 1);
      }, 1000);}
    return () => clearInterval(interval as NodeJS.Timer);
  }, [active, time]);

  return (active ?
  <Typed strings={['Give me a second...', text]} typeSpeed={speed} backSpeed={100}/>
  : <></>
  );

}


function Typewriter({text = '', speed = 500}: Props) {
  const [displayed, setDisplayed] = React.useState("");
  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    /*Create a new setInterval and store its id*/
    const animKey = setInterval(() => {
      setIndex((index) => {
        /*This setState function will set the index
        to index+1 if there is more content otherwise
        it will destory this animation*/
      
        if (index >= text.length - 1) {
          clearInterval(animKey);
          return index;
        }
        return index + 1;
      });
    }, speed);
  }, []);

  React.useEffect(() => {
    setDisplayed(displayed + text[index])
    console.log(index);
  }, [index])

  return <div>{displayed}</div>;
}


