import { Slider, Stack, Card, CardMedia, Typography, IconButton } from '@mui/material';
import { Reorder, useMotionValue, motion } from "framer-motion/dist/framer-motion";
import { Applicant } from "../types";
import InfoIcon from '@mui/icons-material/Info';
import * as React from 'react';

const blankProfile = require("../imgs/avatar-g4549a99eb_640.png");

type Props = {
    applicant: Applicant;
    index?: number;
    scale?: boolean;
    transparent: boolean;
    shortlist: Function;
    writeExplanation: Function;
  };

function ApplicantLine({applicant, index, scale = false, transparent, shortlist, writeExplanation}: Props) {
  let selected = typeof(index) !== 'undefined' && index < 5;
  const renderScale = (p: string) => {
    return (
      <Stack key={`app${applicant.id}-${p}-scale`} spacing={3} direction='row' alignItems='center' justifyContent='space-between'>
        <Typography variant="caption" color="text.secondary">
          {p}
        </Typography>
        { applicant && <Slider aria-label={p} value={applicant.fields[p]} components={{Thumb: Empty}} sx={{maxWidth: '100%'}}/>} 
      </Stack>
    );  
  }

  const renderPercentage = (p: string) => {
    return (
      <Stack key={`app${applicant.id}-${p}-percent`} spacing={2} direction='row' alignItems='center' justifyContent='space-between'>
        <Typography variant="caption" color="text.secondary">
          {p}
        </Typography>
        {applicant &&
        <Typography>
          {applicant.fields[p]}%
        </Typography>}
      </Stack>
    );  
  }

  const renderNumber = (n: number) => {
    if (n < 10) {
      return '\xa0\xa0#' + n
    } else {
      return '#' + n
    }
  }

  const selectedColor = (theme) => theme.palette.secondary.main;
  const defaultColor = (theme) => theme.palette.info.main;

  const itemStyle = {
    y: useMotionValue(0),
    touchAction: 'pan-y'
  }

  return (
    <Stack direction='row' key={`stack-${applicant.id}`}>
    <motion.div key={`orderitem-${applicant.id}`} value={applicant} style={itemStyle} onTap={() => shortlist(applicant)}>

    <Card sx={{border: 10,
    maxWidth: 800, borderColor: selected ? selectedColor : defaultColor}}>
      <Stack direction='row'>
        <CardMedia
          component="img"
          height="100"
          width="30"
          image={blankProfile.default}
          alt="applicant photo"
        />
        <Stack direction='row' spacing={5} alignItems='center' sx={{margin: 2, minWidth: 500}}>
          <Typography variant="h5" component="div">
            {applicant && renderNumber(applicant.id)}
          </Typography>
            {applicant && Object.keys(applicant.fields).map(p => scale ? renderScale(p) : renderPercentage(p))}
        </Stack>
      </Stack>
    </Card>

    </motion.div>
    {transparent && applicant.reason && <IconButton color={selected ? 'secondary' : 'info'} aria-label="view explanation" component="span" onClick={() => (writeExplanation(applicant))}>
    <InfoIcon />
  </IconButton>}
    </Stack>
  );
}

function Empty() {
  return <></>;
}

export default React.memo(ApplicantLine);