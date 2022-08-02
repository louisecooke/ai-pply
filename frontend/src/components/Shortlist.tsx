import * as React from "react";
import { Button, Stack, Typography } from "@mui/material";
import ApplicantCard from "./ApplicantCard";
import { Applicant } from "../types";
import { Reorder } from "framer-motion/dist/framer-motion";
import { shortlistLength } from "../study-config/Configuration";

type Props = {
  shortlist: Applicant[];
  rank: (list: Applicant[], reorders: number, time: number) => void;
  scale: boolean;
  demo?: boolean;
}

export default function Shortlist({shortlist, rank, scale, demo = false}: Props) {
  const [cards, setCards] = React.useState(shortlist);

  //to compensate for first render
  const reorderChanges = React.useRef(-1);
  const totalTime = React.useRef(0);

  React.useEffect( () => {
    reorderChanges.current += 1;
  }, [cards]);

  React.useEffect(() => {
    const interval = setInterval(() => {
      totalTime.current += 1;
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <Reorder.Group axis="x" values={cards} onReorder={setCards} as='div'>
      <Stack direction='row' marginTop={2} spacing={2} justifyContent='center'>
      {cards.map((a, i) => {
        return <Stack spacing={2} key={`shortliststack-${a.id}`}>

        <Reorder.Item key={a.id} value={a} as='div'>
          <ApplicantCard applicant={a} scale={scale} ranking={true}></ApplicantCard>
        </Reorder.Item>
        {(i === 0) &&
        <Typography color='secondary' variant='h6'>
          Preferred
        </Typography>}
        {(i === shortlistLength - 1 ) &&
        <Typography color='secondary' variant='h6'>
          Least preferred
        </Typography>}


        </Stack>
        }
      )}
      </Stack>
    </Reorder.Group>
    {!demo &&
    <Button variant='contained' color='secondary' onClick={() => rank(cards, reorderChanges.current, totalTime.current)} sx={{margin: 5}}>FINALIZE</Button>}
    </div>
  );
}
