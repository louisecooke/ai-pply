import * as React from "react";
import { Button, Container, Card, CardContent, Typography } from "@mui/material";
import { objectsEqual } from "../util/Functions";
import Spinner from "../components/Spinner";
import SystemList from "./SystemList";
import { Applicant } from "../types";
import Ranking from "../components/Ranking";

const one = {
  id: 1,
  fields: {
  education: 20,
  cultureFit: 22,
  experience: 55
  }
} as Applicant;

const two = {
  id: 2,
  fields: {
  education: 20,
  cultureFit: 21,
  experience: 56
  }
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
  }
} as Applicant;

const five = {
  id: 5,
  fields: {
  education: 80,
  cultureFit: 62,
  experience: 35
  }
} as Applicant;

const six = {
  id: 6,
  fields: {
  education: 25,
  cultureFit: 92,
  experience: 55
  }
} as Applicant;


const appList = [one, two, four, five, six] as Applicant[];

export default function Playground() {
  let length = 4000;
  const next = () => {

  }
  //expect one = four != two != three
  return (
   <Ranking shortlist={appList} rank={() => {}} scale={true} /> 
  );
}
