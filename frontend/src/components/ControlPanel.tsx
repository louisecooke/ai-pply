import * as React from "react";
import { Card, CardContent, Stack, Typography, Slider, Button } from "@mui/material";
import { FieldProperties } from "../types";

type PanelProps = {
    preferences: FieldProperties;
    setPreferences: Function;
    revertToDefault: Function;
}

export default function ControlPanel({ preferences, setPreferences, revertToDefault }: PanelProps) {
    const [localState, setLocalState] = React.useState(preferences);
    const [applied, setApplied] = React.useState(true);
    const [isDefault, setDefault] = React.useState(true);

    React.useEffect( () => {
      setLocalState(preferences);
    }, [preferences]);

    const setValue = (event: Event, newValue: number | number[], name: string) => {
        let val = typeof(newValue) === 'number' ? newValue : newValue[-1];
        setLocalState({ ...localState, [name]: val});
        setApplied(false);
        setDefault(false);
    };

    const renderDetail = (p: string) => {
        return (
          <Stack spacing={2} direction='row' alignItems='center' justifyContent='space-between' key={`${p}stack`}>
            <Typography variant="caption" color="text.secondary" key={`${p}typ`}>
             {p}
            </Typography>
            <Slider key={p} aria-label={p} value={localState[p]} sx={{maxWidth: '60%'}} onChange={(Event, value) => setValue(Event, value, p)}/>
          </Stack>
        );  
    }

    return (
        <Card sx={{ marginTop: 2, minWidth: '25%' }}>
          <CardContent>
            <Typography gutterBottom variant="subtitle1" component="div">
              Control panel   
            </Typography>
            
              {Object.keys(localState).map((p) => renderDetail(p))}
              <br />
              <Typography variant="subtitle2" >
               Indicate above how important each factor is to you. <br />
               Our AI will work this information into its calculations.</Typography>
               <br />
               <Stack spacing={1} direction='row'>
               <Button variant='contained' onClick={() => {
                 setDefault(true);
                 setApplied(false);
                 revertToDefault(); 
                }} disabled= {isDefault}>
                REVERT TO DEFAULT</Button>

              <Button variant='contained' onClick={() => {
                  setPreferences(localState);
                  setApplied(true);
                }} disabled={isDefault || applied}>
                Apply changes</Button>
                </Stack>
          </CardContent>
      </Card>
    );
}