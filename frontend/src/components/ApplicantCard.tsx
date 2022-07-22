import * as React from 'react';
import { Card, CardContent, CardMedia, Typography, CardActionArea, Slider, Stack, IconButton } from '@mui/material';
import { motion, useMotionValue } from "framer-motion/dist/framer-motion";
import { Applicant } from "../types";

import InfoIcon from '@mui/icons-material/Info';
import { shortlistLength } from '../study-config/Configuration';


const blankProfile = require("../imgs/avatar-g4549a99eb_640.png");

type Props = {
    animated?: boolean;
    applicant?: Applicant;
    index?: number;
    scale?: boolean;
    loadingTime?: number;
    ranking?: boolean;
    shortlist?: Function;
    transparent?: boolean;
    writeExplanation?: Function;
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

export default function ApplicantCard({animated = false, applicant, scale, loadingTime = 4000, ranking = false, index,
  shortlist = () => {}, transparent = false, writeExplanation = () => {}}: Props) {
  let selected = typeof(index) !== 'undefined' && index < shortlistLength;

  const renderScale = (p: string) => {
    return (
      <Stack spacing={2} direction='row' alignItems='center' justifyContent='space-between' key={p}>
        <Typography variant="caption" color="text.secondary">
          {p}
        </Typography>
        { applicant && <Slider aria-label={p} value={applicant.fields[p]} components={{Thumb: Empty}} sx={{maxWidth: '50%'}}/>} 
      </Stack>
    );  
  }

  const renderPercentage = (p: string) => {
    return (
      <Stack spacing={2} direction='row' alignItems='center' justifyContent='space-between' key={p}>
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

  const scaleCard = () => {
    return (
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
        {applicant && '#' + applicant.id}
      </Typography>
        {applicant && Object.keys(applicant.fields).map(p => renderScale(p))}
    </CardContent>);
  }

  const ratingCard = () => {
    return (
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
          {applicant && '#' + applicant.id}
          </Typography>
          {scale && 
          <Typography variant="caption" color="text.secondary">
            Ratings:
        </Typography> }
            {applicant && Object.keys(applicant.fields).map(p => renderPercentage(p))}
        </CardContent>
    );
  }


  const animatedCard = () => {
    return (
      <Card component={motion.div}
          variants={loadingApplicantVariants}
          transition={{yoyo: loadingTime / 1000, ...loadingApplicantTransition}}
          sx={{
            border: 20,
            borderColor: (theme) => theme.palette.secondary.main}}>
          <CardMedia
            component="img"
            height="140"
            image={blankProfile.default}
            alt="applicant photo"
          />
          <CardContent>
          <Typography>Applicant</Typography>
          </CardContent>
      </Card>
    );
  };

  const displayCard = () => {
    return <Card sx={{ border: 10, borderColor: selected ? selectedColor : defaultColor,
    }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={blankProfile.default}
          alt="applicant photo"
        />
          {scale ? scaleCard() : ratingCard()}
      </CardActionArea>
    </Card>
  }
  
  const itemStyle = {
    y: useMotionValue(0),
    touchAction: 'pan-y'
  }

  
  const selectedColor = (theme) => theme.palette.secondary.main;
  const defaultColor = (theme) => theme.palette.info.main;

  return (
    animated ? animatedCard() : ranking ?  
    displayCard() : Selectable(displayCard())
  );


  function Selectable(element: any) {
    return (
      (applicant) ?
      <Stack>
      <motion.div key={`orderitem-${applicant.id}`} value={applicant} style={itemStyle} onTap={() => shortlist(applicant)}>
        {element}
      </motion.div>
       {transparent && applicant.reason && <IconButton color={selected ? 'secondary' : 'info'} aria-label="view explanation" component="span" onClick={() => (writeExplanation(applicant))}>
       <InfoIcon />
     </IconButton>}
       </Stack>
      : <></>
    )
  }
}

function Empty() {
  return <></>;
}

