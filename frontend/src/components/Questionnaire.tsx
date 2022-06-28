import * as React from "react";
import { Button, Divider, Card,
  Typography, Stack, FormControl, FormLabel,
   RadioGroup, Radio, Container, CardContent } from "@mui/material";
import { Q_TYPE } from '../types';

type Option = {
  id: number;
  text: string;
  value: number;
  scale: number;
  image: string;
}

type Scale = {
  id: number;
  text: string;
  options: Option[];
}

type Question = {
  id: number;
  text: string;
  variant: Q_TYPE;
  scale: number;
  chosenOption: number;
};

type Props = {
  variant: Q_TYPE;
  finish?: Function;
}

export default function Questionnaire({variant, finish} : Props) {
  const [questions, setQuestions] = React.useState([] as Question[]);
  const [scales, setScales] = React.useState([] as Scale[]);
  const [error, setError] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('Please enter a value for all fields.');
  const [success, setSuccess] = React.useState(false);
  
  const getData = () => {
    fetch(`api/questions/${variant}/`).then((response) => response.json())
    .then((data) =>
      {
        setQuestions(data);
      }).catch((error) => {
        console.log(error);
      });

    fetch("api/scales/").then((response) => response.json())
    .then((data) =>
      {
        setScales(data);
      }).catch((error) => {
        console.log(error);
      });
  }

  const mapScale = (scale: Scale | undefined) => {
    if (scale) {
      return scale.options.map((o: Option) => (
        <div key={o.id}>
          <Stack direction='column'> 
          <Radio value={o.value} id={o.id.toString()} color='secondary' required/>
          {o.text}
          {o.image && <img src={o.image} height='100' width='100'/>}
          </Stack>
        </div>));
    } else {
      return;
    }
    
}

  React.useEffect( () => {
    getData();
  }, []);

  
  const selectQuestion = (qid: number, oid: string) => {
    setQuestions(questions.map(el =>
      el.id == qid ? {...el, chosenOption: parseInt(oid)} : el));
  }

  const dataToPost = () => {
    let list = questions.map((q) => {
      return {participant: 1,
      system: null,
      question: q.id,
      option: q.chosenOption}
    });
    return list;
  }

  const handleSubmit = () => {
    let error = questions.find(e => e.chosenOption === undefined);
    if (error) {
      setError(true);
    } else {
      setError(false);
      /* fetch("api/answers/", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(
          dataToPost()),
          }).then((response) => response.json())
      .then((data) =>
        {
          console.log(data);
          setSuccess(true);
        }).catch((error) => {
          console.log(error);
        }); */
      finish && finish();

    }
  }

  return (
      <Container>
      <br />
      <Stack justifyContent='center'>
        <FormControl>
          
        <Card>
          <CardContent>
          <Typography variant='subtitle2' fontSize='10'>
          <Stack
            divider={<Divider flexItem />} >
          {questions.map((q: Question) => (
            <Stack key={q.id} justifyContent='flex-start' sx={{margin: 4}}>
              <FormLabel>{q.text}</FormLabel>
              <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  name="radio-buttons-group"
                  row
                  color={error ? 'error' : 'secondary'}
                  onChange={(e) => selectQuestion(q.id, e.target.id)}
                  sx={{justifyContent: 'space-between'}}
                >
                {mapScale(scales.find(s => s.id === q.scale))}
              </RadioGroup>
            </Stack>
            ))}
      </Stack>
      </Typography>
      
      {error && <Typography color='error'>{errorMessage}</Typography>}
      <Button type="submit" variant="contained" onClick={handleSubmit} color= {error ? 'error' : 'primary'} disabled={success}>Submit</Button>
      
      </CardContent>
        
      </Card>
        </FormControl>
      </Stack>
      <br />
      <br />
      </Container>
  );
}
