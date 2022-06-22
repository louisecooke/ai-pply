import { Button, Grid } from "@mui/material";
import { useState } from "react";
import ScenarioCard from "./ScenarioCard";
import { Scenario } from "../types";

import * as React from "react";

type Props = {
  readonly ScenarioList: Scenario[];
};

export default function Scenarios({ ScenarioList }: Props) {
  const [visible, setVisible] = useState(true);

  const cards = () => {
    return (
      <Grid container spacing={10} justifyContent="space-evenly">
        {ScenarioList.map((s: Scenario) => (
          <Grid item key={s.name}>
            <ScenarioCard scenario={s} />
          </Grid>
        ))}
      </Grid>
    );
  };

  return (
    <>
      {visible ? (
        <Button
          variant="contained"
          color="secondary"
          onClick={() => {
            setVisible(false);
          }}
        >
          LET'S GO
        </Button>
      ) : (
        <>{cards()}</>
      )}
    </>
  );
}
