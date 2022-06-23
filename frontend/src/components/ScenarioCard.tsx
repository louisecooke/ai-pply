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
import { Link } from "react-router-dom";

import { Scenario } from "../types";

type CardProps = {
  scenario: Scenario;
};

export default function ScenarioCard({ scenario }: CardProps) {
  return (
    <Card>
      <CardMedia
        component="img"
        alt="hiring-situation"
        height="140"
        image={scenario.image}
      />
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Scenario
        </Typography>
        <Typography variant="h5" component="div">
          {scenario.name}
        </Typography>
        <br />
        <Typography variant="body2">
          {scenario.description}
          <br />
        </Typography>
      </CardContent>
      <CardActions>
        <Container>
        <Link to={scenario.link}>
          <Button size="small">START</Button>
        </Link>
        </Container>
      </CardActions>
    </Card>
  );
}
