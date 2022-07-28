import { Button, Container, Stack, Card, CardContent } from "@mui/material";
import { Route, Routes, Link, useNavigate } from "react-router-dom";
import "../styles.css";
import HCaptcha from 'react-hcaptcha';
const resume = require("../imgs/andrea-piacquadio-resume.jpg");

type Props = {
  next: () => void;
}

export default function Homepage({next}: Props) {

    return (
      <Container>
      <Stack>
            <div>
      <Card sx={{padding: 5}}>
      <CardContent>
      Welcome, and we're happy you're here! If you're ready to get started, click the button below. 
      </CardContent> {/* 
      <HCaptcha sitekey="8e926a8e-af87-49d4-9468-efb44e5152cc" onVerify={onVerifyCaptcha}/> */}
      <br/>
      <Link to="/consent" style={{textDecoration: 'none'}}>
      <Button variant='contained' color='secondary' onClick={next}>Start study</Button></Link>
      </Card>
      <br />
      <br />
    </div>
      </Stack>
      </Container>
    );

    function onVerifyCaptcha(token) {console.log("Verified: " + token)}


};
