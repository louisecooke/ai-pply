import { motion } from "framer-motion/dist/framer-motion";
import React from "react";
import { empty, flicker, random } from "./Lightswitch";
import Timer from "../components/Timer";
import { breadcrumbsClasses } from "@mui/material";

const draw = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (i) => {
      const delay = 1 + i * 0.5;
      return {
        pathLength: 1,
        opacity: 1,
        transition: {
          pathLength: { delay, type: "spring", duration: 1.5, bounce: 0 },
          opacity: { delay, duration: 0.01 },
        },
      };
    },
}

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

export default function DrawableGrid() {
  const [lights, setLights] = React.useState(empty);
  const counter = React.useRef(0);

  function newLights() {
    counter.current += 1;
    let stage = counter.current % 5;
    switch (stage) {
      case 0:
        return empty;
      case 1:
        return [[true], ...lights.slice(1, )];
      case 2:
        console.log(2);
        return [...lights.slice(0, 1), random(7), ...lights.slice(2,)];
      case 3:
        return [...lights.slice(0, 2), random(5), ...lights.slice(3,)];
      default:
        return [...lights.slice(0, -1), [true]];
    }
  }


  return (<div>
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
            stroke='#ffffff'
            variants={draw}
            custom={elem.delay}
            fill= {lights[i][j] ? '#ffffff' : 'transparent'}
          />
          {(i - 1) >= 0 && grid[(i-1)].map( (val, i) => {
            return (<motion.line
            x2={elem.x - rad - 5} //border-radius from styles.css
            y2={elem.y}
            x1={val.x + rad + 5}
            y1={val.y}
            stroke='#ffffff'
            variants={draw}
            custom={elem.delay + 2 + i * .05}
            fill= '#ffffff'
            key={`line${i}${j}`}
           />)}
          )}
          </React.Fragment>
        })
      })
    }
    </motion.svg>
    <Timer callback={() => setLights(newLights())} duration={.05} repeats={6} />
  </div>);
  }