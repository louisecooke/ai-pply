import * as React from "react";
import { Button, Container, Card, CardContent, Typography } from "@mui/material";
import { objectsEqual } from "../util/Functions";

const preferencesOne = {
  education: 20,
  cultureFit: 22,
  experience: 55
}

const preferencesTwo = {
  education: 20,
  cultureFit: 21,
  experience: 56
}

const preferencesThree = {
  cultureFit: 22,
  experience: 55
}

const preferencesFour = {
  education: 20,
  cultureFit: 22,
  experience: 55
}

export default function Playground() {
  //expect one = four != two != three
  return (
    <div>
      <Container>
      <Card sx={{padding: 5}}>
      <CardContent>
      <Typography>
      One and two: 
      {objectsEqual(preferencesOne, preferencesTwo) ? 'yes' : 'no'}
      <br />
      One and three:
      {objectsEqual(preferencesOne, preferencesThree) ? 'yes' : 'no'}
      <br />
      One and four:
      {objectsEqual(preferencesOne, preferencesFour) ? 'yes' : 'no'}
      <br />
      </Typography>
      </CardContent> 
      </Card>
      <br />
      <br />
      </Container>
    </div>
  );
}
