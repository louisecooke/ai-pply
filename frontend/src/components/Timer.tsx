import * as React from "react";

type Props = {
  duration: number;
  callback: Function;
  delay: number;
}

export default function Timer({duration, callback, delay} : Props) {
  const [time, setTime] = React.useState(0);
  const [active, setActive] = React.useState(false);

  React.useEffect(() => {
    setTimeout( () => setActive(true), delay * 1000);
  }, []);

  React.useEffect(() => {
    let interval;
    if (active) {
      interval = setInterval(() => {
        setTime((time) => time + 1);
        if (time % (duration * 10) === 0) {
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
