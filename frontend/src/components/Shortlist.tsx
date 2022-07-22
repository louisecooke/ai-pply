import * as React from "react";
import { Button, Stack, Typography } from "@mui/material";
import ApplicantCard from "./ApplicantCard";
import { Applicant } from "../types";
import { Reorder } from "framer-motion/dist/framer-motion";

type Props = {
  shortlist: Applicant[];
  rank: () => void;
  scale: boolean;
}

export default function Shortlist({shortlist, rank, scale}: Props) {
  const [cards, setCards] = React.useState(shortlist);

  return (
    <div>
      <Reorder.Group axis="x" values={cards} onReorder={setCards} as='div'>
      <Stack direction='row' spacing={2} justifyContent='center'>
      {cards.map((a, i) => {
        return <Stack spacing={2}>

        <Reorder.Item key={a.id} value={a} as='div'>
          <ApplicantCard instance={a} scale={scale} ranking={true}></ApplicantCard>
        </Reorder.Item>
        {(i == 0) &&
        <Typography color='secondary' variant='h6'>
          Preferred
        </Typography>}
        {(i == 4) &&
        <Typography color='secondary' variant='h6'>
          Least preferred
        </Typography>}


        </Stack>
        }
      )}
      </Stack>
    </Reorder.Group>
    <Button variant='contained' color='secondary' onClick={rank} sx={{margin: 5}}>FINALIZE</Button>
    </div>
  );
}
