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

  function shortlist(applicant: Applicant) {
    let newList = [applicant, ...applicants.filter(a => a.id !== applicant.id)];
    setTimeout(setApplicants(newList), 1000);
    //setApplicants();
  }

  const elements = () => {
    return applicants.map((a, i) => {
    return (<ApplicantLine instance={a} index={i} key={a.id} shortlist={shortlist}/> );});
  }

  return (
    <Reorder.Group axis="y" values={applicants} onReorder={setApplicants} as='div'>
    <Stack alignItems='flex-end' direction='column' spacing={2} sx={{marginTop: 0, marginBottom: 10}}>
      {elements()}
    </Stack>
    </Reorder.Group>
    );
}

