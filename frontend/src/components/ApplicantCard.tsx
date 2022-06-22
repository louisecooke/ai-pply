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
  };

export default function ComparableCard({instance}: Props) {
  const renderDetail = (p: string) => {
    return (
      <Stack spacing={2} direction='row' alignItems='center' justifyContent='space-between' key={p}>
        <Typography variant="caption" color="text.secondary">
          {p}
        </Typography>
        <Slider aria-label={p} value={instance.fields[p]} components={{Thumb: Empty}} sx={{maxWidth: '50%'}}/> 
      </Stack>
    );  
}

  return (
    <Card sx={{ maxWidth: 400 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={blankProfile}
          alt="applicant photo"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Applicant
          </Typography>
            {Object.keys(instance.fields).map(p => renderDetail(p))}
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

function Empty() {
  return <></>;
}