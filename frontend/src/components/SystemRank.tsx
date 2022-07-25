import { Stack, ImageList, ImageListItem, Container } from "@mui/material";
import { Applicant } from "../types";
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
    return <ImageListItem><ApplicantCard applicant={a} index={i} key={a.id} transparent={transparent} shortlist={shortlist} scale={true} ranking={false}
      writeExplanation={writeExplanation} /></ImageListItem>;});
  };

  return (
    <ImageList cols={shortlistLength} gap={8} sx={{minWidth: '70%'}}>
          {elements()}
    </ImageList>
  )
}

//TODO check for issues with elements not being ImageListItems