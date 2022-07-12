import * as React from "react";
import { Button, Card, CardContent, Container, Stack } from "@mui/material";
import ApplicantCard from "./ApplicantCard";
import { Applicant } from "../types";
import { Reorder } from "framer-motion/dist/framer-motion";

type Props = {
  shortlist: Applicant[];
  rank: () => void;
  scale: boolean;
}

export default function Ranking({shortlist, rank, scale}: Props) {
  const [cards, setCards] = React.useState(shortlist);

  return (
    <Container>
    
      <Reorder.Group axis="x" values={cards} onReorder={setCards} as='ol'>
        
      <Stack direction='row' spacing={4} justifyContent='center'>
      {cards.map((a, i) => {
        if (i < 5) {
        return <Reorder.Item key={a.id} value={a}>
          <ApplicantCard instance={a} scale={scale} ranking={true}></ApplicantCard>
        </Reorder.Item>
        } else {
          return <></>
        }}
      )}
      </Stack>
    </Reorder.Group>
      <Button variant='contained' color='secondary' onClick={rank}>FINALIZE</Button>
      <br />
      <br />
    </Container>
  );
}
