import { Stack, Card} from "@mui/material";

import * as React from "react";
import { Recommendation, Applicant } from "../types";

import { Reorder } from "framer-motion/dist/framer-motion";

import ApplicantLine from "./ApplicantLine";

type Props = {
  applicants: Applicant[];
  setApplicants: Function;
};

export default function SystemRank({applicants, setApplicants}: Props) {

  const elements = () => {
    return applicants.map((a, i) => {
    return (<ApplicantLine instance={a} index={i}/> );});

  }

  return (
    <Reorder.Group axis="y" values={applicants} onReorder={setApplicants} as='div'>
    <Stack alignItems='flex-end' direction='column' spacing={2} sx={{marginTop: 0}}>
      {elements()}
    </Stack>
    
    </Reorder.Group>
    );


  function next() {

  }
}

