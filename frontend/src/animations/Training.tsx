import { Stack } from '@mui/material';
import Network from './Network';
import CardAnimation from './CardAnimation';
import LearningSystem from './LearningSystem';
import { Manipulation, Net } from '../types';
import { thinkingText } from "../study-config/Configuration";
import { lightBoard } from './Lightswitch';
import * as React from "react";

type Props = {
  systemList: Manipulation[];
  onFinish: Function;
}

const nets: Net[] = [
  {
    iterations: 23,
    dims: [5, 7, 4, 3],
    emptyBoard: lightBoard([1, 5, 7, 4, 3, 1]),
  } as Net,
  {
    iterations: 18,
    dims: [3, 9, 5],
    emptyBoard: lightBoard([1, 3, 9, 5, 1]),
  } as Net,
  {
    iterations: 25,
    dims: [5, 7, 4, 3],
    emptyBoard: lightBoard([1, 5, 7, 4, 3, 1]),
  } as Net,
  {
    iterations: 19,
    dims: [5, 7, 4, 3],
    emptyBoard: lightBoard([1, 5, 7, 4, 3, 1]),
  } as Net,
];

export default function Training({systemList, onFinish}: Props) {
  const [index, setIndex] = React.useState(0);
  const [finished, setFinished] = React.useState(false);
  const [networkFinished, setNetworkFinished] = React.useState(false);

  return (
      <Stack direction='row' spacing={2} alignItems='center'>
      <CardAnimation key={`cardAnimation-${index}`}/>
      <Network key={`network-${index}`} net={nets[index]} callback={() => {setNetworkFinished(true)}}/>

      {systemList && <LearningSystem key={`learning-${index}`} system={systemList[index]} processed={networkFinished} callback={nextSystem} responses={thinkingText[index]}/>}
      </Stack>
   
  );

  function nextSystem() {
    if (index + 1 < systemList.length) {
      setIndex(index + 1);
      setNetworkFinished(false);
    } else {
      setFinished(true);
      onFinish();
    }
  }

}

