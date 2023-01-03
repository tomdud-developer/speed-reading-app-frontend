import * as React from 'react';
import { styled, keyframes } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import { Button, Pagination, Typography, Slider } from '@mui/material';
import Stack from '@mui/material/Stack';

import { makeStyles } from '@material-ui/core';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';
import { axiosPrivate } from '../../api/axios';
import useAuth from '../../hooks/useAuth';
import StopCircleIcon from '@mui/icons-material/StopCircle';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import ViewWeekIcon from '@mui/icons-material/ViewWeek';
import TuneIcon from '@mui/icons-material/Tune';
import TableRowsIcon from '@mui/icons-material/TableRows';
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import useCourse from "../../hooks/useCourse";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: 'dark' === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const YellowPaper = styled(Paper)(({ theme }) => ({
    backgroundColor: '#f0ca62',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    minHeight: '600px',
    width: '1000px',
    maxWidth: '1000px',
}));

const useStyles = makeStyles(() => ({
    ul: {
        "& .MuiPaginationItem-root": {
            color: "#fff"
        }
    }
}));

const DataBoxContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    padding: '0'
}));

const SteeringButton = styled(Button)`
        padding: 5px;
        margin-left: 20px;
        margin-right: 20px;
        min-width: 100px;
        font-size: 25px;
        text-align: center;
`


export default function Pyramid(props) {

    const { auth } = useAuth();
    const { course } = useCourse();
    const [hardLevel, setHardLevel] = React.useState(course.exercises.pyramid.param1);
    const [contentLeft, setContentLeft] = React.useState();
    const [contentRight, setContentRight] = React.useState();
    const elementWidth = 50;
    const elementHeight = 40;
    const [dialogOpen, setDialogOpen] = React.useState(false);
    const [refresh, setRefresh] = React.useState(false);
    const [reset, setReset] = React.useState(false);


    const CommonArrayElement = styled(Box)`
      
      max-width: ${elementWidth}px;
      max-height: ${elementHeight}px;
      min-width: ${elementWidth}px;
      min-height: ${elementHeight}px;
      border: #888888;
      border-style: ridge;
      border-width: 1px;
      font-size: 15px;
      color: white;
      border-radius: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
      background: #3CA55C;  /* fallback for old browsers */
      background: -webkit-linear-gradient(to right, #B5AC49, #3CA55C);  /* Chrome 10-25, Safari 5.1-6 */
      background: linear-gradient(to right, #B5AC49, #3CA55C); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    `

    React.useEffect(() => {
            setReset(old => !old);
        }, []
    )

    React.useEffect(() => {
            setContentLeft(createPiramid('left'));
            setContentRight(createPiramid('right'));
        }, [reset, hardLevel]
    )

    const createPiramid = (side) => {
        const center = 500;
        const tab = [];
        for(let i = 0; i < 15 ; i++) {
            tab.push(
                <CommonArrayElement
                    sx = {{
                        id: `arrayelement-${i}`,
                        position: 'relative',
                        top: `${20 + i * (elementHeight/20)}px`,
                        left: side==='left' ? center - i * hardLevel - elementWidth - 10 : i * hardLevel + 10,
                    }}
                >
                    {Math.floor(10 + Math.random() * 90)}
                </CommonArrayElement>
            )
        }
        return tab;
    }

    return (
        <>
            <Grid container spacing={2}>
                <Grid xs={8}>
                    <Paper
                        sx={{
                            backgroundColor: '#f0ca62',
                            padding: '10px',
                            textAlign: 'center',
                            minHeight: '600px',
                            width: '1020px',
                            maxWidth: '1020px',
                        }}
                    >
                        <Paper
                            sx ={{
                                backgroundColor: '#e3ddcc',
                                minHeight: '700px',
                                maxHeight: '700px',
                                minWidth: '1000px',
                                maxWidth: '1000px',

                            }}
                        >
                            <Grid
                                container
                                spacing={0}
                                columns={{ md: 2 }}
                                sx={{padding: '0px'}}
                            >
                                <Grid item md={1}>
                                    {contentLeft}
                                </Grid>
                                <Grid item md={1}>
                                    {contentRight}
                                </Grid>
                            </Grid>
                            <Box
                                sx = {{
                                    id: 'red-line',
                                    position: 'relative',
                                    top: '-600px',
                                    left: '500px',
                                    width: '3px',
                                    height: '700px',
                                    backgroundColor: 'red',
                                }}
                            >

                            </Box>
                        </Paper>
                    </Paper>
                </Grid>
                <Grid xs={4}>
                    <Paper
                        sx={{
                            backgroundColor: 'dark' === 'dark' ? '#1A2027' : '#fff',
                            padding: "10px",
                            textAlign: 'center',
                        }}
                    >
                        <Box sx={{marginBottom: '40px',display: 'flex', textAlign: 'center', alignItems: 'center', justifyContent: 'center'}}>
                            <TuneIcon color="secondary" sx={{fontSize: "40px", marginRight: '20px'}}/>
                            <Typography variant='h3'>Panel sterujący</Typography>
                        </Box>
                        <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
                            <Typography>Poziom trudności</Typography>
                            <ViewWeekIcon color="secondary"/>
                            <Slider
                                color="secondary"
                                valueLabelDisplay="on"
                                value={hardLevel}
                                onChange={(event, newValue) => {setHardLevel(newValue)}}
                                max={30}
                                min={1}
                            />
                            <ViewWeekIcon color="secondary"/>
                        </Stack>
                        <SteeringButton
                            color="warning"
                            variant="contained"
                            onClick={() => {
                                setReset(old => !old);
                            }}
                        >
                            <RestartAltIcon/>
                            Reset
                        </SteeringButton>
                    </Paper>
                </Grid>
            </Grid>





        </>
    )


}

