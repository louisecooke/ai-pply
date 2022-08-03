import * as React from "react";
import { Card, CardContent, Stack, Typography, Slider, Button } from "@mui/material";
import { FieldProperties } from "../data-types/interfaces";

type PanelProps = {
    preferences: FieldProperties;
    setPreferences: Function;
    defaultSaved: boolean;
    demo?: boolean;
}

export default function ControlPanel({ preferences, setPreferences, defaultSaved, demo = false }: PanelProps) {
    const [localState, setLocalState] = React.useState(preferences);
    const [applied, setApplied] = React.useState(true);
    const [isDefault, setDefault] = React.useState(defaultSaved);

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
            <Slider key={p} aria-label={p} value={localState[p]} sx={{maxWidth: '60%'}} onChange={(Event, value) => setValue(Event, value, p)} color='secondary'/>
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
              {!demo &&
              <Typography variant="subtitle2" >
               Indicate above how important each factor is to you. <br />
               I'll take this information into account as I rank applications.</Typography>}
               <br />
               <Stack spacing={4} direction='row' justifyContent='center'>
                 {!demo &&
               <Button variant='contained' color='secondary' onClick={() => {
                 setDefault(true);
                 setApplied(false);
                 setPreferences(); 
                }} disabled={isDefault}>
                <Typography fontSize='12px'>REVERT TO DEFAULT</Typography></Button>}

              <Button variant='contained' color='secondary' onClick={() => {
                  setPreferences(localState);
                  setApplied(true);
                }} disabled={isDefault || applied}>
                <Typography fontSize='13px'>Apply changes</Typography></Button>
                </Stack>
          </CardContent>
      </Card>
    );
}