import { ImageList, ImageListItem } from "@mui/material";
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
    return <ImageListItem key={`imagelist-${a.id}`} ><ApplicantCard applicant={a} index={i} key={a.id} transparent={transparent} shortlist={shortlist} scale={true} ranking={false}
      writeExplanation={writeExplanation} /></ImageListItem>;});
  };

  return (
    <ImageList cols={shortlistLength} gap={24}>
          {elements()}
    </ImageList>
  )
}