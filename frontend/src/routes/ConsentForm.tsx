import * as React from "react";
import { Button, Card, CardContent, Container } from "@mui/material";

type Props = {
  onFinish: () => void;
}

export default function ConsentForm({onFinish: next}: Props) {
  return (
    <Container>
      <Card sx={{padding: 5}}>
      <CardContent>
      Placeholder here to obtain informed consent from participants.
      </CardContent> 
      <Button variant='contained' color='secondary' onClick={next}>Agree</Button>
      </Card>
      <br />
      <br />
    </Container>
  );
}
