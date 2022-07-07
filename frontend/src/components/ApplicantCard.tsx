import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, Slider, Stack} from '@mui/material';
import { motion } from "framer-motion/dist/framer-motion";
import { Comparable } from "../types";


const blankProfile = require("../imgs/avatar-g4549a99eb_640.png");

type Props = {
    animated?: Boolean;
    instance?: Comparable;
    scale?: Boolean;
    loadingTime?: number;
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

export default function ComparableCard({animated = false, instance, scale, loadingTime = 4000}: Props) {
  const renderScale = (p: string) => {
    return (
      <Stack spacing={2} direction='row' alignItems='center' justifyContent='space-between' key={p}>
        <Typography variant="caption" color="text.secondary">
          {p}
        </Typography>
        { instance && <Slider aria-label={p} value={instance.fields[p]} components={{Thumb: Empty}} sx={{maxWidth: '50%'}}/>} 
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

  const scaleCard = () => {
    return (
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
        Applicant
      </Typography>
        {instance && Object.keys(instance.fields).map(p => renderScale(p))}
    </CardContent>);
  }

  const ratingCard = () => {
    return (
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Applicant
          </Typography>
          {scale && 
          <Typography variant="caption" color="text.secondary">
            Ratings:
        </Typography> }
            {instance && Object.keys(instance.fields).map(p => renderPercentage(p))}
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

  return (
    animated ? animatedCard() :
    <Card sx={{ maxWidth: 400 }}>
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
  );
}

function Empty() {
  return <></>;
}