import { motion } from "framer-motion/dist/framer-motion";
import React from "react";

const draw = {
    hidden: { pathLength: 0, opacity: 0, fill: 'transparent' },
    visible: ([i, flicker]) => {
      const delay = 1 + i * 0.5;
      return {
        pathLength: 1,
        opacity: 1,
        //fill: '#ffffff',
        transition: {
          pathLength: { delay, type: "spring", duration: 1.5, bounce: 0 },
          opacity: { delay, duration: 0.01 },
          fill: { delay, duration: 1.5}
        },
        //fill: flicker ? {delay, duration: 1.5, '#ffffff' } : 'transparent'
      };
    },
    flickered: ([i, flicker]) => {
      const delay = 1 + i * 0.5;
      return {
        pathLength: 1,
        opacity: 1,
        transition: {
        },
      };
    }
  };

const vSpace = 200; //pixels between elements in a column
const hSpace = 500; //pixels between respective columns
const dim = {x: -700, y: 900}; //initial coordinates
const rad = 50;

type element = {
  x: number;
  y: number;
  delay: number;
}
const input = [{x: dim.x, y: dim.y, delay: 0}];

const one: element[] = [];
const two: element[] = [];
for (let i = 0; i < 7; i++) {
  one.push({x: dim.x + hSpace, y: dim.y + (i - 3) * vSpace, delay: 1 + 0.25 * i});
}
for (let i = 0; i < 5; i++) {
  two.push({x: dim.x + hSpace * 2, y: dim.y + (i - 2) * vSpace, delay: 2 + 0.25 * i});
}

const output = [{x: dim.x + hSpace * 3, y: dim.y, delay: 5}];
const grid = [input, one, two, output];

type Props = {
  flicker: boolean[][];
}

export const DrawableGrid = ({flicker}: Props) => (
  <div>
    <motion.svg
      width="1200"
      height='1000'
      viewBox="0 0 100 2000"
      initial="hidden"
      animate="visible"
    >
    {
      grid.map( (column, i) => {
        return column.map( (elem, j) => {
          return <React.Fragment key={`circle${i}${j}`}>
          <motion.circle
            cx={elem.x}
            cy={elem.y}
            r={rad}
            stroke='#ffffff' //{(theme) => theme.palette.secondary.info}
            variants={draw}
            custom={[elem.delay, flicker[i][j]]}
            fill='transparent'
          />
          {(i - 1) >= 0 && grid[(i-1)].map( (val, i) => {
            return (<motion.line
            x2={elem.x - rad - 5} //border-radius from styles.css
            y2={elem.y}
            x1={val.x + rad + 5}
            y1={val.y}
            stroke='#ffffff'
            variants={draw}
            custom={[elem.delay + 2 + i * .05, true]}
            key={`line${i}${j}`}
           />)}
          )}
          </React.Fragment>
        })
      })
    }
    </motion.svg>
  </div>
);