import { motion } from "framer-motion/dist/framer-motion";
import React from "react";
import { flicker } from "./Lightswitch";
import Timer from "../components/Timer";
import { Net } from "../types";

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
const dim = {x: -800, y: 900}; //initial coordinates
const rad = 50;

type element = {
  x: number;
  y: number;
  delay: number;
}
const input = [{x: dim.x, y: dim.y, delay: 0}];

//each number in dims is the number of nodes in that given layer. they are bookended by input/output layers
type Props = {
  net: Net;
  callback: Function; 
}

export default function Network({net, callback}: Props) {
  const [layers, setLayers] = React.useState([] as element[][]);
  const [lights, setLights] = React.useState(net.emptyBoard);
  const [active, setActive] = React.useState(true);
  const lightStage = React.useRef(0);
  const counter = React.useRef(0);
  
  const output = [{x: dim.x + hSpace * (net.dims.length + 1), y: dim.y, delay: net.dims.length}];

  React.useEffect( () => {
    if (counter.current === net.iterations) { 
      setActive(false);
      callback();
    }
  }, [counter.current]);

  //create the grid on first render
  React.useEffect( () => {
    let innerLayers: element[][] = [];
    net.dims.forEach((len, index) => {
      let layer: element[] = [];
      let med = Math.floor(len / 2);
      for (let i = 0; i < len; i++) {
        layer.push({x: dim.x + hSpace * (index + 1), y: dim.y + (i - med) * vSpace, delay: index + 0.25 + 0.25 * i});
      }
      innerLayers.push(layer);
    })
    setLayers([input, ...innerLayers, output]);
    
  }, []);

  function newLights() {
    lightStage.current += 1;
    let stage = lightStage.current % (net.dims.length + 3);
    switch (stage) {
      case 0:
        return net.emptyBoard;
      case 1:
        return [[true], ...lights.slice(1, )];
      case (net.dims.length + 2):
        counter.current += 1;
        return [...lights.slice(0, -1), [true]];
      default:
        return [...lights.slice(0, (stage - 1)), flicker(net.dims[stage-2]), ...lights.slice(stage,)];
    }
  }

  return (<div>
    <motion.svg
      width="1600"
      height="1000"
      viewBox="0 0 100 2400"
      initial="hidden"
      animate="visible"
    >
    {
      layers.map( (column, i) => {
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
          {(i - 1) >= 0 && layers[(i-1)].map( (val, i) => {
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
    {active && <Timer callback={() => setLights(newLights())} duration={.05} delay={5}/> } 
  </div>);
  }