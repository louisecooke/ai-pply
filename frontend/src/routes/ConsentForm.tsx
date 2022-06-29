import * as React from "react";
import { Button, Card, CardContent } from "@mui/material";

type Props = {
  next: () => void;
}

export default function ConsentForm({next}: Props) {
  return (
    <div>
      <Card sx={{padding: 5}}>
      <CardContent>
      Placeholder here to obtain informed consent from participants.
      </CardContent> 
      <Button variant='contained' color='secondary' onClick={next}>Agree</Button>
      </Card>
      <br />
      <br />
    </div>
  );
}
