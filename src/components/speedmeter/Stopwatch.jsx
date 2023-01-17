import * as React from 'react';
import { Button } from '@material-ui/core';
import AccessAlarmsIcon from '@mui/icons-material/AccessAlarms';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import { Typography } from '@mui/material';

export default function Stopwatch(props) {

    const [time, setTime] = React.useState(0);

    React.useEffect(() => {
      let interval;
      if (props.running) {
        interval = setInterval(() => {
          setTime((prevTime) => prevTime + 1000);
          props.setTimeFromParent((prevTime) => prevTime + 1000);
        }, 1000);
      } else if (!props.running) {
        clearInterval(interval);
      }
      return () => clearInterval(interval);
    }, [props.running]);

    return (
      <>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2} minHeight={160}>
            <Grid xs display="flex" justifyContent="center" alignItems="center">
              <AccessAlarmsIcon sx={{fontSize: "50px"}} color="secondary" />
            </Grid>
            <Grid display="flex" justifyContent="center" alignItems="center">
              <Typography fontSize="50px">{("0" + Math.floor((time / 60000) % 60)).slice(-2)}min</Typography>
            </Grid>
            <Grid xs display="flex" justifyContent="center" alignItems="center">
              <Typography fontSize="50px">{("0" + Math.floor((time / 1000) % 60)).slice(-2)}s</Typography>
            </Grid>
          </Grid>
        </Box>
        <div className="buttons">
          <Button color="secondary" variant="contained" onClick={() => props.setRunning(true)}>Start</Button>
          <Button color="secondary"  variant="contained" onClick={() => props.setRunning(false)}>Stop</Button>
          <Button color="secondary"  variant="contained" onClick={() => setTime(0)}>Reset</Button>       
        </div>
      </>
    );
  
  };