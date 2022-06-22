import * as React from "react";
import HiringTask from "./HiringTask";
import { Applicant, Manipulation } from "../types";
import Grid from "@mui/material/Grid";
import SystemCard from "../components/SystemCard";


const { randomApplicant } = require("../util/DummyData");
const { numApplicants } = require("../study-config/Configuration");

const applicantList: Applicant[] = [];
for (var i = 0; i < numApplicants; i++) {
  applicantList.push({id: i, fields: randomApplicant()} as Applicant);
} 


export default function SystemList() {
  const [chosenSystem, setChosenSystem] = React.useState({} as Manipulation);
  const [systems, setSystems] = React.useState([] as Manipulation[]);

  const getSystems = async () => {
    let response = await fetch("api/systems/");
    setSystems(await response.json());
  }

  React.useEffect( () => {
    getSystems();
  }, []);
  
  const choose = (system: Manipulation) => {
    setChosenSystem(system);
  }

  return (
    <>
    <br/>
    <br/>
    {chosenSystem.id ? 
    <HiringTask system={chosenSystem} applicants={applicantList}/> :
    <Grid container spacing={10} justifyContent="space-evenly">
        {systems.map((m: Manipulation) => (
          <Grid item key={m.id}>
            <SystemCard system={m} chooseScenario={choose}/>
          </Grid>
        ))}
    </Grid>
    }
    </>);
}