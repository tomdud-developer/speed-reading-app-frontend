import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';

import SpeedMeterLogsChart from './dashboard/SpeedMeterLogsChart';
import { Typography } from '@mui/material';
import GaugaeChartLastSpeedMeterLog from './dashboard/GaugaeChartLastSpeedMeterLog';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: 'dark' === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function Dashboard() {

    return (
      <>
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          <Grid xs={2} sm={4} md={4} key={1}>
                <Item>
                  <GaugaeChartLastSpeedMeterLog />
                </Item>
            </Grid>
            <Grid xs={2} sm={4} md={6} key={2}>
              <Item>
                <SpeedMeterLogsChart />
              </Item>
            </Grid>
        </Grid>
       
      </>
    )

}

