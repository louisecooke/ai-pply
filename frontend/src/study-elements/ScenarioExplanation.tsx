import * as React from "react";
import { Button, Container, Card, CardContent } from "@mui/material";

type Props = {
  next: () => void;
}

export default function ScenarioExplanation({next}: Props) {
  return (
      <Container>
      <Card sx={{padding: 5}}>
      <CardContent>
      Scenario explanation here.
      </CardContent> 
      <Button variant='contained' color='secondary' onClick={next}>Let's go</Button>
      </Card>
      <br />
      <br />
      </Container>
  );
}
