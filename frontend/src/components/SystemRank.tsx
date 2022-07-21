import { Stack} from "@mui/material";
import { Applicant } from "../types";
import { Reorder } from "framer-motion/dist/framer-motion";
import ApplicantLine from "./ApplicantLine";

type Props = {
  applicants: Applicant[];
  setApplicants: Function;
  transparent: boolean;
  writeExplanation: Function;
};

export default function SystemRank({applicants, setApplicants, transparent, writeExplanation}: Props) {

  function shortlist(applicant: Applicant) {
    let newList = [applicant, ...applicants.filter(a => a.id !== applicant.id)];
    setTimeout(setApplicants(newList), 1000);
  }

  const elements = () => {
    return applicants.map((a, i) => {
    return (<ApplicantLine applicant={a} index={i} key={a.id} transparent={transparent} shortlist={shortlist} writeExplanation={writeExplanation}/> );});
  }

  return (
    <Stack alignItems='flex-start' direction='column' spacing={2} sx={{marginTop: 0, marginBottom: 10}}>
      {elements()}
    </Stack>
    );
}

