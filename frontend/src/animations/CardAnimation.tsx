import { Stack } from '@mui/material';
import { motion } from "framer-motion/dist/framer-motion";
import blankProfile from "../imgs/avatar-g4549a99eb_640.png";
import { dim } from "./Network";

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
    x: dim.x,
    y: dim.y - 600,
    width: 100,
    height: 100
  },
  end: {
    x: dim.x + 100,
    y: dim.y - 520,
    width: 0,
    height: 0
  },
}

const loadTrans = {
  duration: 1,
  ease: "easeInOut",
}

export default function CardAnimation() {
  return (
    <Stack direction='row' component={motion.div} variants={listVariants}
    initial="start"
    animate="end">
      {photos(15)}
    </Stack>
   
  );
}

function photos(num: number) {
  return Array(num).fill('').map((_, i) => { return (
    <motion.img src={blankProfile} variants={loadVar}
          transition={loadTrans} height='160' width='160' x='100' y='100' alt='an application' />
);
  });
}