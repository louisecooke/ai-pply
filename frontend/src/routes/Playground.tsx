import * as React from "react";
import { Button, Container, Card, CardContent, Typography } from "@mui/material";
import { objectsEqual } from "../util/Functions";
import Spinner from "../components/Spinner";
import SystemList from "./SystemList";

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
  let length = 4000;
  const next = () => {

  }
  //expect one = four != two != three
  return (
    <div>
      <Container>
      <Card sx={{padding: 5}}>
      <CardContent>
      <Typography>
      {/* <SystemList setTheme={setTheme} onFinish={next}/> */}
     {/*  <Spinner displayText="a simple spinner" timePeriod={length} callback={() => {}}/> */}
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
