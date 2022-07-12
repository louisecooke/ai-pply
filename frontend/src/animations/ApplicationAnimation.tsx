import { ImageList, ImageListItem, Container} from '@mui/material';
import { motion} from "framer-motion/dist/framer-motion";
import blankProfile from "../imgs/avatar-g4549a99eb_640.png";


const listVariants = {
  start: {
    transition: {
      staggerChildren: 0.1,
    },
  },
  end: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const loadVar = {
  start: {
    opacity: 0,
  },
  end: {
    opacity: 1,
  },
}

const loadTrans = {
  duration: 0.5,
  ease: "easeInOut",
}

export default function ApplicationAnimation() {
  return (
    <Container>
    <ImageList cols={5} gap={32}
    component={motion.div} variants={listVariants}
    initial="start"
    animate="end">
      {photos(15)}
    </ImageList>
    </Container>
   
  );
}

function photos(num: number) {
  return Array(num).fill('').map((_, i) => { return (
    <ImageListItem key={`applicantCard-${i}`} sx={{height: 160, width: 160}}>

    <motion.img src={blankProfile} variants={loadVar}
          transition={loadTrans}  height='160' width='160' alt='an application' />

    </ImageListItem>);
  });
}

function Empty() {
  return <></>;
}