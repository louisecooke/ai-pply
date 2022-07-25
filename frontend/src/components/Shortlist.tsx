import * as React from "react";
import { Button, Stack, Typography } from "@mui/material";
import ApplicantCard from "./ApplicantCard";
import { Applicant } from "../types";
import { Reorder } from "framer-motion/dist/framer-motion";
import { shortlistLength } from "../study-config/Configuration";

type Props = {
  shortlist: Applicant[];
  rank: () => void;
  scale: boolean;
  demo?: boolean;
}

export default function Shortlist({shortlist, rank, scale, demo = false}: Props) {
  const [cards, setCards] = React.useState(shortlist);

  return (
    <div>
      <Reorder.Group axis="x" values={cards} onReorder={setCards} as='div'>
      <Stack direction='row' marginTop={2} spacing={2} justifyContent='center'>
      {cards.map((a, i) => {
        return <Stack spacing={2}>

        <Reorder.Item key={a.id} value={a} as='div'>
          <ApplicantCard applicant={a} scale={scale} ranking={true}></ApplicantCard>
        </Reorder.Item>
        {(i == 0) &&
        <Typography color='secondary' variant='h6'>
          Preferred
        </Typography>}
        {(i == shortlistLength - 1 ) &&
        <Typography color='secondary' variant='h6'>
          Least preferred
        </Typography>}


        </Stack>
        }
      )}
      </Stack>
    </Reorder.Group>
    {!demo &&
    <Button variant='contained' color='secondary' onClick={rank} sx={{margin: 5}}>FINALIZE</Button>}
    </div>
  );
}
