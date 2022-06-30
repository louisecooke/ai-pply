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
  chooseScenario?: Function;
};

function SystemCard({ system, chooseScenario }: CardProps) {
  return (
    <Card sx={{maxHeight: 287, maxWidth: 400}}>
      <CardMedia
        component="img"
        alt="displayimg"
        height="178"
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