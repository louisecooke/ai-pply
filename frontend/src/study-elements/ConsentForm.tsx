import * as React from "react";
import { Button, Card, CardContent, Container, Stack, Typography } from "@mui/material";

type Props = {
  next: () => void;
}

export default function ConsentForm({next} : Props) {
  const [denied, setDenied] = React.useState(false);

  return (
    <Container>
      <Card sx={{padding: 5}}>
      <CardContent>
        <Typography variant='h5'>Einverständnis zur Teilnahme an der Online Studie im Rahme des Getrost Vergessen Projekts</Typography>
        
        <Typography variant='body1' align='left'>
        <p>
          Ich bin über das Forschungsvorhaben ausreichend informiert. Art, Umfang und Bedeutung der Studie, das Studienziel, die Studienlänge
          und weitere studienbedingte Erfordernisse, sowie mögliche Nebenwirkungen der Studienbehandlung wurden genau und verständlich dargelegt. 
        </p>
        <p>
        Ich hatte ausreichend Zeit, mich für oder gegen eine Studienteilnahme zu entscheiden und bin mir bewusst, dass die Teilnahme an der Studie
        freiwillig erfolgt. Ich bin damit einverstanden, dass die im Rahmen der Befragung erhobenen Daten in anonymisierter Form aufgezeichnet werden.
        Ein Rückschluss auf meine Person ist nicht möglich. 
        </p>
        <p>
        Es wird gewährleistet, dass diese Daten nicht an Dritte weitergegeben werden. Bei der Veröffentlichung in einer wissenschaftlichen Zeitschrift wird aus den Daten nicht hervorgehen, wer an dieser Untersuchung teilgenommen hat. 
        </p>
        </Typography>
        <Typography variant='h5'>Datenschutz</Typography>
        <Typography variant='body1' align='left'>
        
          <ol>
            <li>Ich erkläre mich damit einverstanden, dass im Rahmen dieser Studie Daten in anonymisierter Form erhoben werden.</li>
            <li>Die Einwilligung zur Erhebung und Verarbeitung der Daten ist unwiderruflich, da aufgrund der anonymisierten Form der Umfrage keine teilnehmerbezogene Löschung durchgeführt werden kann.</li>
            <li>Ich erkläre mich damit einverstanden, dass meine Daten nach Beendigung oder Abbruch der Studie gelöscht werden, nachdem sie mindestens zehn Jahre aufbewahrt wurden. </li>
          </ol>
        
        <p>
          Die Erklärung zum Datenschutz und die Einwilligung in die Teilnahme zur Studie können Sie hier herunterladen. 
        </p>
        <p>
          Der Fragebogen startet, sobald Sie sich mit vorstehender Vorgehensweise einverstanden erklären und der Studienteilnahme zustimmen. 
        </p>
        <p>
          Mit Klick auf JA erkläre ich, dass ich mit vorstehend geschilderter Vorgehensweise einverstanden bin und ich zustimme, an dieser Studie teilzunehmen.
        </p>
      </Typography> 

      </CardContent>
      <Stack direction='row' spacing={2} justifyContent='center'>
      <Button variant='contained' color='secondary' onClick={() => setDenied(true)}>NEIN</Button>
      <Button variant='contained' color='secondary' onClick={() => {acceptTerms()}}>JA</Button>
      </Stack>
      {denied && <Typography>
        <p>
        We require your consent to continue with the study.
        </p>
        </Typography>}
      </Card>
      <br />
      <br />

    </Container>
  );

  function acceptTerms() {
    setDenied(false);
    //postId();
    next();
  }
}



function postId() {
  fetch("api/participants/", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
          }).then((response) => response.json())
      .then((data) =>
        {
          console.log(data);
        }).catch((error) => {
          console.log(error);
        });
      }