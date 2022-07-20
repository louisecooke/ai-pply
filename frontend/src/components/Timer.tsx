import * as React from "react";
import { Grid } from "@mui/material";
const { toMinutes } = require("../util/Functions");

type Props = {
  repeats?: number;
  duration: number;
  callback: Function;
  delay: number;
}

export default function Timer({repeats, duration, callback, delay} : Props) {
  const [time, setTime] = React.useState(0);
  const [active, setActive] = React.useState(false);
  const counter = React.useRef(0);

  //todo use counter to dictate repeats

  React.useEffect(() => {
    setTimeout( () => setActive(true), delay * 1000);
  }, []);

  React.useEffect(() => {
    let interval;
    if (counter.current === repeats) {
      setActive(false);
      callback();
    }
    if (active) {
      interval = setInterval(() => {
        setTime((time) => time + 1);
        if (time % (duration * 10) === 0) {
          //counter.current += 1;
          callback();
        }
      }, 100);
    } else if (!active && time !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval as NodeJS.Timer);
  }, [active, time]);

  return <></>;
}
