import { Container, Stack} from '@mui/material';
import Network from './Network';
import CardAnimation from './CardAnimation';
import { Manipulation } from '../types';
import SystemCard from '../components/SystemCard';
import { lightBoard } from './Lightswitch';

type Props = {
  systemList?: Manipulation[];
}

export default function Training({systemList}: Props) {
  return (
    <Container>
      <Stack direction='row' spacing={2} alignItems='center'>
      <CardAnimation />
{/*       <Network dims={[6, 6]}/>
      
      <Network dims={[7, 5]}/> */}
      
      <Network dims={[5, 7, 4]} empty={lightBoard([1, 5, 7, 4, 1])}/>

      {systemList && systemAnimation(systemList)}
      </Stack>
    </Container>
   
  );
}

function systemAnimation(systemList: Manipulation[]) {
  const systemCards = systemList.map(s => <SystemCard system={s} />);
  return (
    <>
    <Stack direction='row' spacing={4}>
      {systemList.map(s => <SystemCard system={s} />)};
    </Stack>   
    </>
  );
}