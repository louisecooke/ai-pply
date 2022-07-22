import { Stack, ImageList, ImageListItem } from "@mui/material";
import { Applicant } from "../types";
import { Reorder } from "framer-motion/dist/framer-motion";
import ApplicantLine from "./ApplicantLine";
import ApplicantCard from "./ApplicantCard";
import { shortlistLength } from "../study-config/Configuration";

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
    return <ApplicantCard applicant={a} index={i} key={a.id} transparent={transparent} shortlist={shortlist} scale={true} ranking={false}
      writeExplanation={writeExplanation} />;});
  };

  return (
    <ImageList cols={shortlistLength} gap={18} sx={{minWidth: '60%'}}>
          {elements()}
    </ImageList>
  )
}

