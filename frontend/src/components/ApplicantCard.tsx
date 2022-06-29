import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, Slider, Stack} from '@mui/material';

import { Comparable } from "../types";


const blankProfile = require("../imgs/avatar-g4549a99eb_640.png");

type Props = {
    instance: Comparable;
    scale: Boolean;
  };

export default function ComparableCard({instance, scale}: Props) {
  const renderScale = (p: string) => {
    return (
      <Stack spacing={2} direction='row' alignItems='center' justifyContent='space-between' key={p}>
        <Typography variant="caption" color="text.secondary">
          {p}
        </Typography>
        <Slider aria-label={p} value={instance.fields[p]} components={{Thumb: Empty}} sx={{maxWidth: '50%'}}/> 
      </Stack>
    );  
  }

  const renderPercentage = (p: string) => {
    return (
      <Stack spacing={2} direction='row' alignItems='center' justifyContent='space-between' key={p}>
        <Typography variant="caption" color="text.secondary">
          {p}
        </Typography>
        <Typography>
          {instance.fields[p]}%
        </Typography>

      </Stack>
    );  
  }

  const scaleCard = () => {
    return (
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
        Applicant
      </Typography>
        {Object.keys(instance.fields).map(p => renderScale(p))}
    </CardContent>);
  }

  const ratingCard = () => {
    return (
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Applicant
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Ratings:
        </Typography>
            {Object.keys(instance.fields).map(p => renderPercentage(p))}
        </CardContent>
    );
  }

  return (
    <Card sx={{ maxWidth: 400 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={blankProfile.default}
          alt="applicant photo"
        />
          { scale ? scaleCard() : ratingCard() }
      </CardActionArea>
    </Card>
  );
}

function Empty() {
  return <></>;
}