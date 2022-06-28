import * as React from "react";
import { Button, Grid } from "@mui/material";
const { toMinutes } = require("../util/Functions");

type Props = {
  finished: boolean; 
  onFinish: Function;
}

export default function Timer({finished, onFinish} : Props) {
  const [time, setTime] = React.useState(0);
  const [active, setActive] = React.useState(true);

  const toggleTimer = () => {
    setActive(!active);
  }


  React.useEffect(() => {
    if (finished) {
      setActive(false);
      onFinish(time);
    }
  }, [finished]);

  React.useEffect(() => {
    let interval;
    if (active) {
      interval = setInterval(() => {
        setTime((time) => time + 1);
      }, 1000);
    } else if (!active && time !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval as NodeJS.Timer);
  }, [active, time]);

  return (
    <div>
      <Grid container columnSpacing={4} justifyContent='center' alignItems='center'>
        <Grid item>
        <h1>{toMinutes(time)}</h1>
        </Grid>

        </Grid>
    </div>
  );
}
