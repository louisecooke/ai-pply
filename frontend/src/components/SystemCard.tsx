import {
  Card,
  CardMedia,
  CardContent,
  Typography
} from "@mui/material";
import React from 'react';

import { Manipulation } from "../types";

const defaultImg = require("../imgs/andrea-piacquadio-resume.jpg");

type CardProps = {
  system: Manipulation;
};

function SystemCard({ system }: CardProps) {
  return (
    <Card sx={{height: '10%', width: '80%'}}>
      <CardMedia
        component="img"
        alt="displayimg"
        /* height="10%" */
        image={system.image ? system.image : defaultImg}
      />
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {system.title}
        </Typography>
        <br />
        <Typography variant="body2">
          {system.description}
          <br />
        </Typography>
      </CardContent>
    </Card>
  );
}

export default React.memo(SystemCard);