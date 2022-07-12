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
      <Card sx={{padding: 5, margin: 5}}>
      <CardContent>
      
      <Reorder.Group axis="x" values={cards} onReorder={setCards} as='ol'>
        
      <Stack direction='row' spacing={2}>
      {cards.map((a) => {
        return <Reorder.Item key={a.id} value={a}>
          <ApplicantCard instance={a} scale={scale} ranking={true}></ApplicantCard>
        </Reorder.Item>
        }
      )}
      </Stack>
    </Reorder.Group>
      </CardContent> 
      <Button variant='contained' color='secondary' onClick={rank}>End</Button>
      </Card>
      <br />
      <br />
    </Container>
  );
}
