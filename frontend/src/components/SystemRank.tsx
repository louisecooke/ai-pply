import { Stack, Card} from "@mui/material";

import * as React from "react";
import { Recommendation, Applicant } from "../types";

import ApplicantLine from "./ApplicantLine";

type Props = {
  applicants: Applicant[];
};

export default function SystemRank({applicants}: Props) {

  const elements = () => {
    return applicants.map((a, i) => {
    return (<ApplicantLine instance={a} index={i}/> );});

  }

  return (
    <Stack alignItems='flex-end' direction='column' spacing={2} sx={{marginTop: 0}}>
      {elements()}
    </Stack>
    );


  function next() {

  }
}

