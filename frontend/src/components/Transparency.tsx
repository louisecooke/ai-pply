import * as React from "react";
import { Container, Typography, Dialog, DialogTitle, DialogContent, Stack, IconButton } from "@mui/material";
import ApplicantCard from "./ApplicantCard";
import { motion } from "framer-motion/dist/framer-motion";
import InfoIcon from '@mui/icons-material/Info';


const { toMinutes } = require("../util/Functions");

type Props = {
  callback?: () => void;
  displayText?: string;
  timePeriod?: number;
}

export default function Transparency({callback, displayText, timePeriod} : Props) {
  const [active, setActive] = React.useState(false);
  const timerRef = React.useRef<number>();

  function setClosed() {
    setActive(false);
  }

  return (
    <>
    <IconButton color="secondary" aria-label="view explanation" component="span" onClick={() => setActive(true)}>
    <InfoIcon />
  </IconButton>
    <div>
      <Container>
        <Dialog open={active} fullWidth maxWidth='md' onClose={setClosed}>
          <DialogTitle>Info</DialogTitle>
          <DialogContent>
            <Typography>{displayText}</Typography>
          </DialogContent>

        </Dialog>
        </Container>
    </div>
    </>
  );
}
