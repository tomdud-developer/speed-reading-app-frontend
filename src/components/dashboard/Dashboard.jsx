import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';

import SpeedMeterLogsChart from './SpeedMeterLogsChart';
import { Typography } from '@mui/material';
import GaugaeChartLastSpeedMeterLog from './GaugaeChartLastSpeedMeterLog';
import SchultzBestTimesGrid from "./SchultzBestTimesGrid";
import {Progress} from "./progress/Progress";

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
                <Item
                    sx={{
                        height: '250px',
                        maxHeight: '250px',
                        minHeight: '250px',
                    }}
                >
                  <GaugaeChartLastSpeedMeterLog />
                </Item>
            </Grid>
            <Grid xs={2} sm={4} md={8} key={2}>
              <Item>
                <SpeedMeterLogsChart />
              </Item>
            </Grid>
            <Grid xs={2} sm={4} md={4} key={3}>
                <Item
                    sx={{
                        height: '250px',
                        maxHeight: '250px',
                        minHeight: '250px',
                    }}
                >
                    <SchultzBestTimesGrid />
                </Item>
            </Grid>
            <Grid xs={2} sm={4} md={4} key={4}>
                <Item
                    sx={{
                        height: '500px',
                        maxHeight: '500px',
                        minHeight: '500px',
                        width: '1000px'
                    }}
                >
                    <Progress />
                </Item>
            </Grid>
        </Grid>
       
      </>
    )

}

