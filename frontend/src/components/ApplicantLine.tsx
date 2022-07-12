import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, Slider, Stack} from '@mui/material';
import { motion} from "framer-motion/dist/framer-motion";
import { Comparable } from "../types";


const blankProfile = require("../imgs/avatar-g4549a99eb_640.png");

type Props = {
    instance?: Comparable;
    index?: number;
    scale?: boolean;
    transparent?: boolean;
  };

const loadingApplicantVariants = {
  start: {
    y: "20%",
  },
  end: {
    y: "0%",
  },
}

const loadingApplicantTransition = {
  duration: 0.5,
  ease: "easeInOut",
}

export default function ApplicantLine({instance, index, scale = false, transparent = false}: Props) {
  let selected = typeof(index) !== 'undefined' && index < 5;
  const renderScale = (p: string) => {
    return (
      <Stack spacing={3} direction='row' alignItems='center' justifyContent='space-between' key={p}>
        <Typography variant="caption" color="text.secondary">
          {p}
        </Typography>
        { instance && <Slider aria-label={p} value={instance.fields[p]} components={{Thumb: Empty}} sx={{maxWidth: '100%'}}/>} 
      </Stack>
    );  
  }

  const renderPercentage = (p: string) => {
    return (
      <Stack spacing={2} direction='row' alignItems='center' justifyContent='space-between' key={p}>
        <Typography variant="caption" color="text.secondary">
          {p}
        </Typography>
        {instance &&
        <Typography>
          {instance.fields[p]}%
        </Typography>}

      </Stack>
    );  
  }

  const renderNumber = (n: number) => {
    if (n < 10) {
      return '\xa0#' + n
    } else {
      return '#' + n
    }
  }

  const selectedStyle = {
    border: 10,
    maxWidth: 800,
    borderColor: (theme) => theme.palette.secondary.main,
  }

  const defaultStyle = {
    border: 10,
    maxWidth: 800,
    borderColor: (theme) => theme.palette.tertiary.main
  }

  return (
    <Card sx={selected ? selectedStyle : defaultStyle}>
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
            {instance && renderNumber(instance.id + 1)}
          </Typography>
            {instance && Object.keys(instance.fields).map(p => scale ? renderScale(p) : renderPercentage(p))}
        </Stack>
      </Stack>
    </Card>
  );
}

function Empty() {
  return <></>;
}