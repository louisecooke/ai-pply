import * as React from "react";
import { Button, Card,
  Typography, Stack, FormControl, FormLabel,
   RadioGroup, Radio, Container, CardContent, FormControlLabel } from "@mui/material";

import { GENDER, AGE, EDUCATION } from "../data-types/enums";

type DimQ = {
  title: string;
  enum: Object;
  state: string;
  setState: React.Dispatch<string>;
  text: string;
}

export default function Demographic() {
  const [gender, setGender] = React.useState('');
  const [age, setAge] = React.useState('');
  const [education, setEducation] = React.useState('');
  const [error, setError] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  const errorMessage = 'Please enter a value for all fields, or `I prefer not to say` if you do not want to answer.'

  const questions = [
    {title: 'Age', enum: AGE, state: age, setState: setAge, text: 'What is your age?'} as DimQ,
    {title: 'Education', enum: EDUCATION, state: education, setState: setEducation, text: 'What is your level of education?'} as DimQ,
    {title: 'Gender', enum: GENDER, state: gender, setState: setGender, text: 'What is your gender?'} as DimQ,
  ];

  function handleSubmit() {
    let error = questions.find(q => q.state === '');
    if (error) {
      setError(true);
    } else {
      setError(false);
    }
  }

  function renderQuestion(q: DimQ) {
    return <Stack spacing={2} key={`demographic-${q.title}`}>
    <FormLabel>{q.text}</FormLabel>
    <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        name="radio-buttons-group"
        row
        color={error ? 'error' : 'secondary'}
        onChange={(e) => q.setState(e.target.value)}
        sx={{justifyContent: 'space-between'}}
      >
      <Stack>
      {Object.keys(q.enum).map((k) =>
        <FormControlLabel value={q.enum[k]} control={<Radio />} label={q.enum[k]} />
      )}
      </Stack>
    </RadioGroup>
    </Stack>
  }
    
  return (
    <Container>
    <br />
    <Stack justifyContent='center'>
      <FormControl>
      <Card>
        <CardContent>
        <Typography variant='subtitle2' fontSize='10'>
          <Stack direction='row' justifyContent='space-between' margin={5}>
        {questions.map(q => renderQuestion(q))}
        </Stack>
        </Typography>

    {error && <Typography color='error'>{errorMessage}</Typography>}
    <br/>
    <Button type="submit" variant="contained" onClick={handleSubmit} color={error ? 'error' : 'primary'} disabled={success}>Submit</Button>
    
    </CardContent>
      
    </Card>
      </FormControl>
    </Stack>
    <br />
    <br />
    </Container>
  );
}