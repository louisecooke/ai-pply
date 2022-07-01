import * as React from "react";
import { Box, Grid, Button, Typography, Dialog, DialogTitle, DialogContent, Stack } from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';


const { toMinutes } = require("../util/Functions");

type Props = {
  callback: (boolean) => void;
  displayImage?: React.ReactNode;
  displayText?: string;
  timePeriod?: number;
}

export default function Spinner({callback, displayImage, displayText, timePeriod} : Props) {
  const [active, setActive] = React.useState(false);
  let buttonText = active ? 'Reset' : 'Spin';
  const timerRef = React.useRef<number>();

  React.useEffect(
    () => () => {
      clearTimeout(timerRef.current);
      handleClick();
    },
    [],
  );

  function handleClick() {
    setActive(true);
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = window.setTimeout(() => {
      setActive(false);
      callback(false);
    }, timePeriod);
  }

  return (
    <div>
      <Grid container columnSpacing={4} justifyContent='center' alignItems='center'>
        <Grid item>

        
        
        <Dialog open={active}>
          <DialogTitle>{displayText}</DialogTitle>
          <DialogContent sx={{minWidth: '500px', minHeight: '500px'}}>
            <Stack spacing={5} alignItems='center' justifyContent='center'>
            {displayImage}
            <Typography>Hold on, while I reconfigure... </Typography>
            <CircularProgress />
            </Stack>
          </DialogContent>

        </Dialog>
        
      <br />
        </Grid>

        </Grid>
    </div>
  );
}
