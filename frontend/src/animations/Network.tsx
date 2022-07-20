import { ImageList, ImageListItem, Container, Stack} from '@mui/material';
import { motion} from "framer-motion/dist/framer-motion";
import DrawableGrid from './DrawableGrid';
import CardAnimation from './CardAnimation';
import { Manipulation } from '../types';
import SystemCard from '../components/SystemCard';

type Props = {
  systemList?: Manipulation[];
}

export default function Network({systemList}: Props) {
  return (
    <Container>
      <Stack direction='row' spacing={2} alignItems='center'>
      <CardAnimation />
      <DrawableGrid />

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