import * as React from "react";
import { Typography, Dialog, Button, DialogContent, DialogActions, Stack } from "@mui/material";
import { TypeAnimation } from "../animations/Typewriter";

type Props = {
  text: string;
  frequency: number;
  callback: () => void;
  displayImage?: React.ReactNode;
}

export default function ReasonDialog({text, frequency, callback, displayImage} : Props) {
  const [active, setActive] = React.useState(text !== '');
  const [buttonActive, setButton] = React.useState(false);

  React.useEffect( () => {
    setActive(text !== '');
  }, [text]);

  function closeDialog() {
    setActive(false);
    setButton(false);
    callback();
  }

  function toggleButton() {
    setButton(!buttonActive);
  }

  return (
    <div>
        <Dialog open={active} fullWidth maxWidth='md' hideBackdrop>
          
        <Stack spacing={2} justifyContent='center'>
          <DialogContent>
            <Stack direction='row' spacing={2} alignItems='center' justifyContent='center'>
            {displayImage}
            <Typography>
            <TypeAnimation text={text} frequency={frequency} speed={10} callback={toggleButton}/>
            </Typography>
            </Stack>
          </DialogContent>
          <DialogActions>
          <Button variant='contained' color='secondary' size='small' disabled={!buttonActive} onClick={closeDialog}>Got it</Button>
          </DialogActions>
          </Stack>
        </Dialog>
    </div>
  );
}
