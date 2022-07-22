import * as React from "react";
import { Button, Container, Card, CardContent, Typography } from "@mui/material";
import { objectsEqual } from "../util/Functions";
import Spinner from "../components/Spinner";
import SystemList from "./SystemList";
import { Applicant, Completion, Manipulation } from "../types";
import Shortlist from "../components/Shortlist";
import TaskExplanation from "./TaskExplanation";
import Training from "../animations/Training";

const one = {
  id: 1,
  fields: {
  education: 20,
  cultureFit: 22,
  experience: 55
  },
  reason: ''
} as Applicant;

const two = {
  id: 2,
  fields: {
  education: 20,
  cultureFit: 21,
  experience: 56
  },
  reason: ''
} as Applicant;

const three = {
  cultureFit: 22,
  experience: 55
}

const four = {
  id: 4,
  fields: {
  education: 20,
  cultureFit: 22,
  experience: 55
  },
  reason: ''
} as Applicant;

const five = {
  id: 5,
  fields: {
  education: 80,
  cultureFit: 62,
  experience: 35
  },
  reason: ''
} as Applicant;

const six = {
  id: 6,
  fields: {
  education: 25,
  cultureFit: 92,
  experience: 55
  },
  reason: ''
} as Applicant;


const appList = [one, two, four, five, six] as Applicant[];



export default function Playground() {
  const [systems, setSystems] = React.useState([] as Manipulation[]);

  const getSystems = async () => {
    let response = await fetch("api/systems/");
    let data = await response.json();
    setSystems(data as Manipulation[]);
  }

  React.useEffect( () => {
    getSystems();
  }, []);
  
  return (
   <Training systemList={systems} onFinish={() => {}}/>
  );
}
