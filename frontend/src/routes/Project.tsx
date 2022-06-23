import * as React from "react";
import { Button, Typography, Stack, FormControl, FormLabel, FormControlLabel, RadioGroup, Radio } from "@mui/material";
import { SimpleSystemKeys } from "@mui/system";

enum Q_TYPE {
  WELLBEING = 'WELL',
  EVALUATION = 'EVAL'
}

type Option = {
  id: number;
  question: number;
  text: string;
  value: number;
}

type Smiley = {
  id: number;
  value: number;
  image: string;
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
  const [smileys, setSmileys] = React.useState([] as Smiley[]);
  
  const getData = () => {
    fetch(`api/questions/${Q_TYPE.WELLBEING}/`).then((response) => response.json())
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

    fetch("api/smileys/").then((response) => response.json())
    .then((data) =>
      {
        setSmileys(data);
      }).catch((error) => {
        console.log(error);
      });
  }

    
  const mapSmileys = (smileys: Smiley[]) => {
      return smileys.map((s: Smiley) => (
        <div key={s.id}>
          <Stack direction='column'> 
          <Radio value={s.value} color='secondary'/>
          <img src={s.image} width='100' height='100'/>
          </Stack>
        </div>));
  }

  const mapData = () => {
    return (
      <Stack>
        <FormControl>
          {questions.map((q: Question) => (
            <div key={q.id}>
              <FormLabel>{q.text}</FormLabel>
              <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  name="radio-buttons-group"
                  row
                  color='secondary'
                  defaultValue={1}
                >{mapSmileys(smileys)}
              </RadioGroup>
            </div>
      ))}
        </FormControl>
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
