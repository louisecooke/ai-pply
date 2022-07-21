import * as React from "react";
import { Button, Container, Card, CardContent, Stack } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import ApplicationAnimation from "../animations/ApplicationAnimation";
import { Manipulation } from "../types";
import Training from "../animations/Training";

import desk from "../imgs/school-desk-and-chair.png";
import SystemCard from "../components/SystemCard";

type Props = {
  onFinish: Function;
  systemList: Manipulation[];
}

export default function TaskExplanation({systemList,  onFinish}: Props) {
  const [page, setPage] = React.useState(0);

  const nextPage = () => {
    setPage(page + 1);
  }

  const workflow = [opener(), two(), three(), four(), five(), six(), seven(), <Training systemList={systemList} onFinish={onFinish}/>, 
  ];

  return (
    <Routes>
    <Route path="*" element={workflow[page]} />
    </Routes>
  );

  
  function opener() {
    return (
      <Container sx={{margin: 20}}>
      <Stack direction='row' spacing={20}>
      <Card sx={{padding: 5}}>
      <CardContent>
      You are the Operations Manager of a rapidly-growing company. After receiving funding for a new department, your human resources team must fill 40 new openings,
      mostly for junior-level employees.
      </CardContent> 
      {nextButton()}
      </Card>
      <img src={desk} height='200' width='200' alt="a desk"/>
      </Stack>
      <br />
      <br />
      </Container>
    );
  }

  function two() {
    return (
      <Container>
      <Card sx={{padding: 5, margin: 5}}>
      <CardContent>
      You have received a high load of applications and therefore have decided to investigate decision-making aids to assist your team in the hiring process.
      Four artificial intelligence systems, similarly priced, are available to help with this task.
      </CardContent> 
      {nextButton()}
      </Card>
      <ApplicationAnimation />
      <br />
      <br />
      </Container>
    );
  }

  function three() {
    return (
      <Container>
      <Card sx={{padding: 5}}>
      <CardContent>
      
      To help each AI tailor their decisions to your company values and hiring goals, you have compiled the hiring rankings from the past five years
      as training data. Each AI will take a close look at your hiring decisions based on the given application packages to determine what kinds of applicants
      you like to hire.

      </CardContent> 
      {nextButton()}
      </Card>
      <br />
      <br />
      </Container>
    );
  }

  function four() {
    return (
      <Container>
      <Card sx={{padding: 5}}>
      <CardContent>
      
      Each AI system will provide recommendations for new hirees based on their observations. These recommendations will come in a ranking of applicants,
      with some summary information given on a few key factors your team has identified - education, experience, and culture fit. 

      </CardContent> 
      {nextButton()}
      </Card>
      <br />
      <br />
      </Container>
    );
  }

  function five() {
    return (
      <Container>
      <Card sx={{padding: 5}}>
      <CardContent>
      
      Some systems provide extra functionality. If an AI can give you more information about a decision, it will share this with you when you press an info button.
      If a system allows you to specify your preferences between factors, that will be adjustable with a control panel.

      </CardContent> 
      {nextButton()}
      </Card>
      <br />
      <br />
      </Container>
    );
  }

  function six() {
    return (
      <Container>
      <Card sx={{padding: 5}}>
      <CardContent>
      
      After you have sorted through applicants, you will rank them at the end. Your system will also provide a default ranking.
      Once your shortlist has been finalized and ranked, you can evaluate the AI system to help with your decision between systems later.

      </CardContent> 
      {nextButton()}
      </Card>
      <br />
      <br />
      </Container>
    );
  }

  function seven() {
    return (
      <Container>
      <Card sx={{padding: 5}}>
      <CardContent>

      Ready to train?

      </CardContent> 
      {trainingButton()}
      </Card>
      <br />
      <Stack spacing={4} direction='row' justifyContent='center'>
      {systemList.map( s => {
        return <SystemCard system={s} />
      })}
      </Stack>
      <br />
      <br />
      </Container>
    );
  }

  function trainingButton() {
    return <Button variant='contained' color='secondary' onClick={nextPage}>TRAIN THE SYSTEMS</Button>;
  }


  function nextButton() {
    return <Button variant='contained' color='secondary' onClick={nextPage}>Next</Button>;
  }

}