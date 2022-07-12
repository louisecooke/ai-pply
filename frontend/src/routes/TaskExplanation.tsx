import * as React from "react";
import { Button, Container, Card, CardContent } from "@mui/material";
import { Route, Routes } from "react-router-dom";

type Props = {
  next?: () => void;
}

export default function TaskExplanation({next = () => {}}: Props) {
  const [page, setPage] = React.useState(0);

  const nextPage = () => {
    setPage(page + 1);
  }

  const workflow = [opener(), two(), three(), four(), five(), six()
  ];

  return (
    <Routes>
    <Route path="*" element={workflow[page]} />
    </Routes>
  );

  
  function opener() {
    return (
      <Container>
      <Card sx={{padding: 5}}>
      <CardContent>
      You are the Operations Manager of a rapidly-growing company. After receiving funding for a new department, your human resources team must fill 40 new openings,
      mostly for junior-level employees.
      </CardContent> 
      {nextButton()}
      </Card>
      <br />
      <br />
      </Container>
    );
  }

  function two() {
    return (
      <Container>
      <Card sx={{padding: 5}}>
      <CardContent>
      You have received 300 applications after posting the first 5 positions and therefore have decided to investigate decision-making aids to assist your team in the hiring process, in anticipation of a high load of applications.
      Four artificial intelligence systems, similarly priced, are available to help with this task.
      </CardContent> 
      {nextButton()}
      </Card>
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
      
      Each system performs the automated process of scraping application packages and ranking each applicant on education, experience, and culture fit.
      Afterward, you (or your hiring manager) will be able to use the AI to help you make decisions.
      Your job is to shortlist up to five applicants for another round of interviews. You can only view five applicants at a time, and will have 30-40 in total to choose between.

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
      
      Each AI system will provide recommendations based on their decision-making models.
      As you continue to make decisions together, the systems learn from your preferences, and would over time tailor their decisions to each of your hiring managers.

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
      
      Some systems provide extra functionality. If an AI can give you more information about a decision, it will be available when you hover over a chosen applicant.

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


  function nextButton() {
    return <Button variant='contained' color='secondary' onClick={nextPage}>Next</Button>;
  }

}