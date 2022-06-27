import * as React from "react";
import { Button, Divider, Card, CardActions, 
  Typography, Stack, FormControl, FormLabel,
   RadioGroup, Radio, Container, CardContent } from "@mui/material";

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
  chosenOption: number;
};

export default function Questionnaire() {
  const [questions, setQuestions] = React.useState([] as Question[]);
  const [options, setOptions] = React.useState([] as Option[]);
  const [smileys, setSmileys] = React.useState([] as Smiley[]);
  const [error, setError] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('Please enter a value for all fields.');
  const [success, setSuccess] = React.useState(false);
  
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
        <Radio value={o.value} id={o.id.toString()} color='secondary' required/>
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

  // we want optionID, not value
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
      console.log('there is an error.');
    } else {
      setError(false);
      fetch("api/answers/", {
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
        });

    }
  }

  return (
    <div className="fill-window App">
      <Container>
      <br />
      <Stack justifyContent='center'>
        <FormControl>
          
        <Card>
          <CardContent>
          <Typography variant='subtitle2' fontSize='10'>
          {wellBeing()}
          <br />
          
          {questions.map((q: Question) => (
            <>
            
            <Divider flexItem />
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
                {mapOptions(options)}
              </RadioGroup>
            </Stack>
            
            </>
           
      ))}
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
    </div>
  );
}
