import * as React from "react";
import { Container, Typography, Dialog, DialogTitle, DialogContent, Stack } from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';
import ApplicantCard from "./ApplicantCard";
import { motion } from "framer-motion/dist/framer-motion";


const { toMinutes } = require("../util/Functions");

type Props = {
  callback: () => void;
  displayImage?: React.ReactNode;
  displayText?: string;
  timePeriod?: number;
}

export default function Spinner({callback, displayImage, displayText, timePeriod} : Props) {
  const [active, setActive] = React.useState(false);
  let buttonText = active ? 'Reset' : 'Spin';
  const timerRef = React.useRef<number>();

  const stackVariants = {
    start: {
      transition: {
        staggerChildren: 0.2,
        repeat: Infinity,
        repeatDelay: 1,
        duration: 1,
        delay: 1
      },
    },
    end: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

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
      callback();
    }, timePeriod);
  }

  return (
    <div>
      <Container>
        <Dialog open={active} fullWidth maxWidth='md' hideBackdrop>
          <DialogTitle>{displayText}</DialogTitle>
          <DialogContent>
            <Stack spacing={2} alignItems='center' justifyContent='center'>
            {displayImage}
            <Typography>Hold on, while I reconfigure... </Typography>
            <Stack direction='row' spacing={1} component={motion.div}
            variants={stackVariants}
            initial="start"
            animate="end">
            {Array(5).fill('').map((_, i) => <ApplicantCard animated key={`card-${i}`} />)}
            </Stack>
            </Stack>
            <br/>
            <br />
          </DialogContent>

        </Dialog>
        
      <br />
        </Container>
    </div>
  );
}
