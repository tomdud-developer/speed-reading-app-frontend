import * as React from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import Slide from '@mui/material/Slide';
import SpeedMeterLogsChart from './SpeedMeterLogsChart';
import GaugaeChartLastSpeedMeterLog from './GaugaeChartLastSpeedMeterLog';
import SchultzBestTimesGrid from "./SchultzBestTimesGrid";
import {Progress} from "./progress/Progress";
import ColumnNumbersExerciseTimesGrid from "./ColumnNumbersExerciseTimesGrid";
import DisapperarNumbersExercisePercentageGrid from "./DisapperarNumbersExercisePercentageGrid";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: 'dark' === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    width: "100%",

}));

export default function Dashboard() {

    return (
      <>
          {/*Divide screen to two containers*/}
          <Grid container spacing={1.5} columns={{ xs: 3}}>
              <Grid xs={1} key="left-grid-item">
                  <Grid container spacing={3} columns={{ xs: 1}}>
                      <Grid xs={1} key="gaugechart-grid-item">
                          <Slide direction="up" in={true} style={{ transitionDelay: '400ms', transitionDuration: '1500ms'}} mountOnEnter unmountOnExit>
                          <Item>
                              <GaugaeChartLastSpeedMeterLog />
                          </Item>
                          </Slide>
                      </Grid>
                      <Grid xs={1} key="schulze-grid-item">
                          <Slide direction="up" in={true} style={{ transitionDelay: '800ms', transitionDuration: '1500ms'}} mountOnEnter unmountOnExit>
                              <Item>
                                  <SchultzBestTimesGrid />
                              </Item>
                          </Slide>
                      </Grid>
                      <Grid xs={1} key="columnsnumbers-grid-item">
                          <Slide direction="up" in={true} style={{ transitionDelay: '1200ms', transitionDuration: '1200ms'}} mountOnEnter unmountOnExit>
                              <Item>
                                  <ColumnNumbersExerciseTimesGrid />
                              </Item>
                          </Slide>
                      </Grid>
                      <Grid xs={1} key="disappearnumbers-grid-item">
                          <Slide direction="up" in={true} style={{ transitionDelay: '1600ms', transitionDuration: '1000ms'}} mountOnEnter unmountOnExit>
                              <Item>
                                  <DisapperarNumbersExercisePercentageGrid />
                              </Item>
                          </Slide>
                      </Grid>
                  </Grid>
              </Grid>
              <Grid xs={2} key="right-grid-item">
                  <Grid container spacing={3} columns={{ xs: 1}}>
                      <Grid xs={1} key="chart-grid-item">
                          <Slide direction="left" in={true} style={{ transitionDelay: '500ms', transitionDuration: '1500ms'}} mountOnEnter unmountOnExit>
                              <Item>
                                  <SpeedMeterLogsChart />
                              </Item>
                          </Slide>
                      </Grid>
                      <Grid xs={1} key="progress-grid-item">
                          <Slide direction="up" in={true} style={{ transitionDelay: '800ms', transitionDuration: '1500ms'}} mountOnEnter unmountOnExit>
                              <Item>
                                  <Progress />
                              </Item>
                          </Slide>
                      </Grid>
                  </Grid>
              </Grid>
          </Grid>
      </>
    )

}

