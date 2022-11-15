import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import { minHeight } from '@mui/system';
import { Button, Pagination, TextField, Typography, Alert, LinearProgress } from '@mui/material';
import Stack from '@mui/material/Stack';
import Slider from '@mui/material/Slider';
import VolumeDown from '@mui/icons-material/VolumeDown';
import TextDecreaseIcon from '@mui/icons-material/TextDecrease';
import TextIncreaseIcon from '@mui/icons-material/TextIncrease';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import LastPageIcon from '@mui/icons-material/LastPage';
import { makeStyles } from '@material-ui/core';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';
import { axiosPrivate } from '../../../api/axios';
import useAuth from '../../../hooks/useAuth';
import {NumberInputField} from "./NumberInputField";
import TuneIcon from "@mui/icons-material/Tune";
import FastForwardIcon from "@mui/icons-material/FastForward";
import FastRewindIcon from "@mui/icons-material/FastRewind";
import ViewWeekIcon from "@mui/icons-material/ViewWeek";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import StopCircleIcon from "@mui/icons-material/StopCircle";
import RestartAltIcon from "@mui/icons-material/RestartAlt";


export default function FastWords(props) {


    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: 'dark' === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

    const SteeringButton = styled(Button)`
        padding: 5px;
        margin-left: 20px;
        margin-right: 20px;
        min-width: 100px;
    `
    const { auth } = useAuth();
    const [displayWord, setDisplayWord] =  React.useState('Zatrzymano');
    const [time, setTime] = React.useState(0);
    const [running, setRunning] = React.useState(false);
    const [delay, setDelay] = React.useState(300);
    const [counter, setCounter] = React.useState(0);
    const [wordsArray, setWordsArray] = React.useState(["Pusto"]);

    React.useEffect(() => {
        let interval;
        if (running) {
            interval = setInterval(() => {
                setTime(oldTime => oldTime + delay/1000);
                randomWord();
            }, delay);
        } else if (!running) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [running, delay]);

    React.useEffect(() => {
        axiosPrivate.get(`api/v1/pdfuser/get-text/${auth.appuserid}&1000`)
            .then(
                (result) => {
                    setWordsArray(result.data.replace("/ {2,}/","").split(" "));
                }
            );
    }, []);


    function randomWord() {
        let randomWordFromArray = "";
        while(randomWordFromArray === "") {
            const randomIndex = Math.floor(Math.random() * wordsArray.length);
            randomWordFromArray = wordsArray[randomIndex].trim();
        }
        setDisplayWord(randomWordFromArray);
        setCounter(oldCounter => oldCounter + 1);
    }

    return (
        <>
            <Grid container spacing={2}>
                <Grid xs={8}>
                    <Paper
                        sx={{
                            padding: 2,
                            backgroundColor: '#f0ca62',
                            textAlign: 'center',
                            minHeight: '600px'
                        }}
                    >
                        <Paper
                            sx={{
                                padding: 10,
                                backgroundColor: '#e3ddcc',
                                textAlign: 'justify',
                                minHeight: '600px',
                            }}

                        >
                            <Grid
                                container
                                spacing={0}
                                direction="column"
                                alignItems="center"
                                justifyContent="center"
                            >
                                <Typography variant='h3' color="secondary.text" >
                                    Generator słów:
                                </Typography>
                                <Box sx={{height: '150px', width:"500px", border: '1px dashed grey', margin: '20px', textAlign: 'center', flex: 1, justifyContent: 'center', alignItems:"center"}}>
                                    <Typography variant='book' sx={{fontSize: '50px'}}>
                                        {displayWord}
                                    </Typography>
                                </Box>
                            </Grid>
                        </Paper>
                    </Paper>
                </Grid>
                <Grid xs={4}>
                    <Item>
                        <Box sx={{marginBottom: '40px',display: 'flex', textAlign: 'center', alignItems: 'center', justifyContent: 'center'}}>
                            <TuneIcon color="secondary" sx={{fontSize: "40px", marginRight: '20px'}}/>
                            <Typography variant='h3'>Panel sterujący</Typography>
                        </Box>
                        <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
                            <Typography>Opóźnienie przełączania</Typography>
                            <FastForwardIcon color="secondary"/>
                            <Slider
                                color="secondary"
                                valueLabelDisplay="on"
                                value={delay}
                                onChange={(event, newValue) => {setDelay(newValue)}}
                                max={1000}
                                min={50}
                            />
                            <FastRewindIcon color="secondary"/>
                        </Stack>
                        <Typography>Aktualny status: <b>{running?"Uruchomiony":"Zatrzymany"}</b></Typography>
                        <Typography>Czas: <b>{Math.round(time)}</b> sekund</Typography>
                        <Typography>Ilość wyświetlonych słóœ: <b>{counter}</b></Typography>
                        <SteeringButton color="secondary" variant="contained" onClick={() => setRunning(true)} margin={10}>
                            <PlayArrowIcon/>
                            Start
                        </SteeringButton>
                        <SteeringButton color="error"  variant="contained" onClick={() => setRunning(false)}>
                            <StopCircleIcon/>
                            Stop
                        </SteeringButton>
                        <SteeringButton
                            color="warning"
                            variant="contained"
                            onClick={() => {setTime(0); setCounter(0); setRunning(false);}}
                        >
                            <RestartAltIcon/>
                            Reset
                        </SteeringButton>
                    </Item>
                </Grid>
            </Grid>

        </>

    )
}