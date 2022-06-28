import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  Container
} from "@mui/material";
import * as React from "react";

import { Manipulation } from "../types";

const defaultImg = require("../imgs/andrea-piacquadio-resume.jpg");

type CardProps = {
  system: Manipulation;
  chooseScenario?: Function;
};

export default function SystemCard({ system, chooseScenario }: CardProps) {
  return (
    <Card sx={{maxHeight: 300, maxWidth: 300}}>
      <CardMedia
        component="img"
        alt="displayimg"
        height="140"
        image={system.image ? system.image : defaultImg}
      />
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {system.title}
        </Typography>
        <br />
        <Typography variant="body2">
          {system.transparency && "Watch me make decisions."}
        </Typography>
        <Typography variant="body2">
          {system.control && "Help me make decisions."}
          <br />
        </Typography>
      </CardContent>
{/*       <CardActions>
        <Container>
          <Button size="small" onClick={() => {chooseScenario(system)}} >START</Button>
        </Container>
      </CardActions> */}
    </Card>
  );
}
