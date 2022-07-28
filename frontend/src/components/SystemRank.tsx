import { ImageList, ImageListItem } from "@mui/material";
import { Applicant } from "../types";
import ApplicantCard from "./ApplicantCard";
import { shortlistLength } from "../study-config/Configuration";

type Props = {
  applicants: Applicant[];
  setApplicants: Function;
  scale: boolean;
  transparent: boolean;
  writeExplanation: Function;
};

export default function SystemRank({applicants, setApplicants, scale, transparent, writeExplanation}: Props) {

  function shortlist(applicant: Applicant, index: number) {
    let newList: Applicant[] = [];
    if (index < shortlistLength) {
      newList = [...applicants.slice(0, index), ...applicants.slice(index + 1, shortlistLength + 1), applicant, ...applicants.slice(shortlistLength + 1)]
    } else {
      newList = [applicant, ...applicants.slice(0, index), ...applicants.slice(index + 1)];
    }
    setTimeout(setApplicants(newList), 1000);
  }

  const elements = () => {
    return applicants.map((a, i) => {
    return <ImageListItem key={`imagelist-${a.id}`} ><ApplicantCard applicant={a} index={i} key={a.id} transparent={transparent} shortlist={shortlist} scale={scale} ranking={false}
      writeExplanation={writeExplanation} /></ImageListItem>;});
  };

  return (
    <ImageList cols={shortlistLength} gap={24}>
          {elements()}
    </ImageList>
  )
}