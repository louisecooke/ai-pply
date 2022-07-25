import * as React from "react";
import { Button, Container, Card, CardContent, Stack, IconButton, Typography } from "@mui/material";
import ApplicationAnimation from "../animations/ApplicationAnimation";
import { Manipulation } from "../types";
import Training from "../animations/Training";
import InfoIcon from '@mui/icons-material/Info';
import HelpIcon from '@mui/icons-material/Help';

import desk from "../imgs/school-desk-and-chair.png";
import SystemCard from "../components/SystemCard";
import ControlPanel from "../components/ControlPanel";
import Shortlist from "../components/Shortlist";
import { newApplicants } from "../util/Functions";
import { shortlistLength } from "../study-config/Configuration";
import ApplicantCard from "../components/ApplicantCard";

type Props = {
  onFinish: Function;
  systemList: Manipulation[];
}

const demoApplicants = newApplicants(shortlistLength);

export default function TaskExplanation({systemList,  onFinish}: Props) {
  const [page, setPage] = React.useState(0);

  const nextPage = () => {
    setPage(page + 1);
  }

  const workflow = [opener(), two(), three(), four(), five(), six(), seven(), <Training systemList={systemList} onFinish={onFinish}/>, 
  ];

  return (
    <>
    {workflow[page]}
    </>
  );
  
  function opener() {
    return (
      <Container sx={{margin: 20}}>
      <Stack direction='row' spacing={20} justifyContent='center'>
      <Card sx={{padding: 3}}>
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
      <Stack justifyContent='center'>
      <Card sx={{padding: 3, margin: 5, marginBottom: 0}}>
      <CardContent>
      You have received a high load of applications and therefore have decided to investigate decision-making aids to assist your team in the hiring process.
      Four artificial intelligence systems, similarly priced, are available to help with this task.
      </CardContent>
      <Stack direction='row' justifyContent='flex-end' spacing={25}> 
      {nextButton()}
      
      </Stack>
      </Card>
      <Stack direction='row' alignItems='center' justifyContent='flex-end' margin={2} marginRight={5}>
        <Typography>Why should I use an AI system?</Typography>
      <IconButton color={'secondary'} aria-label="view explanation" component="div">
        <HelpIcon /></IconButton>
        </Stack>
      <ApplicationAnimation />
      <br />
      <br />
      </Stack>
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
    const [selected, setSelected] = React.useState(false);
    return (
      <Container>
      <Stack direction='row' spacing={20} justifyContent='center'>
        <Card sx={{padding: 5}}>
          <CardContent>
          <p>
          Each AI system will provide recommendations for new hirees based on their observations. These recommendations will come in a list of ranked applicants,
          with some summary information given on a few key factors your team has identified - education, experience, and culture fit. 
          </p>
          <p>
          From this list, you can compile a shortlist of four applicants. The shortlist is displayed at the top with coloured borders. By clicking on an applicant,
          you add the applicant to your shortlist.
          </p>

          {nextButton()}
          
          </CardContent> 
        </Card>
        <Stack spacing={2} minWidth='40%' justifyContent='center' alignItems='stretch'>
        <ApplicantCard applicant={demoApplicants[0]} scale={true} ranking={selected} shortlist={() => {setSelected(true)}}/>
        <Typography textAlign='left'>Click me to add me to your shortlist!</Typography>
        </Stack>


      </Stack>

      <br />
      <br />
      </Container>
    );
  }

  function five() {
    return (
      <Container>
      <Card sx={{padding: 5, margin: 10}}>
      <CardContent>
      
      Some systems provide extra functionality. If an AI can give you more information about a decision, it will share this with you when you press an info button.
      If a system allows you to specify your preferences between factors, that will be adjustable with a control panel.

      </CardContent> 
      {nextButton()}
      </Card>
      <Stack direction='row' justifyContent='center' spacing={20}>
        <IconButton color={'secondary'} aria-label="view explanation" component="div" >
        <InfoIcon /></IconButton>

        <ControlPanel preferences={{'Education': 50, 'Experience': 22, 'Culture Fit': 81}} setPreferences={()=>{}} defaultSaved={true} demo={true} />
      </Stack>

      <br />
      <br />
      </Container>
    );
  }

  function six() {
    return (
      <Container>
      <Card sx={{padding: 5, margin: 10}}>
      <CardContent>
      
      After you have chosen your shortlist of {shortlistLength}, you can drag-and-drop them to set them in order of preference.
      Once you have reached your hiring decision, you will then be prompted to evaluate the AI system.

      </CardContent> 
      {nextButton()}
      </Card>

      <Shortlist shortlist={demoApplicants} rank={()=>{}} scale={true} demo={true}/>
      <br />
      <br />
      </Container>
    );
  }

  function seven() {
    return (
      <Container sx={{padding: 5}}>
      <Card sx={{padding: 5}}>
      <CardContent>

      The systems have their neural networks prepared to learn from your data. Are you ready to train?

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