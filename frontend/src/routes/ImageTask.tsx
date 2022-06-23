/* import * as React from "react";
import { Container } from "@mui/material";
import Gallery from "../components/Gallery";
import Timer from "../components/Timer";

const { randomString } = require("../util/DummyData");

let cache: string[] = [];

function importAll(r) {
    cache = r.keys().map(key => r(key) as String);
}

importAll(require.context("../imgs/birds", false, /\.(png|jpe?g|svg)$/));

const images = Object.entries(cache).map(module => module[1]);
const imageObjects = images.map(
  image => (<img
  className="cropped"
  src={image}
  alt={image}
  loading="lazy"
  key={image}
/>)
);
const length = images.length; 


//dummy random strings
const selection = randomString(images.length);

export default function ImageTask() {
  const [finished, setFinished] = React.useState(false);
  const [totalTime, setTotalTime] = React.useState(0);
  const numColumns = 3;


  const onFinish = () => {
      setFinished(true);
  }

  const logTime = (time: number) => {
      setTotalTime(time);
  }

  return (
    <div>
      <Timer finished={finished} onFinish={logTime}/>
      <Container maxWidth='md'>
        {finished ? 
        <div>Task completed. Time: {totalTime}</div> :
        <Gallery columns={numColumns} content={imageObjects} selection={selection} onFinish={onFinish} singleton={false}/>}
      </Container>

    </div>
  );
}
 */

export {}