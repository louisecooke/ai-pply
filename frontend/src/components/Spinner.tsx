import * as React from "react";
import { Container, Typography, Dialog, DialogTitle, DialogContent, Stack } from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';
import ApplicantCard from "./ApplicantCard";
import { motion } from "framer-motion/dist/framer-motion";


const { toMinutes } = require("../util/Functions");

type Props = {
  callback: () => void;
  visible: boolean;
  displayImage?: React.ReactNode;
  displayText?: string;
  timePeriod?: number;
}

export default function Spinner({callback, visible, displayImage, displayText, timePeriod} : Props) {
  const [active, setActive] = React.useState(visible);
  const timerRef = React.useRef<number>();

  const stackVariants = {
    start: {
      transition: {
        staggerChildren: 0.2,
      },
    },
    end: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  React.useEffect(
    () => {
      visible && handleClick();
    },
    [visible],
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
            <Typography>Hold on, while I think over your changes... </Typography>
            <Stack direction='row' spacing={1} component={motion.div}
            variants={stackVariants}
            initial="start"
            animate="end">
            {Array(5).fill('').map((_, i) => <ApplicantCard animated key={`card-${i}`} loadingTime={timePeriod}/>)}
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
