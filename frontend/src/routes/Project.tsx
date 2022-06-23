import * as React from "react";
import { Button, Typography, Stack } from "@mui/material";

enum Q_TYPE {
  WELLBEING = 'Wellbeing',
  EVALUATION = 'Evaluation'
}

type Option = {
  id: number;
  question: number;
  text: string;
  value: number;
}

type Question = {
  id: number;
  text: string;
  variant: Q_TYPE;
  options: Option[];
};

export default function Project() {
  const [questions, setQuestions] = React.useState([] as Question[]);
  const [options, setOptions] = React.useState([] as Option[]);
  
  const getData = () => {
    fetch("api/questions/wellbeing/").then((response) => response.json())
    .then((data) =>
      {
        setQuestions(data);
      }).catch((error) => {
        console.log(error);
      });

    fetch("api/options/").then((response) => response.json())
    .then((data) =>
      {
        setOptions(data);
      }).catch((error) => {
        console.log(error);
      });
  }

    
  const mapOptions = (options: Option[]) => {
      return options.map((o: Option) => (
        <Typography key={o.id}>
          {o.text} {o.value}
        </Typography>
      ));
  }

  const mapData = () => {
    return (
      <Stack>
        {questions.map((q: Question) => (
          <Typography key={q.id}>
            {q.text}: {q.variant}
          </Typography>
        ))}
      </Stack>
      );
  }

  React.useEffect( () => {
    getData();
  }, []);

  return (
    <div className="fill-window App">
      <>
      {mapData()}
      <br />
      <br />
      </>
    </div>
  );
}
