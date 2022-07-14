import { ImageList, ImageListItem, Container} from '@mui/material';
import Typed from "react-typed";


import * as React from 'react';

type Props = {
  text: string;
  speed?: number;
  reset: Function;
}


export function TypeAnimation({text = '', speed = 500, reset}: Props) {
  
  return (
  <Typed strings={['Give me a second...', text]} typeSpeed={speed} backSpeed={100}/>
  );

}


function Typewriter({text = '', speed = 500, reset}: Props) {
  const [displayed, setDisplayed] = React.useState("");
  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    /*Create a new setInterval and store its id*/
    const animKey = setInterval(() => {
      setIndex((index) => {
        /*This setState function will set the index
        to index+1 if there is more content otherwise
        it will destory this animation*/
      
        if (index >= text.length - 1) {
          clearInterval(animKey);
          return index;
        }
        return index + 1;
      });
    }, speed);
  }, []);

  React.useEffect(() => {
    setDisplayed(displayed + text[index])
    console.log(index);
  }, [index])

  return <div>{displayed}</div>;
}


