import * as React from "react";
import { Button, Typography, Stack, FormControl, FormLabel, FormControlLabel, RadioGroup, Radio, Container } from "@mui/material";
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

  const mapOptions = (options: Option[]) => {
    return options.map((o: Option) => (
      <div key={o.id}>
        <Stack direction='column'> 
        <Radio value={o.value} color='secondary'/>
        {o.text}
        </Stack>
      </div>));
}

  const defaultOption = (list: any[]) => {
    if (list.length) {
      return list[Math.floor(list.length / 2)].value;
    } else {
      return 0;
    }
  }

  React.useEffect( () => {
    getData();
  }, []);

  const wellBeing = () => {
    return (<div> <FormLabel>How are you feeling today?</FormLabel>
    <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        name="radio-buttons-group"
        row
        color='secondary'
        defaultValue={defaultOption(smileys)}
        sx={{justifyContent: 'center'}}
      >
      {mapSmileys(smileys)}
    </RadioGroup></div>);
   
  }

  return (
    <div className="fill-window App">
      <>
      <br />
      <Stack>
        <FormControl>
          {wellBeing()}
          <br />
          {questions.map((q: Question) => (
            <div>
               <Stack key={q.id} sx={{margin: 10}}>
              <FormLabel>{q.text}</FormLabel>
              <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  name="radio-buttons-group"
                  row
                  color='secondary'
                  defaultValue={defaultOption(options)}
                  sx={{justifyContent: 'space-between'}}
                >
                {mapOptions(options)}
              </RadioGroup>
            </Stack>
          </div>
           
      ))}
        </FormControl>
      </Stack>
      <br />
      <br />
      </>
    </div>
  );
}
